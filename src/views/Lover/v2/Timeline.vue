<template>
    <LoverV2Layout>
        <section class="m-lover-v2-page-title">
            <div>
                <h2>战队赛事足迹</h2>
                <p>从集结、抽签到每场关键战斗，在这里回顾适合纪念与分享的赛事时刻。</p>
            </div>
            <el-button @click="$router.push({ name: 'v2-team', params: { slug } })">返回参赛战队</el-button>
        </section>

        <section v-loading="loading" class="m-timeline m-lover-v2-panel">
            <div class="u-team-head">
                <TeamIdentity :team="team" show-slogan />
                <FeatureBadge name="team" small />
            </div>
            <el-alert
                v-if="loadError"
                type="warning"
                :closable="false"
                show-icon
                title="赛事足迹暂时无法加载"
                description="这不是空记录，请稍后重试。"
            >
                <template #default>
                    <el-button text type="primary" @click="load">重新加载</el-button>
                </template>
            </el-alert>
            <el-timeline v-if="timeline.list.length" class="u-timeline">
                <el-timeline-item
                    v-for="item in timeline.list"
                    :key="item.id"
                    :timestamp="formatDateTime(item.created_at)"
                    :type="timelineType(item.action)"
                    placement="top"
                >
                    <article class="u-event">
                        <h3>{{ item.summary || actionLabel(item.action) }}</h3>
                        <p>{{ actionDescription(item.action) }}</p>
                    </article>
                </el-timeline-item>
            </el-timeline>
            <EmptyState
                v-else-if="!loading && !loadError"
                title="这支战队还没有公开赛事足迹"
                description="后续组队、抽签、晋级或关键战斗记录会按公开规则出现在这里。"
            />
            <div v-if="timeline.count > timeline.pageSize" class="m-lover-v2-pagination">
                <el-pagination
                    v-model:current-page="timeline.page"
                    :page-size="timeline.pageSize"
                    :total="timeline.count"
                    layout="prev, pager, next"
                    @current-change="loadTimeline"
                />
            </div>
        </section>
    </LoverV2Layout>
</template>

<script>
import { getAllTeams, getTeamTimeline } from "@/service/rank/lover-v2";
import LoverV2Layout from "@/layouts/lover/LoverV2Layout.vue";
import EmptyState from "@/components/rank/lover/v2/EmptyState.vue";
import FeatureBadge from "@/components/rank/lover/v2/FeatureBadge.vue";
import TeamIdentity from "@/components/rank/lover/v2/TeamIdentity.vue";
import { formatDateTime } from "@/utils/lover-v2";

export default {
    name: "LoverV2Timeline",
    components: { LoverV2Layout, EmptyState, FeatureBadge, TeamIdentity },
    data: function () {
        return {
            loading: false,
            loadError: false,
            team: {},
            timeline: { list: [], count: 0, page: 1, pageSize: 20 },
        };
    },
    computed: {
        eventId() {
            return this.$store.getters.currentEventId;
        },
        teamId() {
            return Number(this.$route.params.teamId);
        },
        slug() {
            return this.$store.state.slug;
        },
    },
    watch: {
        teamId: {
            handler: function () {
                this.timeline.page = 1;
                this.load();
            },
            immediate: true,
        },
    },
    methods: {
        formatDateTime,
        async load() {
            if (!this.eventId || !this.teamId) return;
            this.loading = true;
            this.loadError = false;
            try {
                const [teams] = await Promise.all([
                    getAllTeams(this.eventId),
                    this.loadTimeline(),
                ]);
                this.team =
                    teams.find((team) => Number(team.id) === this.teamId) || {
                        id: this.teamId,
                        name: "参赛战队",
                    };
            } catch (error) {
                console.error("[LoverV2Timeline.load]", error);
                this.loadError = true;
            } finally {
                this.loading = false;
            }
        },
        async loadTimeline() {
            if (!this.eventId || !this.teamId) return;
            const res = await getTeamTimeline(this.eventId, this.teamId, {
                page: this.timeline.page,
                page_size: this.timeline.pageSize,
            });
            this.timeline = { ...this.timeline, ...res.data.data, pageSize: res.data.data.page_size };
        },
        actionLabel(action) {
            if (action.startsWith("team.")) return "战队状态更新";
            if (action.startsWith("unit.")) return "参赛成员集结";
            if (action.startsWith("solo.")) return "独狼盲盒记录";
            if (action.startsWith("stage.")) return "赛程阶段更新";
            if (action.startsWith("match.")) return "战斗记录更新";
            if (action.startsWith("card.")) return "天命签记录";
            return "赛事记录";
        },
        actionDescription(action) {
            if (action === "team.locked") return "五人阵容完成确认，从此以锁定快照参加后续赛程。";
            if (action === "team.completed") return "战队已经补齐所有参赛位置。";
            if (action === "solo.drawn") return "情缘队长通过盲盒抽取完成独狼位置。";
            if (action === "card.drawn") return "本场战斗的天命签结果已经公开。";
            if (action === "match.finished") return "一场正式战斗已经完成并确认结果。";
            if (action === "stage.team_status_changed") return "战队在本段赛程中的状态发生变化。";
            return "这段赛事经历已经记录在战队足迹中。";
        },
        timelineType(action) {
            if (action.includes("finished") || action.includes("advanced")) return "success";
            if (action.includes("card") || action.includes("draw")) return "warning";
            if (action.includes("withdrawn") || action.includes("eliminated")) return "danger";
            return "primary";
        },
    },
};
</script>

<style scoped lang="less">
.m-timeline {
    padding: 26px;
}

.u-team-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding-bottom: 22px;
    border-bottom: 1px solid #ead9cf;
}

.u-timeline {
    max-width: 780px;
    margin: 32px auto 0;
}

.u-event {
    padding: 16px 18px;
    border: 1px solid #ead9cf;
    border-radius: 11px;
    background: #fffaf5;

    h3 {
        margin: 0 0 7px;
        color: #57352f;
        font-size: 16px;
    }

    p {
        margin: 0;
        color: #967d76;
        font-size: 13px;
        line-height: 1.7;
    }
}
</style>
