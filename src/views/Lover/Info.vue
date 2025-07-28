<template>
    <div class="m-lover-info wp">
        <div class="u-page-title">
            <img class="u-title-img" :src="`${__imgRoot}info-title.png`" />
        </div>
        <div class="m-desc-box">
            <div class="m-info-box">
                <div class="u-text" v-html="describe"></div>
            </div>
            <!-- <h2>情缘杯</h2> -->
            <img class="u-top-left" :src="`${__imgRoot}fengye1.svg`" alt="" />
            <img class="u-bottom-right" :src="`${__imgRoot}fengye2.svg`" alt="" />
        </div>
        <div class="m-lover-process">
            <img class="u-step-img" :src="`${__imgRoot}info-step.png`" alt="">
            <div class="m-steps">
                <div class="m-step" v-for="(item, i) in process" :key="i">
                    <div class="u-icon">
                        <img class="u-img" :src="`${__imgRoot}step${i + 1}.svg`" />
                    </div>
                    <span class="u-dot"><i></i></span>
                    <span class="u-name">{{ item.text }}</span>
                    <span class="u-time">{{ item.time }}</span>
                    <!-- <span class="u-desc">{{ item.desc }}</span> -->
                </div>
            </div>
        </div>
        <div class="m-lover-gift">
            <img class="u-gift-img" :src="`${__imgRoot}info-award.png`" alt="">
            <div class="m-gift-content" v-html="gifts"></div>
        </div>
        <div class="m-lover-rule">
            <img class="u-rule-img" :src="`${__imgRoot}info-rule.png`" alt="">
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
        return {};
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
    methods: {},
};
</script>
<style lang="less">
@import "~@/assets/css/rank/lover/info.less";
</style>
