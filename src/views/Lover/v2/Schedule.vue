<template>
    <LoverV2Layout>
        <section class="m-lover-v2-page-title">
            <div>
                <h2>赛事进程</h2>
                <p>循环赛查看分组、人工积分与公开战斗；淘汰赛按轮次查看签表和晋级结果。</p>
            </div>
            <el-button :loading="loading" @click="loadStages">刷新赛程</el-button>
        </section>

        <section v-if="stages.length" class="m-schedule-shell m-lover-v2-panel">
            <CompetitionStageSteps
                :stages="stages"
                :active-stage-id="activeStageId"
                @select="selectStage"
            />
            <div v-if="activeStage" class="u-stage-summary">
                <div>
                    <h3>{{ activeStage.name }}</h3>
                    <p>
                        {{ stageTypeMap[activeStage.type] }} · {{ activeStage.best_of }} 局
                        {{ Math.floor(activeStage.best_of / 2) + 1 }} 胜
                    </p>
                </div>
                <div class="u-time">
                    <span>{{ formatDateTime(activeStage.start_at) }}</span>
                    <el-icon><Right /></el-icon>
                    <span>{{ formatDateTime(activeStage.end_at) }}</span>
                </div>
            </div>
        </section>

        <div v-loading="loading" class="m-schedule-content">
            <RoundRobinBoard
                v-if="activeStage?.type === 'round_robin' && stageDetail"
                :stage="stageDetail"
                :matches="matches"
                @open-match="openMatch"
            />
            <EliminationBracket
                v-else-if="activeStage && stageDetail"
                :stage="stageDetail"
                :matches="matches"
                @open-match="openMatch"
            />
            <EmptyState
                v-else-if="!loading"
                class="m-lover-v2-panel"
                title="公开赛程尚未发布"
                description="运营发布后，分组、积分和战斗入口会自动显示在这里。"
            />
        </div>
    </LoverV2Layout>
</template>

<script>
import { getAllStageMatches, getStage, getStages } from "@/service/rank/lover-v2";
import LoverV2Layout from "@/layouts/lover/LoverV2Layout.vue";
import CompetitionStageSteps from "@/components/rank/lover/v2/CompetitionStageSteps.vue";
import EliminationBracket from "@/components/rank/lover/v2/EliminationBracket.vue";
import EmptyState from "@/components/rank/lover/v2/EmptyState.vue";
import RoundRobinBoard from "@/components/rank/lover/v2/RoundRobinBoard.vue";
import { formatDateTime, getPreferredStageId, stageTypeMap } from "@/utils/lover-v2";

export default {
    name: "LoverV2Schedule",
    components: { LoverV2Layout, CompetitionStageSteps, EliminationBracket, EmptyState, RoundRobinBoard },
    data: function () {
        return {
            stageTypeMap,
            loading: false,
            stages: [],
            activeStageId: "",
            stageDetail: null,
            matches: [],
        };
    },
    computed: {
        eventId() {
            return this.$store.getters.currentEventId;
        },
        activeStage() {
            return this.stages.find((stage) => String(stage.id) === String(this.activeStageId)) || null;
        },
        slug() {
            return this.$store.state.slug;
        },
    },
    watch: {
        eventId: {
            handler: function () {
                this.loadStages();
            },
            immediate: true,
        },
    },
    methods: {
        formatDateTime,
        selectStage(stageId) {
            const nextStageId = String(stageId);
            if (nextStageId === this.activeStageId) return;
            this.activeStageId = nextStageId;
            this.loadActiveStage(true);
        },
        async loadStages() {
            if (!this.eventId) return;
            this.loading = true;
            try {
                const res = await getStages(this.eventId, { page: 1, page_size: 100 });
                this.stages = res.data.data.list || [];
                const queryStage = String(this.$route.query.schedule || "");
                this.activeStageId = this.stages.some((stage) => String(stage.id) === queryStage)
                    ? queryStage
                    : String(getPreferredStageId(this.stages));
                await this.loadActiveStage();
            } finally {
                this.loading = false;
            }
        },
        async loadActiveStage(syncQuery = false) {
            if (!this.eventId || !this.activeStageId) {
                this.stageDetail = null;
                this.matches = [];
                return;
            }
            this.loading = true;
            try {
                const [detailRes, matches] = await Promise.all([
                    getStage(this.eventId, this.activeStageId),
                    getAllStageMatches(this.eventId, this.activeStageId),
                ]);
                this.stageDetail = detailRes.data.data;
                this.matches = matches;
                if (syncQuery) {
                    this.$router.replace({ query: { ...this.$route.query, schedule: this.activeStageId } });
                }
            } finally {
                this.loading = false;
            }
        },
        openMatch(match) {
            this.$router.push({ name: "v2-match", params: { slug: this.slug, matchId: match.id } });
        },
    },
};
</script>

<style scoped lang="less">
.m-schedule-shell {
    padding: 24px;
}

.u-stage-summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-top: 20px;
    padding: 20px 6px 0;
    border-top: 1px solid rgba(135, 79, 62, 0.18);

    h3 {
        margin: 0 0 5px;
        color: #57352f;
        font-size: 21px;
    }

    p {
        margin: 0;
        color: #997f78;
        font-size: 13px;
    }

    .u-time {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #82645d;
        font-size: 13px;
    }
}

.m-schedule-content {
    min-height: 260px;
    margin-top: 20px;
}

@media screen and (max-width: 700px) {
    .u-stage-summary {
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>
