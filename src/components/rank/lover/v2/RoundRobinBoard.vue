<script>
import EmptyState from "./EmptyState.vue";
import PublicMatchCard from "./PublicMatchCard.vue";
import TeamIdentity from "./TeamIdentity.vue";

export default {
    name: "LoverV2RoundRobinBoard",
    components: { EmptyState, PublicMatchCard, TeamIdentity },
    emits: ["open-match"],
    props: {
        stage: { type: Object, required: true },
        matches: { type: Array, default: () => [] },
    },
    data: function () {
        return {
            activeGroupId: "",
            teamStatusMap: {
                candidate: "等待分组",
                active: "比赛中",
                advanced: "已晋级",
                eliminated: "已淘汰",
                withdrawn: "已退赛",
                disqualified: "已取消资格",
            },
        };
    },
    computed: {
        groupBoards() {
            return (this.stage.groups || [])
                .slice()
                .sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0))
                .map((group) => this.buildGroupBoard(group))
                .filter((group) => group.rows.length || group.matches.length);
        },
        activeGroup() {
            return this.groupBoards.find((group) => String(group.id) === this.activeGroupId) || null;
        },
    },
    watch: {
        groupBoards: {
            handler: function (groups) {
                if (!groups.some((group) => String(group.id) === this.activeGroupId)) {
                    this.activeGroupId = String(groups[0]?.id || "");
                }
            },
            immediate: true,
        },
    },
    methods: {
        buildGroupBoard(group) {
            const groupId = Number(group.id);
            const matches = this.matches
                .filter((match) => Number(match.group_id) === groupId)
                .slice()
                .sort(this.compareMatches);
            const stats = this.buildTeamStats(matches);
            const rows = (this.stage.teams || [])
                .filter((item) => Number(item.group_id) === groupId)
                .slice()
                .sort(this.compareStageTeams)
                .map((item) => this.buildStandingRow(item, stats));
            const finishedCount = matches.filter((match) => match.status === "finished").length;

            return {
                ...group,
                rows,
                matches,
                rounds: this.groupMatchesByRound(matches),
                advancedCount: rows.filter((row) => row.status === "advanced").length,
                finishedCount,
                progress: matches.length ? Math.round((finishedCount / matches.length) * 100) : 0,
            };
        },
        compareStageTeams(a, b) {
            const aRank = a.manual_rank == null ? 9999 : Number(a.manual_rank);
            const bRank = b.manual_rank == null ? 9999 : Number(b.manual_rank);
            if (aRank !== bRank) return aRank - bRank;
            return Number(b.points || 0) - Number(a.points || 0) ||
                (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0);
        },
        compareMatches(a, b) {
            return (
                (Number(a.round_no) || 9999) - (Number(b.round_no) || 9999) ||
                (Number(a.position) || 9999) - (Number(b.position) || 9999) ||
                Number(a.id) - Number(b.id)
            );
        },
        buildTeamStats(matches) {
            const stats = new Map();
            const getStats = (teamId) => {
                if (!stats.has(teamId)) stats.set(teamId, { played: 0, wins: 0, losses: 0, unsettled: 0 });
                return stats.get(teamId);
            };

            for (const match of matches) {
                if (match.status !== "finished") continue;
                for (const teamId of [match.team1?.id, match.team2?.id].filter(Boolean).map(Number)) {
                    const teamStats = getStats(teamId);
                    teamStats.played += 1;
                    if (!match.winner_team_id) teamStats.unsettled += 1;
                    else if (Number(match.winner_team_id) === teamId) teamStats.wins += 1;
                    else teamStats.losses += 1;
                }
            }
            return stats;
        },
        buildStandingRow(item, stats) {
            const teamStats = stats.get(Number(item.team?.id)) || { played: 0, wins: 0, losses: 0, unsettled: 0 };
            const unsettledLabel = teamStats.unsettled ? ` · ${teamStats.unsettled} 场无赛果` : "";
            return {
                ...item,
                points: Number(item.points) || 0,
                rank: item.manual_rank == null ? null : Number(item.manual_rank),
                played: teamStats.played,
                recordLabel: teamStats.played
                    ? `${teamStats.wins} 胜 ${teamStats.losses} 负${unsettledLabel}`
                    : "暂无战绩",
            };
        },
        groupMatchesByRound(matches) {
            const rounds = new Map();
            for (const match of matches) {
                const roundNumber = Number(match.round_no) || 0;
                const list = rounds.get(roundNumber) || [];
                list.push(match);
                rounds.set(roundNumber, list);
            }
            return [...rounds.entries()]
                .sort(([a], [b]) => a - b)
                .map(([number, roundMatches]) => ({
                    number,
                    label: number ? `第 ${number} 轮` : "轮次待定",
                    matches: roundMatches.slice().sort(this.compareMatches),
                }));
        },
        rankClass(rank) {
            return rank && rank <= 3 ? `is-top-${rank}` : "";
        },
        statusType(status) {
            return { advanced: "success", eliminated: "info", withdrawn: "info", disqualified: "danger" }[status];
        },
    },
};
</script>

<template>
    <div class="c-lover-round-robin">
        <el-tabs v-if="groupBoards.length" v-model="activeGroupId" class="m-group-tabs">
            <el-tab-pane v-for="group in groupBoards" :key="group.id" :name="String(group.id)">
                <template #label>
                    <span class="u-group-tab-name">{{ group.name }}</span>
                    <small>{{ group.finishedCount }}/{{ group.matches.length }} 场已结束</small>
                </template>
            </el-tab-pane>
        </el-tabs>

        <section v-if="activeGroup" class="u-group m-lover-v2-panel">
            <div class="u-group-head">
                <div>
                    <span class="u-kicker">循环积分</span>
                    <h3>{{ activeGroup.name }}</h3>
                    <p>名次与晋级结果以赛事组最终确认为准，积分及胜负记录用于展示本组进程。</p>
                </div>
                <div class="u-group-meta">
                    <el-tag effect="plain">{{ activeGroup.rows.length }} 支战队</el-tag>
                    <span v-if="activeGroup.advancedCount">{{ activeGroup.advancedCount }} 支已晋级</span>
                </div>
            </div>

            <div class="u-progress">
                <div>
                    <strong>本组战斗进度</strong>
                    <span>已公开 {{ activeGroup.matches.length }} 场，{{ activeGroup.finishedCount }} 场已结束</span>
                </div>
                <el-progress :percentage="activeGroup.progress" :stroke-width="7" :show-text="false" />
            </div>

            <div class="m-standing-table">
                <el-table v-if="activeGroup.rows.length" :data="activeGroup.rows" stripe>
                    <el-table-column label="名次" width="88" align="center">
                        <template #default="scope">
                            <div class="u-rank" :class="rankClass(scope.row.rank)">
                                <strong>{{ scope.row.rank || "—" }}</strong>
                                <small>{{ scope.row.rank ? "名" : "待定" }}</small>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="战队" min-width="220">
                        <template #default="scope"><TeamIdentity :team="scope.row.team" compact /></template>
                    </el-table-column>
                    <el-table-column label="战绩" width="128" align="center">
                        <template #default="scope">
                            <div class="u-record">
                                <strong>{{ scope.row.recordLabel }}</strong>
                                <small>已完成 {{ scope.row.played }} 场</small>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="积分" width="92" align="center">
                        <template #default="scope">
                            <strong class="u-points">{{ scope.row.points }}</strong>
                        </template>
                    </el-table-column>
                    <el-table-column label="当前结果" width="118" align="center">
                        <template #default="scope">
                            <el-tag :type="statusType(scope.row.status)" effect="plain">
                                {{ teamStatusMap[scope.row.status] || "待确认" }}
                            </el-tag>
                        </template>
                    </el-table-column>
                </el-table>
                <EmptyState v-else icon="team" description="本组战队尚未公布" compact />
            </div>

            <div class="m-group-battles">
                <div class="u-battles-title">
                    <div>
                        <span>本组战斗</span>
                        <small>按轮次查看对阵与结果</small>
                    </div>
                    <b>{{ activeGroup.matches.length }} 场</b>
                </div>
                <section v-for="round in activeGroup.rounds" :key="round.number" class="u-battle-round">
                    <header>
                        <strong>{{ round.label }}</strong>
                        <span>{{ round.matches.length }} 场战斗</span>
                    </header>
                    <div class="u-battle-grid">
                        <PublicMatchCard
                            v-for="match in round.matches"
                            :key="match.id"
                            :match="match"
                            show-points
                            @open="$emit('open-match', $event)"
                        />
                    </div>
                </section>
                <EmptyState v-if="!activeGroup.matches.length" description="本组战斗尚未公开" compact />
            </div>
        </section>

        <EmptyState
            v-if="!groupBoards.length"
            class="m-lover-v2-panel"
            title="循环积分分组尚未公开"
            description="运营完成分组后，各组积分与战斗会显示在这里。"
        />
    </div>
</template>

<style scoped lang="less">
.c-lover-round-robin {
    display: grid;
    gap: 22px;
}

.m-group-tabs {
    padding: 0 14px;
    border-bottom: 1px solid rgba(130, 75, 59, 0.25);

    :deep(.el-tabs__header) {
        margin: 0;
    }

    :deep(.el-tabs__content) {
        display: none;
    }

    :deep(.el-tabs__item) {
        height: 54px;
        color: #83665e;
    }

    :deep(.el-tabs__item.is-active) {
        color: #873a33;
    }

    :deep(.el-tabs__active-bar) {
        background: #873a33;
    }
}

.u-group-tab-name,
.m-group-tabs small {
    display: block;
    line-height: 1.25;
}

.u-group-tab-name {
    font-size: 15px;
    font-weight: 600;
}

.m-group-tabs small {
    margin-top: 2px;
    color: #aa9189;
    font-size: 10px;
    font-weight: normal;
}

.u-group {
    padding: 24px;
    overflow: hidden;
}

.u-group-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;
    margin-bottom: 18px;

    .u-kicker {
        color: #a34d40;
        font-size: 12px;
        letter-spacing: 0.25em;
    }

    h3 {
        margin: 4px 0 5px;
        color: #57352f;
        font-size: 22px;
    }

    p {
        margin: 0;
        color: #987f78;
        font-size: 12px;
    }
}

.u-group-meta {
    display: flex;
    flex: 0 0 auto;
    align-items: flex-end;
    flex-direction: column;
    gap: 7px;
    color: #9c8179;
    font-size: 12px;
}

.u-progress {
    display: grid;
    grid-template-columns: minmax(190px, 0.42fr) minmax(220px, 1fr);
    align-items: center;
    gap: 22px;
    margin-bottom: 18px;
    padding: 13px 16px;
    border: 1px solid rgba(168, 99, 79, 0.14);
    border-radius: 8px;
    background: rgba(157, 72, 58, 0.04);

    strong,
    span {
        display: block;
    }

    strong {
        color: #65423b;
        font-size: 13px;
    }

    span {
        margin-top: 3px;
        color: #a0877f;
        font-size: 11px;
    }

    :deep(.el-progress-bar__outer) {
        background: #eadbd1;
    }

    :deep(.el-progress-bar__inner) {
        background: linear-gradient(90deg, #b65b4a, #d49a65);
    }
}

.m-standing-table {
    border: 1px solid #ead9cf;
    border-radius: 9px;
    overflow: hidden;

    :deep(.el-table th.el-table__cell) {
        background: #f6eae0;
        color: #76564e;
        font-weight: 600;
    }

    :deep(.el-table__row) {
        color: #61443d;
    }
}

.u-rank {
    display: inline-flex;
    min-width: 47px;
    align-items: baseline;
    justify-content: center;
    gap: 3px;
    color: #8f7770;

    strong {
        font-size: 19px;
    }

    small {
        font-size: 10px;
    }

    &.is-top-1,
    &.is-top-2,
    &.is-top-3 {
        padding: 3px 7px;
        border-radius: 999px;
        color: #fff8e9;
    }

    &.is-top-1 {
        background: linear-gradient(135deg, #b54c3c, #dc9d5b);
        box-shadow: 0 3px 8px rgba(168, 71, 55, 0.22);
    }

    &.is-top-2 {
        background: linear-gradient(135deg, #8d746b, #bba397);
    }

    &.is-top-3 {
        background: linear-gradient(135deg, #9d6046, #c38a68);
    }
}

.u-record {
    strong,
    small {
        display: block;
    }

    strong {
        color: #68443d;
        font-size: 13px;
    }

    small {
        margin-top: 3px;
        color: #aa9189;
        font-size: 10px;
    }
}

.u-points {
    display: inline-flex;
    min-width: 36px;
    height: 28px;
    align-items: center;
    justify-content: center;
    border: 1px solid #d8ae8c;
    border-radius: 5px;
    background: #fff8e9;
    color: #a34638;
    font-size: 16px;
}

.m-group-battles {
    margin: 22px -24px -24px;
    padding: 20px 24px 24px;
    border-top: 1px solid rgba(138, 77, 63, 0.13);
    background: linear-gradient(180deg, rgba(251, 244, 236, 0.58), rgba(244, 229, 215, 0.2));
}

.u-battles-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 17px;
    color: #633f38;

    span,
    small {
        display: block;
    }

    span {
        font-size: 17px;
        font-weight: 600;
    }

    small {
        margin-top: 3px;
        color: #a0877f;
        font-size: 11px;
        font-weight: normal;
    }

    b {
        color: #a34d40;
        font-size: 13px;
    }
}

.u-battle-round + .u-battle-round {
    margin-top: 20px;
}

.u-battle-round > header {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 10px;
    color: #6f4740;

    &::before {
        width: 3px;
        height: 15px;
        border-radius: 2px;
        background: #ae5546;
        content: "";
    }

    strong {
        font-size: 14px;
    }

    span {
        color: #aa9189;
        font-size: 11px;
    }
}

.u-battle-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
    gap: 14px;
}

@media screen and (max-width: 820px) {
    .u-group {
        padding: 18px;
    }

    .u-group-head,
    .u-progress {
        grid-template-columns: 1fr;
        flex-direction: column;
    }

    .u-group-meta {
        align-items: flex-start;
    }

    .m-standing-table {
        overflow-x: auto;

        :deep(.el-table) {
            min-width: 720px;
        }
    }

    .m-group-battles {
        margin: 20px -18px -18px;
        padding-right: 18px;
        padding-bottom: 18px;
        padding-left: 18px;
    }

    .u-battle-grid {
        grid-template-columns: 1fr;
    }
}
</style>
