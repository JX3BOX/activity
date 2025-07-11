<template>
    <div class="m-lover-info m-lover-page wp">
        <div class="u-page-title">
            <img class="u-img" :src="`${__imgRoot}info-title.png`" />
        </div>
        <div class="m-lover-box m-info-box">
            <h2>情缘杯</h2>
            <div v-html="describe"></div>
        </div>
        <div class="m-lover-process">
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
        <div class="m-lover-box">
            <h3>奖品</h3>
            <div v-html="gifts"></div>
        </div>
        <div class="m-lover-box">
            <h3>赛事规则</h3>
            <div v-html="rule"></div>
        </div>
    </div>
</template>

<script>
import { getLoverEvent } from "@/service/rank/lover";
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
