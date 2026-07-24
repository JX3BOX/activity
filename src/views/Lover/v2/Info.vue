<template>
    <LoverV2Layout>
        <section class="m-lover-v2-page-title">
            <div>
                <h2>活动总览</h2>
                <p>从选择身份、寻找队友到五人集结，所有进度都以赛事系统的实时状态为准。</p>
            </div>
            <el-button type="primary" size="large" @click="goPrimaryAction">
                {{ primaryActionLabel }}
                <el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
        </section>

        <!-- <section class="m-info-roles">
            <article v-for="item in roles" :key="item.type" class="m-lover-v2-panel m-info-role">
                <FeatureBadge :name="item.type" />
                <div>
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.description }}</p>
                    <el-tag effect="plain">{{ item.count }}</el-tag>
                </div>
            </article>
        </section> -->

        <section class="m-lover-v2-panel m-info-flow">
            <div class="u-section-title">
                <div>
                    <span>参赛流程</span>
                    <small>当前：{{ phaseMap[event?.phase] || "赛事筹备中" }}</small>
                </div>
            </div>
            <el-steps :active="activeStep" finish-status="success" align-center>
                <el-step title="报名参赛" :description="registrationDescription" />
                <el-step title="寻找队友" :description="teamBuildingDescription" />
                <el-step title="阵容锁定" :description="lockDescription" />
                <el-step title="赛程对战" description="按公开赛程准时参赛" />
            </el-steps>
        </section>

        <section class="m-lover-v2-panel m-info-stages">
            <div class="u-section-title">
                <div>
                    <span>公开赛程</span>
                    <small>循序查看每段赛程、赛制说明与战斗进展</small>
                </div>
                <el-button text type="primary" @click="$router.push({ name: 'v2-schedule', params: { slug } })">
                    查看完整赛程
                </el-button>
            </div>
            <CompetitionStageSteps
                v-if="event?.stages?.length"
                :stages="event.stages"
                :active-stage-id="overviewStageId"
                compact
                @select="goStage"
            />
            <EmptyState
                v-else
                title="公开赛程尚未发布"
                description="运营发布后，分组、积分和战斗入口会自动显示在这里。"
            />
        </section>

        <section class="m-info-rich-texts">
            <RichTextSection title="活动说明" :content="event?.describe" empty-text="活动说明正在整理中。" />
            <RichTextSection title="参赛规则" :content="event?.rule" empty-text="详细规则将在活动开始前公布。" />
        </section>
    </LoverV2Layout>
</template>

<script>
import LoverV2Layout from "@/layouts/lover/LoverV2Layout.vue";
import CompetitionStageSteps from "@/components/rank/lover/v2/CompetitionStageSteps.vue";
import EmptyState from "@/components/rank/lover/v2/EmptyState.vue";
import RichTextSection from "@/components/rank/lover/v2/RichTextSection.vue";
import { formatDateTime, getPreferredStageId, phaseMap } from "@/utils/lover-v2";

export default {
    name: "LoverV2Info",
    components: { LoverV2Layout, CompetitionStageSteps, EmptyState, RichTextSection },
    data: function () {
        return {
            phaseMap,
            roles: [
                {
                    type: "lover",
                    title: "以情缘之名",
                    description: "两名已绑定情缘共同报名，是最终五人战队的核心，由报名人担任固定队长。",
                    count: "2 人核心位",
                },
                {
                    type: "mate",
                    title: "寻找最佳搭子",
                    description: "先以个人身份报名，再在搭子大厅双向邀请，组成不可拆分的两人搭子队。",
                    count: "2 人搭子位",
                },
                {
                    type: "solo",
                    title: "独狼入盲盒",
                    description: "以个人身份加入候选池，等待情缘队长通过盲盒抽取，成为最后一块拼图。",
                    count: "1 人独狼位",
                },
            ],
        };
    },
    computed: {
        event() {
            return this.$store.state.v2_event;
        },
        context() {
            return this.$store.state.v2_context;
        },
        slug() {
            return this.$store.state.slug;
        },
        activeStep() {
            return (
                {
                    before_registration: 0,
                    registration: 0,
                    team_building: 1,
                    locked: 2,
                }[this.event?.phase] ?? 0
            );
        },
        registrationDescription() {
            return `${formatDateTime(this.event?.registration_start_at)} 至 ${formatDateTime(
                this.event?.registration_end_at
            )}`;
        },
        teamBuildingDescription() {
            return `报名截止后仍可组队，至 ${formatDateTime(this.event?.team_lock_at)}`;
        },
        lockDescription() {
            return `${formatDateTime(this.event?.team_lock_at)} 后联系运营调整`;
        },
        primaryActionLabel() {
            if (this.context?.team) return "进入我的战队";
            if (this.context?.registration) return "查看报名进度";
            return this.event?.phase === "registration" ? "选择报名身份" : "查看参赛战队";
        },
        overviewStageId() {
            return getPreferredStageId(this.event?.stages || []);
        },
    },
    methods: {
        goPrimaryAction() {
            const name = this.context?.team ? "v2-team" : this.context?.registration ? "v2-register" : "v2-register";
            if (this.event?.phase !== "registration" && !this.context?.registration) {
                this.$router.push({ name: "v2-team", params: { slug: this.slug } });
                return;
            }
            this.$router.push({ name, params: { slug: this.slug } });
        },
        goStage(stageId) {
            this.$router.push({
                name: "v2-schedule",
                params: { slug: this.slug },
                query: { schedule: stageId },
            });
        },
    },
};
</script>

<style scoped lang="less">
// .m-info-roles {
//     display: grid;
//     grid-template-columns: repeat(3, minmax(0, 1fr));
//     gap: 20px;
// }

.m-info-role {
    display: flex;
    min-height: 176px;
    align-items: center;
    padding: 22px;

    h3 {
        margin: 0 0 8px;
        color: #56342f;
        font-size: 19px;
    }

    p {
        min-height: 68px;
        margin: 0 0 12px;
        color: #8c736d;
        font-size: 13px;
        line-height: 1.7;
    }
}

.m-info-flow,
.m-info-stages {
    margin-top: 22px;
    padding: 26px;
}

.u-section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;

    span {
        color: #56342f;
        font-size: 20px;
        font-weight: 700;
    }

    small {
        display: block;
        margin-top: 5px;
        color: #a18a84;
        font-size: 12px;
        font-weight: normal;
    }
}

.m-info-rich-texts {
    display: grid;
    gap: 22px;
    margin-top: 22px;
}

@media screen and (max-width: 900px) {
    .m-info-flow {
        overflow-x: auto;

        :deep(.el-steps) {
            min-width: 760px;
        }
    }
}
</style>
