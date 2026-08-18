<template>
    <LoverV2Layout>
        <section class="m-lover-v2-page-title">
            <div>
                <h2>战斗详情</h2>
                <p>这里可以查看双方战队、对战安排、小局结果、配装确认状态、天命签与赛事记录。</p>
            </div>
            <el-button @click="$router.push({ name: 'v2-schedule', params: { slug } })">返回赛事进程</el-button>
        </section>

        <div v-loading="loading" class="m-match-page">
            <template v-if="match">
                <section class="m-match-hero m-lover-v2-panel">
                    <div class="u-match-meta">
                        <el-tag :type="matchStatusType" size="large">{{ matchStatusMap[match.status] }}</el-tag>
                        <span>{{ match.best_of }} 局 {{ winCount }} 胜 · 第 {{ match.round_no }} 轮</span>
                        <span>{{ formatDateTime(match.scheduled_at) }}</span>
                    </div>
                    <div class="m-versus">
                        <article class="u-side">
                            <TeamIdentity :team="match.team1" show-slogan />
                            <div class="m-side-members">
                                <UserIdentity
                                    v-for="member in match.team1?.members || []"
                                    :key="member.user_id"
                                    :user="member"
                                    compact
                                    :show-captain="false"
                                    :show-uid="false"
                                    :show-score="false"
                                />
                            </div>
                            <el-tag :type="match.team1_ready_at ? 'success' : 'info'" effect="plain">
                                {{ match.team1_ready_at ? "已就绪" : "尚未就绪" }}
                            </el-tag>
                        </article>
                        <div class="u-score">
                            <small>小局比分</small>
                            <strong>{{ match.team1_game_wins }} : {{ match.team2_game_wins }}</strong>
                            <span v-if="hasMatchPoints">本场积分 {{ matchPointsLabel }}</span>
                            <span v-if="winner">{{ winner.name }} 获胜</span>
                            <span v-else-if="match.status === 'finished'">{{ matchResultLabel }}</span>
                            <span v-else>{{ matchArrangementLabel }}</span>
                        </div>
                        <article class="u-side is-right">
                            <TeamIdentity :team="match.team2" show-slogan />
                            <div class="m-side-members">
                                <UserIdentity
                                    v-for="member in match.team2?.members || []"
                                    :key="member.user_id"
                                    :user="member"
                                    compact
                                    :show-captain="false"
                                    :show-uid="false"
                                    :show-score="false"
                                />
                            </div>
                            <el-tag :type="match.team2_ready_at ? 'success' : 'info'" effect="plain">
                                {{ match.team2_ready_at ? "已就绪" : "尚未就绪" }}
                            </el-tag>
                        </article>
                    </div>
                    <div class="m-match-info">
                        <div v-if="match.remark" class="u-match-remark"><strong>{{ match.remark }}</strong></div>
                        <div><span>配置截止</span><strong>{{ formatDateTime(match.config_deadline_at) }}</strong></div>
                        <div><span>开始时间</span><strong>{{ formatDateTime(match.scheduled_at) }}</strong></div>
                        <el-button
                            v-if="canReady"
                            type="primary"
                            :loading="actionLoading === 'ready'"
                            @click="toggleReady"
                        >
                            {{ ownReady ? "取消本队就绪" : "确认本队就绪" }}
                        </el-button>
                    </div>
                </section>

                <section class="m-match-section m-lover-v2-panel">
                    <div class="u-section-head">
                        <div>
                            <h3>各小局结果</h3>
                            <p>小局记录用于还原过程，整场结果以运营确认的最终比分为准。</p>
                        </div>
                    </div>
                    <el-table v-if="match.games?.length" :data="match.games" stripe>
                        <el-table-column label="小局" width="90" align="center">
                            <template #default="scope">第 {{ scope.row.game_no }} 局</template>
                        </el-table-column>
                        <el-table-column :label="match.team1.name" min-width="150" align="center">
                            <template #default="scope">{{ gameSideResultLabel(scope.row, 1) }}</template>
                        </el-table-column>
                        <el-table-column label="结果" width="120" align="center">
                            <template #default="scope">
                                {{ gameResultLabel(scope.row) }}
                            </template>
                        </el-table-column>
                        <el-table-column :label="match.team2.name" min-width="150" align="center">
                            <template #default="scope">{{ gameSideResultLabel(scope.row, 2) }}</template>
                        </el-table-column>
                        <el-table-column label="完成时间" width="150">
                            <template #default="scope">{{ formatDateTime(scope.row.finished_at) }}</template>
                        </el-table-column>
                    </el-table>
                    <EmptyState v-else description="尚未记录小局结果" compact />
                </section>

                <DestinyCardPanel
                    v-if="cardRequired"
                    class="m-match-section"
                    :draws="match.card_draws || []"
                    :match="match"
                    :can-draw="canCardDraw"
                    :can-use="canCardUse"
                    :own-team-id="Number(myTeam?.id || 0)"
                    :draw-count-per-team="drawCountPerTeam"
                    @draw="drawDestinyCard"
                    @use="openCardUse"
                />
                <DestinyCardDrawDialog
                    v-model="cardDialogVisible"
                    :event-id="eventId"
                    :match-id="matchId"
                    :team-name="myTeam?.name || ''"
                    @drawn="handleCardDrawn"
                />
                <DestinyCardUseDialog
                    v-model="cardUseDialogVisible"
                    :event-id="eventId"
                    :match-id="matchId"
                    :draw="selectedCardDraw"
                    :match="match"
                    :client="$store.state.v2_event?.client || 'std'"
                    @used="handleCardDrawn"
                />
                <section
                    v-if="cardRequired && !canShowConfig"
                    class="m-match-section m-lover-v2-panel m-card-flow-waiting"
                >
                    <FeatureBadge name="match-config" small />
                    <div>
                        <h3>赛前配装将在天命签使用完毕后开放</h3>
                        <p>{{ cardFlowHint }}</p>
                    </div>
                </section>

                <section
                    v-if="isParticipant && canShowConfig && configLoadError"
                    class="m-match-section m-lover-v2-panel m-config-load-error"
                >
                    <div>
                        <h3>本队赛前配装暂时无法读取</h3>
                        <p>为避免用空白内容覆盖已有配装，配置编辑已经暂停。重新加载成功后才能继续填写。</p>
                    </div>
                    <el-button type="primary" plain :loading="configLoading" @click="loadConfigs()">重新加载配置</el-button>
                </section>
                <MatchConfigPanel
                    v-else-if="isParticipant && canShowConfig"
                    class="m-match-section"
                    :team="myTeam"
                    :record="ownConfig"
                    :current-uid="currentUid"
                    :is-captain="isCaptain"
                    :can-update="canConfigUpdate"
                    :can-lock="canConfigLock"
                    :restrictions="match.card_restrictions || {}"
                    :update-disabled-reason="configUpdateDisabledReason"
                    :loading="actionLoading.startsWith('config')"
                    :refreshing="configLoading"
                    @save-member="saveMemberConfig"
                    @lock="lockConfig"
                    @refresh="loadConfigs()"
                />
                <section v-else-if="!isParticipant && canShowConfig" class="m-match-section m-lover-v2-panel m-public-config">
                    <div class="u-section-head">
                        <div>
                            <h3>双方赛前配装</h3>
                            <p>这里展示双方的确认进度；本场参赛成员可按赛事规则查看详细内容。</p>
                        </div>
                        <FeatureBadge name="match-config" small />
                    </div>
                    <div class="m-config-status">
                        <div v-for="team in [match.team1, match.team2]" :key="team.id">
                            <TeamIdentity :team="team" compact />
                            <el-tag :type="publicConfigRecord(team.id)?.status === 'locked' ? 'success' : 'warning'">
                                {{ publicConfigLabel(team.id) }}
                            </el-tag>
                        </div>
                    </div>
                </section>

                <section v-if="opponentConfig?.config" class="m-match-section m-lover-v2-panel m-opponent-config">
                    <div class="u-section-head">
                        <div>
                            <h3>对手本场配装</h3>
                            <p>双方都锁定后才会显示，以下信息来自对手提交的本场记录。</p>
                        </div>
                        <el-tag type="success">双方已锁定</el-tag>
                    </div>
                    <el-table :data="opponentConfig.config.members || []" stripe>
                        <el-table-column label="成员" min-width="220">
                            <template #default="scope"><UserIdentity :user="configMemberIdentity(scope.row)" compact /></template>
                        </el-table-column>
                        <el-table-column label="本场配装" min-width="210">
                            <template #default="scope">
                                <template v-if="scope.row.pz_snapshot">
                                    {{ scope.row.pz_snapshot.schema?.title || `配装 #${scope.row.pz_snapshot.source?.id}` }}
                                </template>
                                <span v-else>未提供</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="来源方案" min-width="120">
                            <template #default="scope">
                                {{ scope.row.pz_snapshot?.source?.id ? `#${scope.row.pz_snapshot.source.id}` : "—" }}
                            </template>
                        </el-table-column>
                        <el-table-column label="保存时间" min-width="170">
                            <template #default="scope">
                                {{ formatDateTime(scope.row.pz_snapshot?.captured_at) }}
                            </template>
                        </el-table-column>
                    </el-table>
                </section>

                <section class="m-match-section m-lover-v2-panel m-match-logs">
                    <div class="u-section-head">
                        <div>
                            <h3>本场赛事记录</h3>
                            <p>只展示适合公开的简短事件，不包含联系方式、内部配置与审核信息。</p>
                        </div>
                    </div>
                    <el-timeline v-if="match.logs?.length">
                        <el-timeline-item
                            v-for="item in match.logs"
                            :key="item.id"
                            :timestamp="formatDateTime(item.created_at)"
                            placement="top"
                        >
                            {{ item.summary }}
                        </el-timeline-item>
                    </el-timeline>
                    <EmptyState v-else description="暂无公开赛事记录" compact />
                </section>
            </template>
        </div>
    </LoverV2Layout>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user.js";
import {
    getMatch,
    getMatchTeamConfig,
    lockMatchTeamConfig,
    saveMatchMemberConfig,
    setMatchReady,
} from "@/service/rank/lover-v2";
import LoverV2Layout from "@/layouts/lover/LoverV2Layout.vue";
import DestinyCardDrawDialog from "@/components/rank/lover/v2/DestinyCardDrawDialog.vue";
import DestinyCardPanel from "@/components/rank/lover/v2/DestinyCardPanel.vue";
import DestinyCardUseDialog from "@/components/rank/lover/v2/DestinyCardUseDialog.vue";
import EmptyState from "@/components/rank/lover/v2/EmptyState.vue";
import FeatureBadge from "@/components/rank/lover/v2/FeatureBadge.vue";
import MatchConfigPanel from "@/components/rank/lover/v2/MatchConfigPanel.vue";
import TeamIdentity from "@/components/rank/lover/v2/TeamIdentity.vue";
import UserIdentity from "@/components/rank/lover/v2/UserIdentity.vue";
import autoRefreshMixin from "@/mixins/lover-v2-auto-refresh";
import { formatDateTime, matchStatusMap } from "@/utils/lover-v2";

export default {
    name: "LoverV2Match",
    mixins: [autoRefreshMixin],
    autoRefreshInterval: 5000,
    components: {
        LoverV2Layout,
        DestinyCardDrawDialog,
        DestinyCardPanel,
        DestinyCardUseDialog,
        EmptyState,
        FeatureBadge,
        MatchConfigPanel,
        TeamIdentity,
        UserIdentity,
    },
    data: function () {
        return {
            matchStatusMap,
            loading: false,
            match: null,
            configRecords: [],
            configLoading: false,
            configLoadError: false,
            actionLoading: "",
            cardDialogVisible: false,
            cardUseDialogVisible: false,
            selectedCardDraw: null,
        };
    },
    computed: {
        eventId() {
            return this.$store.getters.currentEventId;
        },
        matchId() {
            return Number(this.$route.params.matchId);
        },
        context() {
            return this.$store.state.v2_context;
        },
        participantMatch() {
            if (this.$store.state.v2_context_error) return null;
            return (
                this.context?.participant_matches?.find(
                    (item) => Number(item.match?.id) === Number(this.matchId)
                ) || null
            );
        },
        matchActions() {
            if (this.$store.state.v2_context_error) return [];
            return (
                this.participantMatch?.actions ||
                this.context?.match_actions?.find((item) => Number(item.match_id) === Number(this.matchId))?.actions ||
                []
            );
        },
        myTeam() {
            if (!this.participantMatch?.own_team) return this.context?.team || null;
            const matchTeam = [this.match?.team1, this.match?.team2].find(
                (team) => Number(team?.id) === Number(this.participantMatch.own_team.id)
            );
            return {
                ...(this.context?.team || {}),
                ...(matchTeam || {}),
                ...this.participantMatch.own_team,
                members: this.participantMatch.own_team.members || [],
            };
        },
        currentUid() {
            const info = User.getInfo() || User.profile || {};
            return Number(info.uid ?? info.ID ?? info.id ?? 0);
        },
        isParticipant() {
            return Boolean(this.participantMatch && this.myTeam && this.match);
        },
        isCaptain() {
            return this.isParticipant && Number(this.myTeam.captain_uid) === this.currentUid;
        },
        slug() {
            return this.$store.state.slug;
        },
        winCount() {
            return Math.floor(Number(this.match?.best_of || 1) / 2) + 1;
        },
        winner() {
            if (!this.match?.winner_team_id) return null;
            return Number(this.match.winner_team_id) === Number(this.match.team1?.id) ? this.match.team1 : this.match.team2;
        },
        matchResultLabel() {
            return this.match?.result_type === "no_contest" ? "本场无胜者" : "赛果待确认";
        },
        hasMatchPoints() {
            return this.match?.team1_points != null || this.match?.team2_points != null;
        },
        matchPointsLabel() {
            const team1Points = this.match?.team1_points == null ? "—" : this.match.team1_points;
            const team2Points = this.match?.team2_points == null ? "—" : this.match.team2_points;
            return `${team1Points} : ${team2Points}`;
        },
        matchArrangementLabel() {
            return this.match?.remark || "对战安排待公布";
        },
        matchStatusType() {
            return { draft: "info", scheduled: "warning", ready: "success", running: "danger", finished: "info" }[
                this.match?.status
            ];
        },
        ownReady() {
            if (!this.isParticipant) return false;
            return Number(this.match.team1?.id) === Number(this.myTeam.id)
                ? Boolean(this.match.team1_ready_at)
                : Boolean(this.match.team2_ready_at);
        },
        canReady() {
            return (
                this.isCaptain &&
                this.matchActions.includes("match.ready") &&
                ["scheduled", "ready"].includes(this.match?.status)
            );
        },
        canConfigUpdate() {
            return (
                this.isParticipant &&
                this.matchActions.includes("match.config.update") &&
                this.match?.status !== "finished"
            );
        },
        configUpdateDisabledReason() {
            if (this.canConfigUpdate) return "";
            if (this.ownConfig?.status === "locked") return "本队本场配装已经锁定，如需调整请联系赛事运营解锁";
            if (this.match?.config_deadline_at && new Date() >= new Date(this.match.config_deadline_at)) {
                return `配装提交已于 ${formatDateTime(this.match.config_deadline_at)} 截止`;
            }
            if (this.match?.status === "running") return "本场对战已经开始，不能继续修改赛前配装";
            if (this.match?.status === "finished") return "本场对战已经结束，不能继续修改赛前配装";
            if (this.match?.status === "cancelled") return "本场对战已经取消，不能提交赛前配装";
            return "当前赛事阶段暂未开放本场配装提交";
        },
        canConfigLock() {
            return this.isCaptain && this.matchActions.includes("match.config.lock");
        },
        canCardDraw() {
            return (
                this.isCaptain &&
                this.matchActions.includes("card.draw") &&
                ["scheduled", "ready", "running"].includes(this.match?.status)
            );
        },
        canCardUse() {
            return this.isCaptain && this.matchActions.includes("card.use");
        },
        cardState() {
            return this.match?.card_state || this.participantMatch?.card_state || "not_required";
        },
        cardRule() {
            return this.match?.card_rule || this.participantMatch?.stage?.card_rule || null;
        },
        cardRequired() {
            return this.cardRule?.enabled === true && Number(this.cardRule.draw_count_per_team) > 0;
        },
        drawCountPerTeam() {
            return this.cardRequired ? Number(this.cardRule.draw_count_per_team) : 0;
        },
        canShowConfig() {
            return ["completed", "not_required"].includes(this.cardState);
        },
        cardFlowHint() {
            const teams = [this.match?.team1, this.match?.team2].filter((team) => team?.id);
            const draws = this.match?.card_draws || [];
            if (this.cardState === "drawing") {
                const pending = teams
                    .map((team) => ({
                        team,
                        count:
                            this.drawCountPerTeam -
                            draws.filter((draw) => Number(draw.team_id) === Number(team.id)).length,
                    }))
                    .filter((item) => item.count > 0)
                    .map((item) => `${item.team.name || `战队 #${item.team.id}`}还需抽取 ${item.count} 张`);
                return `${pending.join("；") || "双方仍需完成抽签"}。双方全部抽取并使用后开放赛前配装。`;
            }
            if (this.cardState === "selecting_targets") {
                const pending = teams
                    .map((team) => ({
                        team,
                        count: draws.filter(
                            (draw) =>
                                Number(draw.team_id) === Number(team.id) &&
                                !Array.isArray(draw.target_payload?.selections)
                        ).length,
                    }))
                    .filter((item) => item.count > 0)
                    .map((item) => `${item.team.name || `战队 #${item.team.id}`}还有 ${item.count} 张等待使用`);
                return `${pending.join("；") || "仍有天命签等待选择生效目标"}。全部完成后开放赛前配装。`;
            }
            return "天命签流程尚未完成，请稍后刷新。";
        },
        ownConfig() {
            return this.configRecords.find((record) => Number(record.team_id) === Number(this.myTeam?.id)) || null;
        },
        opponentConfig() {
            return this.configRecords.find((record) => Number(record.team_id) !== Number(this.myTeam?.id)) || null;
        },
        opponentTeam() {
            if (!this.isParticipant) return null;
            return Number(this.match.team1?.id) === Number(this.myTeam.id) ? this.match.team2 : this.match.team1;
        },
    },
    watch: {
        matchId: {
            handler: function () {
                this.load();
            },
            immediate: true,
        },
        canConfigLock(value) {
            if (value && !this.ownConfig?.progress?.complete && !this.configLoading) this.loadConfigs();
        },
    },
    methods: {
        formatDateTime,
        async load(background = false) {
            if (!this.eventId || !this.matchId) return;
            if (!background) this.loading = true;
            try {
                const participantMatch = this.participantMatch;
                // 锁定配置后本场可能立即从可操作列表移除；当前页保留已授权读取过的草稿摘要，避免把成功操作误报成 404。
                const privateMatch = participantMatch?.match || (this.match?.status === "draft" ? this.match : null);
                const isPrivateDraft = privateMatch?.status === "draft";
                const matchRes = isPrivateDraft
                    ? null
                    : await getMatch(this.eventId, this.matchId, { mute: background });
                const match = matchRes?.data?.data || privateMatch;
                if (!match) return;
                if (participantMatch?.own_team) {
                    const teamId = Number(participantMatch.own_team.id);
                    const side = Number(match.team1?.id) === teamId ? "team1" : "team2";
                    match[side] = {
                        ...(match[side] || {}),
                        ...participantMatch.own_team,
                        members: participantMatch.own_team.members || [],
                    };
                }
                match.stage = participantMatch?.stage || match.stage;
                this.match = match;
                await this.loadConfigs(background);
            } catch (error) {
                console.error("[LoverV2Match.load]", error);
            } finally {
                if (!background) this.loading = false;
            }
        },
        async reloadMatchContext(background = false) {
            await this.$store.dispatch("loadV2Context", { force: true, background });
            await this.load(background);
        },
        async loadConfigs(background = false) {
            if (!this.isParticipant) {
                this.configRecords = [];
                this.configLoadError = false;
                return;
            }
            if (!background) this.configLoading = true;
            if (!background) this.configLoadError = false;
            try {
                const res = await getMatchTeamConfig(this.eventId, this.matchId, { mute: background });
                this.configRecords = res.data.data || [];
                this.configLoadError = false;
            } catch (error) {
                console.error("[LoverV2Match.loadConfigs]", error);
                if (!background) {
                    this.configRecords = [];
                    this.configLoadError = true;
                }
            } finally {
                if (!background) this.configLoading = false;
            }
        },
        async refreshPollingData() {
            await this.reloadMatchContext(true);
        },
        gameResultLabel(game) {
            if (Number(game.winner_team_id) === Number(this.match.team1?.id)) return `${this.match.team1.name} 获胜`;
            if (Number(game.winner_team_id) === Number(this.match.team2?.id)) return `${this.match.team2.name} 获胜`;
            return "本局结果待确认";
        },
        gameSideResultLabel(game, side) {
            const value = game[`team${side}_result`];
            const labels = {
                win: "胜",
                loss: "负",
                forfeit: "弃权",
                draw: "平局",
                no_contest: "无赛果",
            };
            if (labels[value]) return labels[value];
            const teamId = this.match[`team${side}`]?.id;
            if (!game.winner_team_id) return "待确认";
            return Number(game.winner_team_id) === Number(teamId) ? "胜" : "负";
        },
        publicConfigRecord(teamId) {
            return this.match?.configs?.find((record) => Number(record.team_id) === Number(teamId)) || null;
        },
        publicConfigLabel(teamId) {
            const record = this.publicConfigRecord(teamId);
            if (record?.status === "locked") return "已锁定";
            const submitted = Number(record?.progress?.submitted_count);
            const total = Number(record?.progress?.total_count);
            if (Number.isInteger(submitted) && Number.isInteger(total) && total > 0) {
                return `${submitted}/${total} 人已提交`;
            }
            return "填写中";
        },
        configMemberIdentity(configMember) {
            return (
                this.opponentTeam?.members?.find(
                    (member) => Number(member.user_id) === Number(configMember.user_id)
                ) || { user_id: configMember.user_id, display_name: "对手成员" }
            );
        },
        async toggleReady() {
            if (this.actionLoading) return;
            this.actionLoading = "ready";
            try {
                await setMatchReady(this.eventId, this.matchId, !this.ownReady);
                await this.reloadMatchContext();
                this.$message.success(this.ownReady ? "本队已确认就绪" : "本队已取消就绪");
            } catch (error) {
                console.error("[LoverV2Match.toggleReady]", error);
            } finally {
                this.actionLoading = "";
            }
        },
        async saveMemberConfig(member) {
            if (this.actionLoading || this.configLoadError) return;
            this.actionLoading = "config-member";
            try {
                await saveMatchMemberConfig(this.eventId, this.matchId, member);
                await this.reloadMatchContext();
                this.$message.success(
                    Number(member.user_id) === Number(this.currentUid) ? "你的本场配装已保存" : "已为该队员保存本场配装"
                );
            } catch (error) {
                console.error("[LoverV2Match.saveMemberConfig]", error);
            } finally {
                this.actionLoading = "";
            }
        },
        async lockConfig() {
            if (this.actionLoading || this.configLoadError) return;
            const confirmed = await this.$confirm(
                "锁定后队员不能再修改本场配装；双方都锁定后，对手可以查看完整内容。",
                "锁定本队配装",
                {
                    type: "warning",
                    confirmButtonText: "确认锁定",
                }
            )
                .then(() => true)
                .catch(() => false);
            if (!confirmed) return;
            this.actionLoading = "config-lock";
            try {
                await lockMatchTeamConfig(this.eventId, this.matchId);
                await this.reloadMatchContext();
                this.$message.success("本队本场配装已锁定");
            } catch (error) {
                console.error("[LoverV2Match.lockConfig]", error);
            } finally {
                this.actionLoading = "";
            }
        },
        drawDestinyCard() {
            if (this.actionLoading) return;
            this.cardDialogVisible = true;
        },
        openCardUse(draw) {
            if (!this.canCardUse || this.actionLoading) return;
            this.selectedCardDraw = draw;
            this.cardUseDialogVisible = true;
        },
        async handleCardDrawn() {
            try {
                await this.reloadMatchContext();
            } catch (error) {
                console.error("[LoverV2Match.handleCardDrawn]", error);
            }
        },
    },
};
</script>

<style scoped lang="less">
.m-match-page {
    min-height: 360px;
}

.m-match-hero,
.m-match-section {
    padding: 24px;
}

.u-match-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px 18px;
    color: #927872;
    font-size: 13px;
}

.m-versus {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 150px minmax(0, 1fr);
    align-items: center;
    gap: 24px;
    margin-top: 28px;
}

.u-side {
    padding: 18px;
    border: 1px solid #ead9cf;
    border-radius: 12px;
    background: #fffaf5;

    > .el-tag {
        margin-top: 16px;
    }
}

.m-side-members {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: 16px;
}

.u-score {
    text-align: center;

    small,
    strong,
    span {
        display: block;
    }

    small {
        color: #a38a83;
    }

    strong {
        margin: 8px 0 6px;
        color: #a43f34;
        font-size: 40px;
    }

    span {
        color: #7d5d56;
        font-size: 13px;
    }
}

.m-match-info {
    display: grid;
    grid-template-columns: repeat(3, 1fr) auto;
    align-items: center;
    gap: 18px;
    margin-top: 22px;
    padding: 16px;
    border-radius: 11px;
    background: #f6ece4;

    span,
    strong {
        display: block;
    }

    span {
        color: #a08881;
        font-size: 12px;
    }

    strong {
        margin-top: 4px;
        color: #61403a;
        font-size: 14px;
    }

    .u-match-remark strong {
        margin-top: 0;
    }
}

.m-match-section {
    margin-top: 20px;
}

.m-config-load-error {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    h3 {
        margin: 0 0 6px;
        color: #713932;
        font-size: 19px;
    }

    p {
        margin: 0;
        color: #987f78;
        font-size: 13px;
    }
}

.m-card-flow-waiting {
    display: flex;
    min-height: 180px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 14px;
    text-align: center;

    > div {
        max-width: 680px;
    }

    h3 {
        margin: 0 0 7px;
        color: #713932;
        font-size: 20px;
    }

    p {
        margin: 0;
        color: #987f78;
        font-size: 13px;
        line-height: 1.7;
    }
}

.u-section-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;
    margin-bottom: 18px;

    h3 {
        margin: 0 0 6px;
        color: #57352f;
        font-size: 21px;
    }

    p {
        margin: 0;
        color: #987f78;
        font-size: 13px;
    }
}

.m-config-status {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;

    > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        padding: 16px;
        border: 1px solid #ead9cf;
        border-radius: 10px;
        background: #fffaf5;
    }
}

.m-match-logs :deep(.el-timeline) {
    max-width: 760px;
    margin: 0 auto;
}

@media screen and (max-width: 980px) {
    .m-versus {
        grid-template-columns: 1fr;
    }

    .m-match-info {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (max-width: 680px) {
    .m-config-load-error {
        align-items: stretch;
        flex-direction: column;
    }

    .m-side-members,
    .m-config-status,
    .m-match-info {
        grid-template-columns: 1fr;
    }
}
</style>
