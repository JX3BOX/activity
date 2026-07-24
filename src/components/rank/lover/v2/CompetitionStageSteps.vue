<script>
const STAGE_STATE_MAP = {
    draft: { key: "upcoming", label: "未开始" },
    published: { key: "upcoming", label: "未开始" },
    pending: { key: "upcoming", label: "未开始" },
    scheduled: { key: "upcoming", label: "未开始" },
    running: { key: "running", label: "进行中" },
    active: { key: "running", label: "进行中" },
    in_progress: { key: "running", label: "进行中" },
    finished: { key: "finished", label: "已结束" },
    completed: { key: "finished", label: "已结束" },
    ended: { key: "finished", label: "已结束" },
    cancelled: { key: "cancelled", label: "已取消" },
    canceled: { key: "cancelled", label: "已取消" },
};

const STAGE_TYPE_MAP = {
    round_robin: "循环积分赛",
    single_elimination: "单败淘汰赛",
    double_elimination: "双败淘汰赛",
};

export default {
    name: "LoverV2CompetitionStageSteps",
    emits: ["select"],
    props: {
        stages: { type: Array, default: () => [] },
        activeStageId: { type: [String, Number], default: "" },
        compact: { type: Boolean, default: false },
    },
    computed: {
        stageSteps() {
            return this.stages.map((stage, index) => {
                const state = this.getStageState(stage.status);
                return {
                    stage,
                    key: stage.id ?? stage.sequence ?? index,
                    sequenceLabel: this.getSequenceLabel(stage.sequence, index),
                    state,
                    ruleLabel: this.getRuleLabel(stage),
                    timeLabel: this.getTimeLabel(stage),
                    selected: String(stage.id) === String(this.activeStageId),
                };
            });
        },
    },
    methods: {
        getStageState(status) {
            return STAGE_STATE_MAP[String(status || "").toLowerCase()] || STAGE_STATE_MAP.published;
        },
        getSequenceLabel(sequence, index) {
            const value = Number(sequence) > 0 ? Number(sequence) : index + 1;
            const digits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
            if (value < 10) return `第${digits[value]}程`;
            if (value === 10) return "第十程";
            if (value < 20) return `第十${digits[value % 10]}程`;
            if (value < 100) {
                const tail = value % 10 ? digits[value % 10] : "";
                return `第${digits[Math.floor(value / 10)]}十${tail}程`;
            }
            return `第${value}程`;
        },
        getRuleLabel(stage) {
            const labels = [STAGE_TYPE_MAP[stage.type] || "赛事赛程"];
            const bestOf = Number(stage.best_of);
            if (Number.isInteger(bestOf) && bestOf > 0) {
                labels.push(`${bestOf}局${Math.floor(bestOf / 2) + 1}胜`);
            }
            return labels.join(" · ");
        },
        getTimeLabel(stage) {
            const start = this.formatShortDate(stage.start_at);
            const end = this.formatShortDate(stage.end_at);
            if (!start && !end) return "时间待定";
            if (!start) return `至 ${end}`;
            if (!end || start === end) return start;
            return `${start} — ${end}`;
        },
        formatShortDate(value) {
            if (!value) return "";
            const date = new Date(value);
            if (Number.isNaN(date.getTime())) return "";
            return new Intl.DateTimeFormat("zh-CN", {
                month: "2-digit",
                day: "2-digit",
            }).format(date);
        },
        selectStage(stage) {
            this.$emit("select", stage.id, stage);
        },
    },
};
</script>

<template>
    <section
        class="c-competition-stage-steps"
        :class="{ 'is-compact': compact }"
        aria-label="赛程进度"
    >
        <div class="c-competition-stage-steps__scroll">
            <ol class="c-competition-stage-steps__track" role="tablist">
                <li
                    v-for="step in stageSteps"
                    :key="step.key"
                    class="c-competition-stage-steps__item"
                    :class="[
                        `is-${step.state.key}`,
                        { 'is-selected': step.selected },
                    ]"
                >
                    <button
                        class="c-competition-stage-steps__button"
                        type="button"
                        role="tab"
                        :aria-selected="step.selected"
                        @click="selectStage(step.stage)"
                    >
                        <span class="c-competition-stage-steps__node" aria-hidden="true">
                            <span v-if="step.state.key === 'finished'">成</span>
                            <span v-else-if="step.state.key === 'running'">行</span>
                            <span v-else-if="step.state.key === 'cancelled'">止</span>
                            <span v-else>启</span>
                        </span>
                        <span class="c-competition-stage-steps__content">
                            <span class="c-competition-stage-steps__eyebrow">
                                <span>{{ step.sequenceLabel }}</span>
                                <span class="c-competition-stage-steps__status">{{ step.state.label }}</span>
                            </span>
                            <strong>{{ step.stage.name || "未命名赛程" }}</strong>
                            <span class="c-competition-stage-steps__rule">{{ step.ruleLabel }}</span>
                            <time class="c-competition-stage-steps__time">{{ step.timeLabel }}</time>
                        </span>
                    </button>
                </li>
            </ol>
        </div>
    </section>
</template>

<style scoped lang="less">
.c-competition-stage-steps {
    --ornament-side-width: 150px;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(126, 73, 58, 0.24);
    background: linear-gradient(rgba(255, 250, 235, 0.25), rgba(247, 232, 207, 0.32)), #f6e8cf;
    box-shadow:
        inset 0 0 24px rgba(127, 71, 50, 0.08),
        0 8px 22px rgba(76, 40, 32, 0.06);

    &::before {
        content: "";
        position: absolute;
        z-index: 0;
        inset: 0;
        box-sizing: border-box;
        border-style: solid;
        border-width: 0 var(--ornament-side-width);
        border-image-source: url("~@/assets/img/lover/v2/schedule-ornament.webp");
        // 原图按左、中、右三段切片：两侧保持固定宽度，仅拉伸中间纸纹区域。
        border-image-slice: 0 520 fill;
        border-image-width: 0 var(--ornament-side-width);
        border-image-repeat: stretch;
        pointer-events: none;
    }
}

.c-competition-stage-steps__scroll {
    position: relative;
    z-index: 1;
    overflow-x: auto;
    padding: 22px 32px 20px;
    scrollbar-color: rgba(131, 66, 54, 0.38) transparent;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
        height: 5px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: rgba(131, 66, 54, 0.38);
    }
}

.c-competition-stage-steps__track {
    display: flex;
    width: max-content;
    min-width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
}

.c-competition-stage-steps__item {
    position: relative;
    min-width: 188px;
    flex: 1 0 188px;

    &::after {
        content: "";
        position: absolute;
        z-index: 0;
        top: 18px;
        left: 50%;
        width: 100%;
        height: 2px;
        background:
            linear-gradient(90deg, rgba(135, 75, 57, 0.36), rgba(177, 126, 81, 0.74)),
            repeating-linear-gradient(90deg, transparent 0 7px, rgba(89, 41, 36, 0.28) 7px 9px);
    }

    &:last-child::after {
        display: none;
    }

    &.is-finished::after {
        background: linear-gradient(90deg, #8b4037, #b78159);
    }
}

.c-competition-stage-steps__button {
    position: relative;
    z-index: 1;
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
    padding: 0 12px 8px;
    border: 0;
    outline: 0;
    background: transparent;
    color: #62423a;
    font: inherit;
    text-align: center;
    cursor: pointer;

    &:focus-visible .c-competition-stage-steps__node,
    &:hover .c-competition-stage-steps__node {
        box-shadow:
            0 0 0 3px rgba(248, 235, 207, 0.98),
            0 0 0 5px rgba(133, 58, 49, 0.42),
            0 5px 12px rgba(83, 39, 32, 0.2);
        transform: rotate(45deg) scale(1.04);
    }
}

.c-competition-stage-steps__node {
    display: inline-flex;
    box-sizing: border-box;
    width: 38px;
    height: 38px;
    align-items: center;
    justify-content: center;
    border: 1px solid #a97a5c;
    background: #f8edda;
    box-shadow:
        0 0 0 3px rgba(248, 235, 207, 0.98),
        0 3px 9px rgba(83, 39, 32, 0.14);
    color: #93614c;
    font-family: "ZCOOL XiaoWei", "STSong", serif;
    font-size: 16px;
    transform: rotate(45deg);
    transition: 0.2s ease;

    span {
        transform: rotate(-45deg);
    }
}

.is-running .c-competition-stage-steps__node,
.is-selected .c-competition-stage-steps__node {
    border-color: #6e2925;
    background: linear-gradient(135deg, #a95044, #74302b);
    color: #ffe7bd;
}

.is-finished .c-competition-stage-steps__node {
    border-color: #946647;
    background: linear-gradient(135deg, #c79a68, #86543e);
    color: #fff5dc;
}

.is-cancelled .c-competition-stage-steps__node {
    filter: grayscale(0.78);
    opacity: 0.72;
}

.c-competition-stage-steps__content {
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    flex-direction: column;
    margin-top: 14px;
}

.c-competition-stage-steps__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 5px;
    color: #9a7765;
    font-size: 11px;
    letter-spacing: 0.08em;
}

.c-competition-stage-steps__status {
    padding-left: 7px;
    border-left: 1px solid rgba(132, 73, 59, 0.3);
    color: #946052;
    letter-spacing: 0;
}

.is-running .c-competition-stage-steps__status {
    color: #a13f35;
    font-weight: 700;
}

.is-finished .c-competition-stage-steps__status {
    color: #8e6b4d;
}

.c-competition-stage-steps__content strong {
    width: 100%;
    overflow: hidden;
    color: #593831;
    font-family: "ZCOOL XiaoWei", "STSong", serif;
    font-size: 17px;
    line-height: 1.45;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.c-competition-stage-steps__rule,
.c-competition-stage-steps__time {
    margin-top: 5px;
    color: #90786e;
    font-size: 11px;
    line-height: 1.4;
}

.c-competition-stage-steps__time {
    color: #a38678;
}

.is-selected .c-competition-stage-steps__content strong {
    color: #8b352f;
}

.c-competition-stage-steps.is-compact {
    .c-competition-stage-steps__scroll {
        padding-top: 17px;
        padding-bottom: 14px;
    }

    .c-competition-stage-steps__item {
        min-width: 158px;
        flex-basis: 158px;
    }

    .c-competition-stage-steps__content strong {
        font-size: 15px;
    }

    .c-competition-stage-steps__time {
        display: none;
    }
}

@media screen and (max-width: 700px) {
    .c-competition-stage-steps {
        --ornament-side-width: 76px;
    }

    .c-competition-stage-steps__scroll {
        padding-right: 26px;
        padding-left: 26px;
        scroll-padding-inline: 26px;
        scroll-snap-type: x proximity;
    }

    .c-competition-stage-steps__item {
        min-width: 172px;
        flex-basis: 172px;
        scroll-snap-align: center;
    }
}
</style>
