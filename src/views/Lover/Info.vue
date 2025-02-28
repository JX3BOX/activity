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
                <span class="u-name">{{ item.name }}</span>
                <span class="u-time">{{ item.time }}</span>
                <span class="u-desc">{{ item.desc }}</span>
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
        return {
            process: [
                { name: "报名申请", time: "~01.31", desc: "选择你心仪的TA一起参赛，必须用报名的角色进后续的比赛" },
                { name: "海选投票", time: "02.01~02.21", desc: "快来磕CP，撒份子钱啦" },
                { name: "海选入围", time: "02.21", desc: "" },
                { name: "初赛日", time: "02.21", desc: "" },
                { name: "决赛日", time: "02.21", desc: "" },
            ],
        };
    },
    computed: {
        loverId() {
            return this.$store.state.loverId;
        },
        describe() {
            return this.$store.state.info.describe;
        },
        gifts() {
            return this.$store.state.info.gifts;
        },
        rule() {
            return this.$store.state.info.rule;
        },
    },
    methods: {},
};
</script>
<style lang="less">
@import "~@/assets/css/rank/lover/info.less";
</style>
