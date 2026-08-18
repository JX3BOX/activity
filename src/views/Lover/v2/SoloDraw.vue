<template>
    <LoverV2Layout>
        <section class="m-lover-v2-page-title">
            <div>
                <h2>独狼盲盒</h2>
                <p>系统会根据当前治疗人数筛选可用候选，并由后端安全随机抽取；前端不能指定或重抽结果。</p>
            </div>
            <el-button @click="$router.push({ name: 'v2-team', params: { slug } })">返回我的战队</el-button>
        </section>

        <div v-if="!team" class="m-lover-v2-panel m-lover-v2-empty">
            <FeatureBadge name="solo-draw" />
            <h3>只有已建立战队的成员可以查看盲盒</h3>
            <p>情缘报名审核通过后会自动建立战队；抽取操作仅固定队长可执行。</p>
        </div>

        <template v-else>
            <section class="m-draw-stage m-lover-v2-panel">
                <div class="u-team">
                    <TeamIdentity :team="team" show-slogan />
                    <el-tag :type="canDraw ? 'success' : 'info'">
                        {{ drawStatusText }}
                    </el-tag>
                </div>
                <div class="u-draw-visual" :class="{ 'is-drawing': drawing }">
                    <FeatureBadge name="solo-draw" />
                    <div>
                        <h3>{{ drawTitle }}</h3>
                        <p v-if="resultMember">抽取结果已写入权威阵容，刷新页面也不会改变。</p>
                        <p v-else-if="!soloDrawEnabled">运营将在开幕式统一开启，页面会自动刷新当前状态。</p>
                        <p v-else>点击后立即抽取。</p>
                    </div>
                </div>
                <div v-if="resultMember" class="u-result">
                    <UserIdentity :user="resultMember" />
                    <IntroductionText v-if="resultMember.introduction" :text="resultMember.introduction" compact />
                </div>
                <div class="u-actions">
                    <el-button
                        type="warning"
                        size="large"
                        :loading="drawing"
                        :disabled="!canDraw"
                        @click="confirmDraw"
                    >
                        {{ drawButtonText }}
                    </el-button>
                </div>
            </section>

            <section class="m-draw-history m-lover-v2-panel">
                <div class="u-history-head">
                    <div>
                        <h3>本队抽取记录</h3>
                        <p>记录只展示已经公开且仍有效的抽取结果，不公开完整候选池。</p>
                    </div>
                    <el-button text @click="loadDraws()">刷新</el-button>
                </div>
                <el-table v-loading="historyLoading" :data="draws.list" stripe>
                    <el-table-column label="顺序" width="90">
                        <template #default="scope">第 {{ scope.row.draw_no }} 次</template>
                    </el-table-column>
                    <el-table-column label="抽取结果" min-width="280">
                        <template #default="scope">
                            <UserIdentity
                                v-if="memberForDraw(scope.row)"
                                :user="memberForDraw(scope.row)"
                                compact
                            />
                            <span v-else class="u-muted">成员资料正在同步，请以当前阵容为准</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="抽取时间" width="160">
                        <template #default="scope">{{ formatDateTime(scope.row.created_at) }}</template>
                    </el-table-column>
                </el-table>
            </section>
        </template>
    </LoverV2Layout>
</template>

<script>
import { drawSolo, getSoloDraws } from "@/service/rank/lover-v2";
import LoverV2Layout from "@/layouts/lover/LoverV2Layout.vue";
import FeatureBadge from "@/components/rank/lover/v2/FeatureBadge.vue";
import IntroductionText from "@/components/rank/lover/v2/IntroductionText.vue";
import TeamIdentity from "@/components/rank/lover/v2/TeamIdentity.vue";
import UserIdentity from "@/components/rank/lover/v2/UserIdentity.vue";
import { formatDateTime } from "@/utils/lover-v2";
import autoRefreshMixin from "@/mixins/lover-v2-auto-refresh";

export default {
    name: "LoverV2SoloDraw",
    mixins: [autoRefreshMixin],
    autoRefreshInterval: 8000,
    components: { LoverV2Layout, FeatureBadge, IntroductionText, TeamIdentity, UserIdentity },
    data: function () {
        return {
            drawing: false,
            historyLoading: false,
            draws: { list: [], count: 0, page: 1, pageSize: 20 },
            resultUnitId: null,
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
        team() {
            return this.contextError ? null : this.context?.team || null;
        },
        slug() {
            return this.$store.state.slug;
        },
        soloDrawEnabled() {
            return Boolean(this.context?.solo_draw_enabled);
        },
        canDraw() {
            return !this.contextError && (this.context?.actions?.includes("solo.draw") || false);
        },
        drawStatusText() {
            if (!this.soloDrawEnabled) return "运营尚未开启独狼盲盒";
            return this.canDraw ? "仍有独狼名额待抽取" : "当前没有可抽取名额";
        },
        drawTitle() {
            if (this.resultMember) return "独狼侠士已加入战队";
            if (!this.soloDrawEnabled) return "静候开幕式开启独狼盲盒";
            return "开启属于你们的最后一块拼图";
        },
        drawButtonText() {
            if (this.drawing) return "正在安全随机抽取";
            return this.soloDrawEnabled ? "开启独狼盲盒" : "等待运营开启";
        },
        resultMember() {
            if (!this.resultUnitId) return null;
            return this.team?.slots
                ?.flatMap((slot) => slot.units || [])
                .find((unit) => Number(unit.id) === Number(this.resultUnitId))
                ?.members?.[0];
        },
    },
    watch: {
        "team.id": {
            handler: function () {
                this.loadDraws();
            },
            immediate: true,
        },
    },
    methods: {
        formatDateTime,
        async refreshPollingData() {
            await this.$store.dispatch("loadV2Context", { force: true, background: true });
            await this.loadDraws(true);
        },
        async loadDraws(background = false) {
            if (!this.team?.id) return;
            if (!background) this.historyLoading = true;
            try {
                const res = await getSoloDraws(
                    this.eventId,
                    this.team.id,
                    {
                        page: 1,
                        page_size: this.draws.pageSize,
                    },
                    { mute: background }
                );
                this.draws = { ...this.draws, ...res.data.data, pageSize: res.data.data.page_size };
            } catch (error) {
                console.error("[LoverV2SoloDraw.loadDraws]", error);
            } finally {
                if (!background) this.historyLoading = false;
            }
        },
        memberForDraw(draw) {
            return this.team?.slots
                ?.flatMap((slot) => slot.units || [])
                .find((unit) => Number(unit.id) === Number(draw.selected_unit_id))
                ?.members?.[0];
        },
        async confirmDraw() {
            if (!this.canDraw) return;
            const confirmed = await this.$confirm(
                "抽取会立即占用一名符合当前阵容限制的独狼候选，队长不能自行重抽。确定开启吗？",
                "开启独狼盲盒",
                { type: "warning", confirmButtonText: "确认抽取", cancelButtonText: "再等等" }
            )
                .then(() => true)
                .catch(() => false);
            if (!confirmed) return;
            this.drawing = true;
            try {
                const res = await drawSolo(this.eventId, this.team.id);
                this.resultUnitId = res.data.data.selected_unit_id;
                await Promise.all([
                    this.$store.dispatch("loadV2Context", { force: true }),
                    new Promise((resolve) => window.setTimeout(resolve, 650)),
                ]);
                await this.loadDraws();
                this.$message.success("独狼抽取完成，成员已加入战队");
            } catch (error) {
                console.error("[LoverV2SoloDraw.confirmDraw]", error);
            } finally {
                this.drawing = false;
            }
        },
    },
};
</script>

<style scoped lang="less">
.m-draw-stage,
.m-draw-history {
    padding: 26px;
}

.u-team,
.u-history-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
}

.u-draw-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    min-height: 240px;
    margin: 24px 0 18px;
    border: 1px solid rgba(203, 151, 86, 0.35);
    border-radius: 14px;
    background:
        radial-gradient(circle at center, rgba(239, 190, 112, 0.18), transparent 45%),
        linear-gradient(120deg, #4b1d1e, #7a332f 52%, #3b181a);
    color: #fff5e6;

    h3 {
        margin: 0 0 8px;
        font-size: 23px;
    }

    p {
        max-width: 520px;
        margin: 0;
        color: rgba(255, 245, 230, 0.7);
        line-height: 1.7;
    }

    &.is-drawing :deep(img) {
        animation: lover-draw-pulse 0.8s ease-in-out infinite alternate;
    }
}

.u-result {
    display: grid;
    gap: 10px;
    max-width: 480px;
    margin: 0 auto 18px;
    padding: 16px;
    border: 1px solid #e5d0c2;
    border-radius: 11px;
    background: #fffaf5;
}

.u-actions {
    display: flex;
    justify-content: center;
}

.m-draw-history {
    margin-top: 22px;
}

.u-history-head {
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

.u-muted {
    color: #a28b84;
    font-size: 12px;
}

@keyframes lover-draw-pulse {
    from {
        filter: drop-shadow(0 8px 12px rgba(255, 197, 102, 0.25));
        transform: scale(0.96) rotate(-2deg);
    }
    to {
        filter: drop-shadow(0 16px 28px rgba(255, 197, 102, 0.7));
        transform: scale(1.05) rotate(2deg);
    }
}

@media screen and (max-width: 680px) {
    .u-team,
    .u-history-head,
    .u-draw-visual {
        align-items: stretch;
        flex-direction: column;
    }
}
</style>
