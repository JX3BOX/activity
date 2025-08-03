<template>
    <div class="m-lover-info wp">
        <div class="u-page-title">
            <img class="u-title-img" :src="`${__imgRoot}info-title.png`" />
        </div>
        <div class="m-desc-box">
            <div class="m-info-box">
                <div class="u-text" v-html="describe"></div>
            </div>
            <img class="u-top-left" :src="`${__imgRoot}fengye1.svg`" alt="" />
            <img class="u-bottom-right" :src="`${__imgRoot}fengye2.svg`" alt="" />
            <router-link :to="{name: 'join'}"><img class="u-join-btn" src="../../../tmp/to-join.png" alt=""></router-link>
        </div>
        <div class="m-lover-process">
            <img class="u-step-img" :src="`${__imgRoot}info-step.png`" alt="" />
            <div class="m-steps">
                <div class="m-step" v-for="(item, i) in process" :key="i" :class="`m-step-${timeDesc(item.time)}`">
                    <div class="u-icon">
                        <img class="u-img" :src="`${__imgRoot}status-${timeDesc(item.time)}.png`" />
                    </div>
                    <span class="u-dot"><i></i></span>
                    <span class="u-name">{{ item.text }}</span>
                    <span class="u-time">{{ formatTime(item.time) }}</span>
                    <span class="u-status" :class="timeDesc(item.time) ? `u-status-${timeDesc(item.time)}` : ''">
                        {{ timeDescMap[timeDesc(item.time)] || "&nbsp;" }}
                    </span>
                </div>
            </div>
        </div>
        <div class="m-lover-gift">
            <img class="u-gift-img" :src="`${__imgRoot}info-award.png`" alt="" />
            <div class="m-gift-content" v-html="gifts"></div>
        </div>
        <div class="m-lover-rule">
            <img class="u-rule-img" :src="`${__imgRoot}info-rule.png`" alt="" />
            <div class="m-rule-content" v-html="rule"></div>
        </div>
    </div>
</template>

<script>
import dayjs from "dayjs";
export default {
    name: "LoverInfo",
    inject: ["__imgRoot"],
    data: function () {
        return {
            timeDescMap: {
                0: "未开始",
                1: "进行中",
                2: "已结束",
            },
        };
    },
    computed: {
        process() {
            return this.$store.state.event.timeline;
        },
        describe() {
            return this.$store.state.event.describe;
        },
        gifts() {
            return this.$store.state.event.gifts;
        },
        rule() {
            return this.$store.state.event.rule;
        },
    },
    methods: {
        // 是否进行中
        timeDesc(time) {
            const now = dayjs();
            // 分割符可能是~或-
            const [start, end] = time.split(/[-~]/).map((t) => dayjs(t.trim()));
            // time可能是范围和单个时间，对比今日，可能是未开始、进行中或已结束
            if (end) {
                if (now.isBefore(start)) {
                    return 0;
                } else if (now.isAfter(end)) {
                    return 2;
                } else {
                    return 1;
                }
            } else {
                if (now.isBefore(start)) {
                    return 0;
                } else if (now.isSame(start, "day")) {
                    return 1;
                } else {
                    return 2;
                }
            }
        },
        formatTime(time) {
            const [start, end] = time.split(/[-~]/).map((t) => dayjs(t.trim()));
            if (end) {
                return `${start.format("MM/DD")}~${end.format("MM/DD")}`;
            } else {
                return start.format("MM/DD");
            }
        },
    },
};
</script>
<style lang="less">
@import "~@/assets/css/rank/lover/info.less";
</style>
