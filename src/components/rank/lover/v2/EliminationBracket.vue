<script>
import EmptyState from "./EmptyState.vue";
import TeamIdentity from "./TeamIdentity.vue";
import { formatDateTime, matchStatusMap } from "@/utils/lover-v2";

const CARD_WIDTH = 286;
const CARD_HEIGHT = 154;
const COLUMN_GAP = 92;
const ROW_GAP = 22;
const HEADER_HEIGHT = 62;

export default {
    name: "LoverV2EliminationBracket",
    components: { EmptyState, TeamIdentity },
    emits: ["open-match"],
    props: {
        stage: { type: Object, required: true },
        matches: { type: Array, default: () => [] },
    },
    data: function () {
        return { matchStatusMap };
    },
    computed: {
        isDoubleElimination() {
            return this.stage.type === "double_elimination";
        },
        teamCount() {
            const stageTeamCount = (this.stage.teams || []).length;
            if (stageTeamCount) return stageTeamCount;
            return new Set(
                this.matches.flatMap((match) => [match.team1?.id, match.team2?.id]).filter(Boolean)
            ).size;
        },
        flowGraph() {
            return this.buildFlowGraph();
        },
        visibleRoundCount() {
            return this.flowGraph.columns.length;
        },
    },
    methods: {
        compareMatchPosition(a, b) {
            return (
                (Number(a.round_no) || 9999) - (Number(b.round_no) || 9999) ||
                (Number(a.position) || 9999) - (Number(b.position) || 9999) ||
                Number(a.id) - Number(b.id)
            );
        },
        buildFlowGraph() {
            if (!this.matches.length) {
                return {
                    columns: [],
                    edges: [],
                    champion: null,
                    width: 0,
                    height: 0,
                    boardHeight: 0,
                    hasFlow: false,
                    hasWinnerFlow: false,
                    hasLoserFlow: false,
                };
            }

            const nodes = this.matches
                .slice()
                .sort(this.compareMatchPosition)
                .map((match) => ({ id: String(match.id), match }));
            const nodeById = new Map(nodes.map((node) => [node.id, node]));
            const incomingById = new Map(nodes.map((node) => [node.id, []]));
            const outgoingById = new Map(nodes.map((node) => [node.id, []]));
            const edges = [];

            for (const node of nodes) {
                [
                    ["winner", node.match.winner_next_match_id],
                    ["loser", node.match.loser_next_match_id],
                ].forEach(([kind, nextId]) => {
                    const target = nextId == null ? null : nodeById.get(String(nextId));
                    if (!target || target.id === node.id) return;
                    const edge = { id: `${node.id}-${kind}-${target.id}`, kind, sourceId: node.id, targetId: target.id };
                    edges.push(edge);
                    outgoingById.get(node.id).push(edge);
                    incomingById.get(target.id).push(edge);
                });
            }

            const roundNumbers = [
                ...new Set(nodes.map((node) => Math.max(1, Number(node.match.round_no) || 1))),
            ].sort((a, b) => a - b);
            const roundDepth = new Map(roundNumbers.map((roundNumber, index) => [roundNumber, index]));
            const depths = new Map(
                nodes.map((node) => [node.id, roundDepth.get(Math.max(1, Number(node.match.round_no) || 1)) || 0])
            );

            // 后端维护的晋级去向是唯一权威；轮次仅为没有入边的节点提供初始分栏。
            const uniqueTargetsBySource = new Map();
            const indegrees = new Map(nodes.map((node) => [node.id, 0]));
            for (const edge of edges) {
                const targets = uniqueTargetsBySource.get(edge.sourceId) || new Set();
                if (!targets.has(edge.targetId)) {
                    targets.add(edge.targetId);
                    indegrees.set(edge.targetId, indegrees.get(edge.targetId) + 1);
                }
                uniqueTargetsBySource.set(edge.sourceId, targets);
            }
            const queue = nodes.filter((node) => indegrees.get(node.id) === 0).sort((a, b) => this.compareMatchPosition(a.match, b.match));
            const processedIds = new Set();
            while (queue.length) {
                const source = queue.shift();
                processedIds.add(source.id);
                for (const targetId of uniqueTargetsBySource.get(source.id) || []) {
                    depths.set(targetId, Math.max(depths.get(targetId), depths.get(source.id) + 1));
                    indegrees.set(targetId, indegrees.get(targetId) - 1);
                    if (indegrees.get(targetId) === 0) queue.push(nodeById.get(targetId));
                }
                queue.sort((a, b) => this.compareMatchPosition(a.match, b.match));
            }

            // 若脏数据形成回环，只隐藏无法向右绘制的回边，避免整张签表被拉成无限列。
            const drawableEdges = edges.filter(
                (edge) => processedIds.has(edge.sourceId) && processedIds.has(edge.targetId) && depths.get(edge.targetId) > depths.get(edge.sourceId)
            );
            const usedDepths = [...new Set(nodes.map((node) => depths.get(node.id)))].sort((a, b) => a - b);
            const compactDepth = new Map(usedDepths.map((depth, index) => [depth, index]));
            nodes.forEach((node) => {
                node.columnIndex = compactDepth.get(depths.get(node.id));
                node.incoming = incomingById.get(node.id).filter((edge) => drawableEdges.includes(edge));
                node.outgoing = outgoingById.get(node.id).filter((edge) => drawableEdges.includes(edge));
                node.role = this.getMatchRole(node, nodes, drawableEdges);
            });

            const columns = Array.from({ length: usedDepths.length }, (_, index) => ({ index, nodes: [] }));
            nodes.forEach((node) => columns[node.columnIndex].nodes.push(node));
            const orderRatioById = new Map();
            for (const column of columns) {
                column.nodes.sort((a, b) => {
                    const aSources = a.incoming.map((edge) => orderRatioById.get(edge.sourceId)).filter(Number.isFinite);
                    const bSources = b.incoming.map((edge) => orderRatioById.get(edge.sourceId)).filter(Number.isFinite);
                    const aCenter = aSources.length ? aSources.reduce((sum, value) => sum + value, 0) / aSources.length : Infinity;
                    const bCenter = bSources.length ? bSources.reduce((sum, value) => sum + value, 0) / bSources.length : Infinity;
                    return aCenter - bCenter || this.getRoleOrder(a.role) - this.getRoleOrder(b.role) || this.compareMatchPosition(a.match, b.match);
                });
                column.nodes.forEach((node, index) => {
                    orderRatioById.set(node.id, (index + 0.5) / column.nodes.length);
                });
            }

            const maxColumnSize = Math.max(...columns.map((column) => column.nodes.length), 1);
            const boardHeight = Math.max(250, maxColumnSize * CARD_HEIGHT + Math.max(0, maxColumnSize - 1) * ROW_GAP);
            const baseWidth = columns.length * CARD_WIDTH + Math.max(0, columns.length - 1) * COLUMN_GAP;
            columns.forEach((column) => {
                column.label = this.getColumnLabel(column, columns.length);
                column.x = column.index * (CARD_WIDTH + COLUMN_GAP);
                column.nodes.forEach((node, index) => {
                    const centerY = ((index + 0.5) * boardHeight) / column.nodes.length;
                    node.x = column.x;
                    node.y = centerY - CARD_HEIGHT / 2;
                    node.slot = this.buildSlot(node.match);
                    node.flowTargets = node.outgoing.map((edge) => ({
                        ...edge,
                        label: this.getMatchReference(nodeById.get(edge.targetId)),
                    }));
                });
            });
            const champion = this.buildChampion(nodes);
            if (champion) {
                champion.x = baseWidth + COLUMN_GAP;
                champion.y = champion.source.y;
            }
            const width = champion ? champion.x + CARD_WIDTH : baseWidth;
            const positionedNodeById = new Map(nodes.map((node) => [node.id, node]));
            const positionedEdges = drawableEdges.map((edge) => {
                const source = positionedNodeById.get(edge.sourceId);
                const target = positionedNodeById.get(edge.targetId);
                const sourceY = source.y + CARD_HEIGHT / 2 + (edge.kind === "loser" ? 5 : -5);
                const targetY = target.y + CARD_HEIGHT / 2 + (edge.kind === "loser" ? 5 : -5);
                const sourceX = source.x + CARD_WIDTH;
                const targetX = target.x;
                const bendX = sourceX + (targetX - sourceX) / 2;
                return {
                    ...edge,
                    path: `M ${sourceX} ${sourceY} C ${bendX} ${sourceY}, ${bendX} ${targetY}, ${targetX} ${targetY}`,
                };
            });
            if (champion) {
                const sourceX = champion.source.x + CARD_WIDTH;
                const sourceY = champion.source.y + CARD_HEIGHT / 2;
                const bendX = sourceX + COLUMN_GAP / 2;
                positionedEdges.push({
                    id: `${champion.source.id}-winner-${champion.id}`,
                    kind: "winner",
                    sourceId: champion.source.id,
                    targetId: champion.id,
                    path: `M ${sourceX} ${sourceY} C ${bendX} ${sourceY}, ${bendX} ${sourceY}, ${champion.x} ${sourceY}`,
                });
            }

            return {
                columns,
                edges: positionedEdges,
                champion,
                width,
                height: boardHeight + HEADER_HEIGHT,
                boardHeight,
                hasFlow: positionedEdges.length > 0,
                hasWinnerFlow: positionedEdges.some((edge) => edge.kind === "winner"),
                hasLoserFlow: positionedEdges.some((edge) => edge.kind === "loser"),
            };
        },
        buildChampion(nodes) {
            if (this.stage.type !== "single_elimination") return null;
            const source = nodes.find((node) => node.role === "championship");
            if (!source || source.match.status !== "finished" || source.match.winner_team_id == null) return null;

            const team = [source.match.team1, source.match.team2].find(
                (item) => item?.id && Number(item.id) === Number(source.match.winner_team_id)
            );
            if (!team) return null;
            return { id: `champion-${source.id}`, source, team };
        },
        getMatchRole(node, nodes, edges) {
            const hasDeclaredNext = Boolean(node.match.winner_next_match_id || node.match.loser_next_match_id);
            const isTerminal = !hasDeclaredNext && node.outgoing.length === 0;
            if (this.isDoubleElimination) {
                const terminalNodes = nodes.filter(
                    (item) => !item.match.winner_next_match_id && !item.match.loser_next_match_id
                );
                const maxTerminalRound = Math.max(...terminalNodes.map((item) => Number(item.match.round_no) || 0), 0);
                if (isTerminal && Number(node.match.round_no) === maxTerminalRound && terminalNodes.length === 1) return "final";
                const incomingKinds = new Set(node.incoming.map((edge) => edge.kind));
                if (incomingKinds.size === 2) return "merge";
                if (incomingKinds.has("loser")) return "loser-flow";
                if (incomingKinds.has("winner")) return "winner-flow";
                return "opening";
            }

            if (isTerminal && node.incoming.length && node.incoming.every((edge) => edge.kind === "loser")) return "bronze";
            if (isTerminal && node.incoming.some((edge) => edge.kind === "winner")) return "championship";

            if (!edges.length) {
                const maxRound = Math.max(...nodes.map((item) => Number(item.match.round_no) || 1));
                const finalRoundNodes = nodes
                    .filter((item) => (Number(item.match.round_no) || 1) === maxRound)
                    .slice()
                    .sort((a, b) => this.compareMatchPosition(a.match, b.match));
                if (finalRoundNodes.length === 1 && finalRoundNodes[0].id === node.id) return "championship";
                if (this.stage.config?.bronze_match && finalRoundNodes.length > 1) {
                    if (finalRoundNodes[0].id === node.id) return "championship";
                    if (finalRoundNodes[1].id === node.id) return "bronze";
                }
            }
            return "normal";
        },
        getRoleOrder(role) {
            return { championship: 0, final: 0, merge: 1, normal: 2, opening: 2, "winner-flow": 2, bronze: 3, "loser-flow": 3 }[role] ?? 2;
        },
        getColumnLabel(column, totalColumnCount) {
            if (this.isDoubleElimination) {
                if (column.nodes.some((node) => node.role === "final")) return "最终决胜";
                return `进程 ${column.index + 1}`;
            }
            const hasChampionship = column.nodes.some((node) => node.role === "championship");
            const hasBronze = column.nodes.some((node) => node.role === "bronze");
            if (hasChampionship && hasBronze) return "决胜轮";
            if (hasChampionship) return "冠军战";
            const bracketSize = Math.pow(2, Math.ceil(Math.log2(Math.max(this.teamCount, 2))));
            const participantCount = Math.max(2, bracketSize / Math.pow(2, column.index));
            if (participantCount > 2 && column.index < totalColumnCount - 1) {
                return `${participantCount} 进 ${participantCount / 2}`;
            }
            return `第 ${column.index + 1} 轮`;
        },
        getMatchRoleLabel(node) {
            return {
                championship: "冠军战",
                bronze: "铜牌战",
                final: "最终战",
                merge: "胜败汇合",
                "winner-flow": "胜者晋级",
                "loser-flow": "败者转入",
                opening: "起始对阵",
            }[node.role] || `第 ${node.match.position || "待定"} 场`;
        },
        getMatchReference(node) {
            if (!node) return "后续战斗";
            if (["championship", "bronze", "final"].includes(node.role)) return this.getMatchRoleLabel(node);
            return `第 ${node.match.round_no || "?"} 轮第 ${node.match.position || "?"} 场`;
        },
        buildSlot(match) {
            return {
                match,
                statusLabel: this.matchStatusMap[match.status] || "状态待确认",
                statusType: { scheduled: "warning", ready: "success", running: "danger", finished: "info" }[
                    match.status
                ],
                timeLabel: formatDateTime(match.scheduled_at),
                teams: [
                    this.buildTeam(match.team1, match.team1_game_wins, match.winner_team_id),
                    this.buildTeam(match.team2, match.team2_game_wins, match.winner_team_id),
                ],
            };
        },
        buildTeam(team, gameWins, winnerTeamId) {
            const normalizedTeam = team?.id
                ? team
                : { id: null, name: "轮空 / 待定", logo: "https://cdn.jx3box.com/image/common/avatar.png" };
            return {
                raw: normalizedTeam,
                id: normalizedTeam.id,
                gameWins: Number(gameWins) || 0,
                isWinner: Boolean(normalizedTeam.id) && Number(normalizedTeam.id) === Number(winnerTeamId),
            };
        },
        slotFooter(slot) {
            const winner = slot.teams.find((team) => team.isWinner);
            if (slot.match.status === "finished" && winner?.raw?.name) return `${winner.raw.name} 获胜`;
            const namedTeams = slot.teams.filter((team) => team.id);
            if (namedTeams.length < 2) return "轮空席位，晋级结果待确认";
            return slot.match.room_no ? `房间 ${slot.match.room_no}` : "战斗房间待公布";
        },
        openMatch(node) {
            this.$emit("open-match", node.match);
        },
    },
};
</script>

<template>
    <div class="c-lover-bracket m-lover-v2-panel">
        <div class="u-note">
            <div>
                <span class="u-kicker">逐轮晋级</span>
                <h3>淘汰赛签表</h3>
                <p v-if="isDoubleElimination">沿实线查看胜者晋级，沿虚线查看败者转入；点击战斗可查看详情。</p>
                <p v-else>沿横向签表查看每轮对阵与晋级结果，点击已公布的战斗可查看详情。</p>
            </div>
            <div class="u-note-meta">
                <el-tag effect="plain">{{ isDoubleElimination ? "双败淘汰" : "单败淘汰" }}</el-tag>
                <span v-if="visibleRoundCount">
                    {{ teamCount || "待定" }} 支队伍 · {{ visibleRoundCount }} {{ isDoubleElimination ? "段进程" : "轮赛程" }}
                </span>
            </div>
        </div>

        <div v-if="flowGraph.columns.length" class="m-bracket-scroll">
            <div class="u-flow-summary">
                <span v-if="flowGraph.hasWinnerFlow" class="u-flow-legend is-winner">胜者晋级</span>
                <span v-if="flowGraph.hasLoserFlow" class="u-flow-legend is-loser">败者转入</span>
                <span v-if="!flowGraph.hasFlow">晋级去向公布后，签表会自动补上连线。</span>
                <span class="u-scroll-hint">签表较宽时可左右滑动查看</span>
            </div>
            <div class="m-flow-graph" :style="{ width: `${flowGraph.width}px`, height: `${flowGraph.height}px` }">
                <svg
                    v-if="flowGraph.edges.length"
                    class="u-flow-lines"
                    :width="flowGraph.width"
                    :height="flowGraph.boardHeight"
                    :viewBox="`0 0 ${flowGraph.width} ${flowGraph.boardHeight}`"
                    aria-hidden="true"
                >
                    <defs>
                        <marker id="lover-bracket-arrow-winner" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                            <path d="M 0 0 L 8 4 L 0 8 z" class="u-arrow-winner" />
                        </marker>
                        <marker id="lover-bracket-arrow-loser" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                            <path d="M 0 0 L 8 4 L 0 8 z" class="u-arrow-loser" />
                        </marker>
                    </defs>
                    <path
                        v-for="edge in flowGraph.edges"
                        :key="edge.id"
                        :d="edge.path"
                        class="u-flow-line"
                        :class="`is-${edge.kind}`"
                        :marker-end="`url(#lover-bracket-arrow-${edge.kind})`"
                    />
                </svg>

                <section
                    v-for="column in flowGraph.columns"
                    :key="column.index"
                    class="u-flow-column"
                    :style="{ left: `${column.x}px` }"
                >
                    <header class="u-round-head">
                        <strong>{{ column.label }}</strong>
                        <span>{{ column.nodes.length }} 场战斗</span>
                    </header>
                </section>
                <section
                    v-if="flowGraph.champion"
                    class="u-flow-column"
                    :style="{ left: `${flowGraph.champion.x}px` }"
                >
                    <header class="u-round-head is-champion">
                        <strong>赛事冠军</strong>
                        <span>最终名次</span>
                    </header>
                </section>

                <template v-for="column in flowGraph.columns" :key="`matches-${column.index}`">
                    <article
                        v-for="node in column.nodes"
                        :key="node.id"
                        class="u-match-card"
                        :class="[
                            `is-${node.role}`,
                            { 'has-loser-flow': node.outgoing.some((edge) => edge.kind === 'loser') },
                        ]"
                        :style="{ left: `${node.x}px`, top: `${node.y + 62}px` }"
                        role="button"
                        tabindex="0"
                        :aria-label="`查看${getMatchRoleLabel(node)}详情`"
                        @click="openMatch(node)"
                        @keydown.enter.prevent="openMatch(node)"
                        @keydown.space.prevent="openMatch(node)"
                    >
                        <div class="u-match-head">
                            <strong>{{ getMatchRoleLabel(node) }}</strong>
                            <el-tag size="small" :type="node.slot.statusType" effect="plain">
                                {{ node.slot.statusLabel }}
                            </el-tag>
                        </div>
                        <div
                            v-for="(team, teamIndex) in node.slot.teams"
                            :key="`${node.id}-${teamIndex}`"
                            class="u-team-row"
                            :class="{ 'is-winner': team.isWinner, 'is-pending': !team.id }"
                        >
                            <TeamIdentity :team="team.raw" compact />
                            <b>{{ team.gameWins }}</b>
                        </div>
                        <footer>
                            <span>{{ slotFooter(node.slot) }}</span>
                            <time>{{ node.slot.timeLabel }}</time>
                        </footer>
                        <div v-if="node.flowTargets.length" class="u-flow-targets">
                            <span
                                v-for="target in node.flowTargets"
                                :key="target.id"
                                :class="`is-${target.kind}`"
                                :title="`${target.kind === 'winner' ? '胜者晋级' : '败者转入'} ${target.label}`"
                            >
                                {{ target.kind === "winner" ? "胜者" : "败者" }} → {{ target.label }}
                            </span>
                        </div>
                    </article>
                </template>
                <article
                    v-if="flowGraph.champion"
                    class="u-champion-card"
                    :style="{ left: `${flowGraph.champion.x}px`, top: `${flowGraph.champion.y + 62}px` }"
                    :aria-label="`赛事冠军：${flowGraph.champion.team.name}`"
                >
                    <span class="u-champion-mark" aria-hidden="true"><i>冠</i></span>
                    <div class="u-champion-content">
                        <span>问鼎本届赛事</span>
                        <TeamIdentity :team="flowGraph.champion.team" compact />
                        <small>从冠军战胜出</small>
                    </div>
                </article>
            </div>
        </div>

        <EmptyState
            v-else
            title="淘汰赛对阵尚未公开"
            description="运营公布签表后，晋级路线与战斗入口会显示在这里。"
        />
    </div>
</template>

<style scoped lang="less">
.c-lover-bracket {
    padding: 24px;
    overflow: hidden;
}

.u-note {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;

    .u-kicker {
        color: #a34d40;
        font-size: 12px;
        letter-spacing: 0.25em;
    }

    h3 {
        margin: 4px 0 6px;
        color: #57352f;
        font-size: 22px;
    }

    p {
        margin: 0;
        color: #987f78;
        font-size: 13px;
    }
}

.u-note-meta {
    display: flex;
    flex: 0 0 auto;
    align-items: flex-end;
    flex-direction: column;
    gap: 7px;
    color: #9b8179;
    font-size: 12px;
}

.m-bracket-scroll {
    margin: 22px -24px -24px;
    padding: 14px 24px 24px;
    border-top: 1px solid rgba(138, 77, 63, 0.13);
    background:
        radial-gradient(circle at 12% 15%, rgba(196, 125, 92, 0.08), transparent 30%),
        linear-gradient(180deg, rgba(255, 250, 244, 0.45), rgba(244, 229, 215, 0.32));
    overflow-x: auto;
}

.u-flow-summary {
    display: flex;
    min-width: max-content;
    align-items: center;
    gap: 18px;
    margin-bottom: 10px;
    color: #ad958d;
    font-size: 12px;
}

.u-scroll-hint {
    margin-left: auto;
}

.u-flow-legend {
    display: inline-flex;
    align-items: center;
    gap: 7px;

    &::before {
        width: 26px;
        border-top: 2px solid #a95547;
        content: "";
    }

    &.is-loser::before {
        border-color: #8e7996;
        border-top-style: dashed;
    }
}

.m-flow-graph {
    position: relative;
}

.u-flow-lines {
    position: absolute;
    top: 62px;
    left: 0;
    z-index: 1;
    overflow: visible;
    pointer-events: none;
}

.u-flow-line {
    fill: none;
    stroke: rgba(155, 76, 62, 0.66);
    stroke-width: 1.8;

    &.is-loser {
        stroke: rgba(117, 91, 128, 0.72);
        stroke-dasharray: 6 5;
    }
}

.u-arrow-winner {
    fill: #a95547;
}

.u-arrow-loser {
    fill: #756080;
}

.u-flow-column {
    position: absolute;
    top: 0;
    width: 286px;
}

.u-round-head {
    display: flex;
    height: 42px;
    align-items: center;
    justify-content: center;
    gap: 9px;
    border-top: 1px solid #c88970;
    border-bottom: 1px solid #d9b49e;
    background: linear-gradient(90deg, transparent, rgba(163, 77, 64, 0.09), transparent);
    color: #704037;

    strong {
        font-size: 17px;
    }

    span {
        color: #aa8b80;
        font-size: 11px;
    }

    &.is-champion {
        border-color: #c99a4a;
        background: linear-gradient(90deg, transparent, rgba(190, 131, 49, 0.16), transparent);
        color: #8d5a1f;
    }
}

.u-champion-card {
    position: absolute;
    z-index: 2;
    display: flex;
    box-sizing: border-box;
    width: 286px;
    height: 154px;
    align-items: center;
    gap: 16px;
    padding: 18px;
    border: 1px solid #d3a554;
    border-radius: 10px;
    background:
        radial-gradient(circle at 16% 50%, rgba(255, 239, 181, 0.72), transparent 34%),
        linear-gradient(135deg, rgba(255, 251, 229, 0.98), rgba(249, 229, 190, 0.98));
    box-shadow:
        inset 0 0 0 3px rgba(255, 250, 224, 0.78),
        0 8px 22px rgba(113, 69, 25, 0.14);
}

.u-champion-mark {
    display: inline-flex;
    width: 54px;
    height: 54px;
    flex: 0 0 54px;
    align-items: center;
    justify-content: center;
    border: 1px solid #b87a2d;
    background: linear-gradient(135deg, #c9913d, #8d571d);
    box-shadow:
        0 0 0 4px rgba(255, 245, 204, 0.88),
        0 5px 12px rgba(112, 66, 23, 0.18);
    color: #fff1c1;
    font-family: "ZCOOL XiaoWei", "STSong", serif;
    font-size: 26px;
    transform: rotate(45deg);

    i {
        display: inline-block;
        font-style: normal;
        transform: rotate(-45deg);
    }
}

.u-champion-content {
    min-width: 0;
    flex: 1;

    > span,
    > small {
        display: block;
        color: #a17a51;
        font-size: 11px;
    }

    > span {
        margin-bottom: 8px;
        letter-spacing: 0.16em;
    }

    > small {
        margin-top: 8px;
    }

    :deep(.u-main strong) {
        color: #754519;
    }
}

.u-match-card {
    position: absolute;
    z-index: 2;
    box-sizing: border-box;
    width: 286px;
    height: 154px;
    padding: 8px 11px;
    border: 1px solid #e0c5b6;
    border-left: 3px solid #a95447;
    border-radius: 4px 10px 10px 4px;
    background: rgba(255, 251, 245, 0.97);
    box-shadow: 0 5px 16px rgba(91, 45, 35, 0.08);
    cursor: pointer;
    transition: 0.2s ease;

    &:hover,
    &:focus-visible {
        border-color: #bc7765;
        box-shadow: 0 9px 22px rgba(91, 45, 35, 0.14);
        outline: 0;
        transform: translateY(-2px);
    }

    &.is-championship,
    &.is-final {
        border-color: #c78b3d;
        border-left-color: #b5792f;
        background: linear-gradient(135deg, rgba(255, 250, 229, 0.98), rgba(255, 244, 231, 0.98));
    }

    &.is-bronze {
        border-color: #bd8f72;
        border-left-color: #9d684c;
        background: linear-gradient(135deg, rgba(251, 242, 232, 0.98), rgba(247, 235, 226, 0.98));
    }

    &.has-loser-flow:not(.is-bronze) {
        border-bottom-color: rgba(117, 96, 128, 0.58);
    }
}

.u-match-head,
.u-match-card footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    color: #9b8179;
    font-size: 10px;
}

.u-match-head {
    height: 20px;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(173, 119, 99, 0.14);

    strong {
        color: #71443c;
        font-size: 11px;
    }
}

.u-team-row {
    display: flex;
    height: 37px;
    align-items: center;
    gap: 8px;
    color: #55342e;

    :deep(.c-lover-team) {
        min-width: 0;
        flex: 1;
        gap: 8px;
    }

    :deep(.u-logo) {
        width: 30px !important;
        height: 30px !important;
        border-radius: 7px;
    }

    :deep(.u-main strong) {
        font-size: 13px;
    }

    :deep(.u-main button) {
        margin-top: 1px;
        font-size: 9px;
    }

    b {
        min-width: 18px;
        color: #77554e;
        font-size: 16px;
        text-align: right;
    }

    &.is-winner {
        :deep(.u-main strong),
        b {
            color: #a33f34;
        }
    }

    &.is-pending {
        opacity: 0.58;
    }
}

.u-match-card footer {
    height: 18px;
    padding-top: 2px;
    border-top: 1px solid rgba(173, 119, 99, 0.14);

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    time {
        flex: 0 0 auto;
    }
}

.u-flow-targets {
    display: flex;
    height: 17px;
    align-items: flex-end;
    gap: 7px;
    overflow: hidden;

    span {
        min-width: 0;
        flex: 1;
        overflow: hidden;
        color: #a95547;
        font-size: 9px;
        text-overflow: ellipsis;
        white-space: nowrap;

        &.is-loser {
            color: #756080;
        }
    }
}

@media screen and (max-width: 720px) {
    .c-lover-bracket {
        padding: 18px;
    }

    .u-note {
        flex-direction: column;
    }

    .u-note-meta {
        align-items: flex-start;
    }

    .m-bracket-scroll {
        margin: 18px -18px -18px;
        padding-right: 18px;
        padding-left: 18px;
    }

    .u-flow-summary {
        justify-content: flex-start;
    }

    .u-scroll-hint {
        margin-left: 0;
    }
}
</style>
