<template>
    <LoverV2Layout>
        <section class="m-lover-v2-page-title">
            <div>
                <h2>{{ activeTab === "mine" ? "我的战队" : "参赛战队" }}</h2>
                <p v-if="activeTab === 'mine'">在这里查看组队进度、五人阵容，以及需要你参与的每场战斗。</p>
                <p v-else>看看本届已经集结完成的参赛战队，认识即将并肩或交锋的侠士。</p>
            </div>
            <el-button v-if="activeTab === 'mine' && myTeam" @click="goTimeline(myTeam)">查看我的赛事足迹</el-button>
        </section>

        <el-tabs v-model="activeTab" class="m-team-tabs" @tab-change="handleTabChange">
            <el-tab-pane label="我的战队" name="mine">
                <section v-if="contextError" class="m-lover-v2-panel m-no-team">
                    <FeatureBadge name="team" />
                    <div>
                        <h3>个人战队状态暂时无法读取</h3>
                        <p>重新加载成功前，不会显示可能已经过期的组队与战斗操作。</p>
                        <el-button type="primary" :loading="$store.state.v2_context_loading" @click="refreshContext">
                            重新加载个人状态
                        </el-button>
                    </div>
                </section>

                <section v-else-if="myTeam" class="m-my-team m-lover-v2-panel">
                    <div class="u-team-head">
                        <TeamIdentity :team="myTeam" show-slogan />
                        <div class="u-team-actions">
                            <el-button
                                v-if="actions.includes('team.invite')"
                                type="primary"
                                @click="$router.push({ name: 'v2-mate-hall', params: { slug }, query: { hall: 'team' } })"
                            >
                                邀请搭子队
                            </el-button>
                            <el-button
                                v-if="actions.includes('solo.draw')"
                                type="warning"
                                @click="$router.push({ name: 'v2-solo-draw', params: { slug } })"
                            >
                                开启独狼盲盒
                            </el-button>
                            <el-button
                                v-if="actions.includes('unit.dissolve') && context?.unit?.type === 'mate'"
                                type="danger"
                                plain
                                :loading="actionLoading === 'dissolve'"
                                :disabled="Boolean(actionLoading)"
                                @click="confirmDissolve"
                            >
                                解散搭子队
                            </el-button>
                        </div>
                    </div>
                    <el-alert
                        v-if="myTeam.formation_status === 'complete'"
                        class="u-team-alert"
                        type="success"
                        :closable="false"
                        show-icon
                        title="五人阵容已经集结完成"
                        description="请保持成员资料准确并等待运营锁定。锁定后阵容变更入口会关闭，后续调整请联系运营。"
                    />
                    <el-alert
                        v-else-if="myTeam.formation_status === 'locked'"
                        class="u-team-alert"
                        type="warning"
                        :closable="false"
                        show-icon
                        title="参赛阵容已经锁定"
                        description="后续请从战斗安排进入每场战斗，完成就绪、配装上报与天命签操作。"
                    />
                    <TeamRoster
                        :team="myTeam"
                        :removable-unit-ids="removableUnitIds"
                        :removing-unit-id="removingUnitId"
                        @remove-unit="confirmRemoveUnit"
                    />
                </section>

                <section v-else-if="isLogin" class="m-lover-v2-panel m-no-team">
                    <FeatureBadge :name="context?.unit?.type || context?.registration?.type || 'team'" />
                    <div>
                        <h3>{{ noTeamTitle }}</h3>
                        <p>{{ noTeamDescription }}</p>
                        <el-button
                            v-if="context?.registration?.type === 'mate'"
                            type="primary"
                            @click="$router.push({ name: 'v2-mate-hall', params: { slug } })"
                        >
                            前往组队大厅
                        </el-button>
                        <el-button
                            v-else-if="!context?.registration"
                            type="primary"
                            @click="$router.push({ name: 'v2-register', params: { slug } })"
                        >
                            前往报名
                        </el-button>
                    </div>
                </section>

                <CompetitionConsole
                    v-if="myTeam?.formation_status === 'locked'"
                    :team="myTeam"
                    :matches="myMatches"
                    @open-match="openMatch"
                />
            </el-tab-pane>

            <el-tab-pane label="参赛战队" name="public">
                <section class="m-public-teams">
                    <div class="u-public-head">
                        <div>
                            <h3>已集结战队</h3>
                            <p>这里仅展示参赛阵容，不会公开侠士们的联系方式。</p>
                        </div>
                        <el-tag effect="plain">共 {{ publicTeams.count }} 支</el-tag>
                    </div>
                    <div
                        v-if="teamsLoading || publicTeams.list.length"
                        v-loading="teamsLoading"
                        class="m-public-team-grid"
                    >
                        <PublicTeamCard
                            v-for="team in publicTeams.list"
                            :key="team.id"
                            :team="team"
                            @timeline="goTimeline"
                        />
                    </div>
                    <EmptyState
                        v-else-if="teamsLoaded"
                        class="m-lover-v2-panel"
                        icon="team"
                        title="暂时还没有公开战队"
                        description="队伍完成组建或锁定后会出现在这里。"
                    />
                    <div v-if="publicTeams.count > publicTeams.pageSize" class="m-lover-v2-pagination">
                        <el-pagination
                            v-model:current-page="publicTeams.page"
                            :page-size="publicTeams.pageSize"
                            :total="publicTeams.count"
                            layout="prev, pager, next"
                            @current-change="loadTeams"
                        />
                    </div>
                </section>
            </el-tab-pane>
        </el-tabs>
    </LoverV2Layout>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user.js";
import { dissolveUnit, getTeams, removeTeamUnit } from "@/service/rank/lover-v2";
import LoverV2Layout from "@/layouts/lover/LoverV2Layout.vue";
import CompetitionConsole from "@/components/rank/lover/v2/CompetitionConsole.vue";
import EmptyState from "@/components/rank/lover/v2/EmptyState.vue";
import FeatureBadge from "@/components/rank/lover/v2/FeatureBadge.vue";
import PublicTeamCard from "@/components/rank/lover/v2/PublicTeamCard.vue";
import TeamIdentity from "@/components/rank/lover/v2/TeamIdentity.vue";
import TeamRoster from "@/components/rank/lover/v2/TeamRoster.vue";
import { getErrorMessage } from "@/utils/lover-v2";

export default {
    name: "LoverV2Team",
    components: {
        LoverV2Layout,
        CompetitionConsole,
        EmptyState,
        FeatureBadge,
        PublicTeamCard,
        TeamIdentity,
        TeamRoster,
    },
    data: function () {
        return {
            activeTab: "mine",
            teamsLoading: false,
            teamsLoaded: false,
            publicTeams: { list: [], count: 0, page: 1, pageSize: 6 },
            actionLoading: "",
        };
    },
    computed: {
        eventId() {
            return this.$store.getters.currentEventId;
        },
        context() {
            return this.$store.state.v2_context;
        },
        contextError() {
            return this.$store.state.v2_context_error;
        },
        myTeam() {
            return this.contextError ? null : this.context?.team || null;
        },
        actions() {
            return this.contextError ? [] : this.context?.actions || [];
        },
        slug() {
            return this.$store.state.slug;
        },
        isLogin() {
            return User.isLogin();
        },
        removableUnitIds() {
            return (this.context?.removable_unit_ids || []).map(Number);
        },
        myMatches() {
            return (this.context?.participant_matches || []).map((item) => ({
                ...item.match,
                stage: item.stage,
                own_team: item.own_team,
                actions: item.actions || [],
            }));
        },
        removingUnitId() {
            if (!this.actionLoading) return null;
            return this.actionLoading.startsWith("remove-") ? Number(this.actionLoading.slice(7)) : -1;
        },
        noTeamTitle() {
            if (!this.context?.registration) return "你还没有报名本届情缘杯";
            if (this.context.registration.status !== "approved") return "报名尚未通过审核";
            if (this.context.registration.type === "mate" && !this.context.unit) return "先找到另一位搭子组成两人队";
            if (this.context.unit?.type === "mate") return "搭子队已经组成，正在等待情缘队长邀请";
            if (this.context.registration.type === "solo") return "你已进入独狼候选池";
            return "战队正在建立中";
        },
        noTeamDescription() {
            if (!this.context?.registration) return "完成报名并通过审核后，组队进度会显示在这里。";
            if (this.context.registration.status !== "approved") return "请留意审核结果；如被退回，可以直接修改原报名重新提交。";
            if (this.context.registration.type === "mate" && !this.context.unit)
                return "搭子大厅只公开职责和性格标签，不会公开你的联系方式。";
            if (this.context.unit?.type === "mate") return "情缘队长可以从第二个邀请大厅看到你们完整的两人搭子队。";
            if (this.context.registration.type === "solo") return "被盲盒抽中后会直接加入五人战队，无需再确认。";
            return "刷新页面即可读取最新阵容。";
        },
    },
    watch: {
        eventId: {
            handler: function () {
                this.publicTeams.page = 1;
                this.teamsLoaded = false;
                if (this.activeTab === "public") this.loadTeams();
            },
            immediate: true,
        },
    },
    methods: {
        handleTabChange(tabName) {
            if (tabName === "public" && !this.teamsLoaded) this.loadTeams();
        },
        async refreshContext() {
            await this.$store.dispatch("loadV2Context", { force: true });
        },
        async loadTeams() {
            if (!this.eventId) return;
            this.teamsLoading = true;
            try {
                const res = await getTeams(this.eventId, {
                    page: this.publicTeams.page,
                    page_size: this.publicTeams.pageSize,
                });
                this.publicTeams = { ...this.publicTeams, ...res.data.data, pageSize: res.data.data.page_size };
                this.teamsLoaded = true;
            } finally {
                this.teamsLoading = false;
            }
        },
        openMatch(match) {
            this.$router.push({
                name: "v2-match",
                params: { slug: this.slug, matchId: match.id },
            });
        },
        goTimeline(team) {
            this.$router.push({ name: "v2-timeline", params: { slug: this.slug, teamId: team.id } });
        },
        async confirmDissolve() {
            if (this.actionLoading) return;
            this.actionLoading = "dissolve";
            try {
                await this.$confirm("解散后旧邀请不会恢复，你和当前搭子会重新回到可配对状态。确定继续吗？", "解散搭子队", {
                    type: "warning",
                    confirmButtonText: "确认解散",
                });
                await dissolveUnit(this.eventId, this.context.unit.id);
                await this.refreshContext();
                this.$message.success("搭子队已解散");
            } catch (error) {
                if (error !== "cancel") this.$message.error(getErrorMessage(error));
            } finally {
                this.actionLoading = "";
            }
        },
        async confirmRemoveUnit(unit) {
            if (this.actionLoading || !this.removableUnitIds.includes(Number(unit.id))) return;
            this.actionLoading = `remove-${unit.id}`;
            try {
                await this.$confirm("解除后战队会回到组队中，历史邀请不会自动恢复。确定继续吗？", "解除战队归属", {
                    type: "warning",
                    confirmButtonText: "确认解除",
                });
                await removeTeamUnit(this.eventId, this.myTeam.id, unit.id);
                await Promise.all([this.refreshContext(), this.loadTeams()]);
                this.$message.success("战队阵容已更新");
            } catch (error) {
                if (error !== "cancel") this.$message.error(getErrorMessage(error));
            } finally {
                this.actionLoading = "";
            }
        },
    },
};
</script>

<style scoped lang="less">
.m-my-team {
    padding: 26px;
}

.u-team-head,
.u-public-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
}

.u-team-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px;
}

.u-team-alert {
    margin: 20px 0;
}

.m-no-team {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 26px;

    h3 {
        margin: 0 0 8px;
        color: #56342f;
        font-size: 22px;
    }

    p {
        margin: 0 0 16px;
        color: #947b74;
        line-height: 1.7;
    }
}

.m-public-teams {
    padding-top: 10px;
}

.m-team-tabs {
    :deep(.el-tabs__header) {
        margin-bottom: 28px;
    }

    :deep(.el-tabs__item) {
        height: 46px;
        color: #77574f;
        font-size: 16px;
    }

    :deep(.el-tabs__item.is-active) {
        color: #873a33;
        font-weight: 600;
    }

    :deep(.el-tabs__active-bar) {
        background: #873a33;
    }
}

.u-public-head {
    margin-bottom: 18px;

    h3 {
        margin: 0 0 6px;
        color: #56342f;
        font-size: 24px;
    }

    p {
        margin: 0;
        color: #987f78;
        font-size: 13px;
    }
}

.m-public-team-grid {
    display: grid;
    min-height: 160px;
    grid-template-columns: 1fr;
    gap: 18px;
}

@media screen and (max-width: 680px) {
    .u-team-head,
    .u-public-head,
    .m-no-team {
        align-items: stretch;
        flex-direction: column;
    }

    .u-team-actions {
        justify-content: flex-start;
    }
}
</style>
