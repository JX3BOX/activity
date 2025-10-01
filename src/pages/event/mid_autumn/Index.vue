<!--
 * @Author: zhusha
 * @Date: 2024-08-14 20:17:51
 * @LastEditors: zhusha
 * @LastEditTime: 2024-08-20 20:41:44
 * @Description: 中秋诗词专题PAGE4设计稿
 *
 * Copyright (c) 2024 by zhusha, email: no email, All Rights Reserved.
-->
<template>
    <div class="p-event-midAutumn" @click="goToDetail">
        <!-- 首页展示 -->
        <div class="m-box">
            <video
                class="u-video"
                src="https://cdn.jx3box.com/design/miniprogram/midautumn/zhongqiu2024.mp4"
                :poster="`${__imgRoot}tittle.png`"
                autoplay
                loop
                muted="false"
                object-fit="cover"
            ></video>

            <div class="m-title-box">
                <img class="u-title" :src="title" alt=""/>
                <div class="u-year" @click.stop="onYearChange">{{ yearInChinese }}届 <img class="u-year-switch" src="~@/assets/img/event/switch_touchbar_mid.svg" alt=""></div>
            </div>
        </div>

        <YearChange v-model="showDialog" :years="years" @year-selected="onYearSelected"></YearChange>
    </div>
</template>

<script>
import {__cdn} from "@/utils/config";
const zh_num = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
import YearChange from "./components/year_change.vue";
export default {
    name: "Index",
    inject: ["__imgRoot"],
    props: {
        years: {
            type: Array,
            default: () => [],
        },
    },
    components: {
        YearChange,
    },
    data: function () {
        return {
            title: `${__cdn}design/event/mid_autumn/title.png`,

            showDialog: false,
        };
    },
    computed: {
        year() {
            return this.years[this.years.length - 1]?.year || new Date().getFullYear();
        },
        yearInChinese() {
            return this.getYearInChinese();
        }
    },
    methods: {
        goToDetail() {
            this.$router.push({
                name: "detail",
                params: {year: this.year, tab: "intro"},
            });
        },
        getYearInChinese() {
            const year = this.year.toString().split("");
            let res = "";
            year.forEach((item) => {
                res += zh_num[parseInt(item)];
            });
            return res;
        },
        onYearChange() {
            this.showDialog = true;
        },
        onYearSelected(item) {
            this.$router.push({
                name: "detail",
                params: {year: item.year, tab: "intro"},
            });
        }
    },
    mounted() {},
};
</script>

<style lang="less">
@import "~@/assets/css/event/midautumn/v2/index.less";
</style>
