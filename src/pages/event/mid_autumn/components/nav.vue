<template>
    <div class="c-midAutumn-nav">
        <div class="m-midAutumn-nav" :class="`m-midAutumn-nav-${i}`" v-for="(nav, i) in navs" :key="i">
            <div class="u-title">
                <img :src="getCdnLink(`design/event/mid_autumn/title.png`)" />
            </div>

            <!-- <div class="m-date" @click.stop="onDateShow"> -->
            <img class="u-change-button" @click.stop="onDateShow" :src="getCdnLink('design/event/mid_autumn/change_button.png')" alt="">
                <!-- <span class="u-date">{{ currentYear }}</span>

                <div class="m-date-picker" v-show="dateShow">
                    <div
                        v-for="item in years"
                        :key="item.year"
                        class="m-date-item"
                        :class="{ active: currentYear === item.year }"
                        @click.stop="onDateChange(item.year)"
                    >
                        {{ item.year }}
                    </div>
                </div>
                <i class="el-icon-arrow-down"></i> -->
            <!-- </div> -->

            <div class="u-nav-box">
                <div
                    class="u-nav-item"
                    :class="{ active: achieve_id == item.value }"
                    v-for="item in navs"
                    :key="item.value"
                    @click="navChange(item.value)"
                >
                    {{ item.text }}
                </div>
                <div class="u-select-poem" v-show="poemName">《{{ poemName }}》</div>
            </div>
        </div>
        <img class="u-qrcode" src="@/assets/img/event/mid_autumn_qrcode.png" alt="" />
        <YearChange v-model="showDialog" :years="years" @year-selected="onYearSelected"></YearChange>
    </div>
</template>

<script>
import {__cdn} from "@jx3box/jx3box-common/data/jx3box.json";
import YearChange from "./year_change.vue";
export default {
    props: {
        poemName: {
            type: String,
            default: "",
        },
        years: {
            type: Array,
            default: () => [],
        },
    },
    components: {
        YearChange,
    },
    data() {
        return {
            achieve_id: "intro",
            navs: [
                { text: "活动介绍", value: 'intro' },
                { text: "诗词赏析", value: 'poem' },
                // { text: "往届作品", value: 3 },
            ],

            currentYear: 2024,

            dateShow: false,

            showDialog: false,
        };
    },
    watch: {
        "$route": {
            handler: function (val) {
                const {year,tab} = val.params;
                if (year) {
                    this.currentYear = parseInt(year);
                }
                if (tab) {
                    this.achieve_id = tab;
                } else {
                    this.achieve_id = 'intro';
                }
            },
            immediate: true,
        },
    },
    created() {},
    methods: {
        navChange(val) {
            this.$emit("navChange", val);
            this.$router.push({
                name: "detail",
                params: {
                    year: this.currentYear,
                    tab: val,
                },
            });
        },
        onDateChange(year) {
            this.currentYear = year;
            this.dateShow = false;

            this.$router.push({
                name: "detail",
                params: {
                    year: this.currentYear,
                    tab: this.achieve_id,
                },
            });
        },
        onDateShow() {
            // this.dateShow = !this.dateShow;
            // document.addEventListener("click", this.onClose);
            this.showDialog = true;
        },
        onClose() {
            this.dateShow = false;
            document.removeEventListener("click", this.onClose);
        },
        getCdnLink(url) {
            return `${__cdn}${url}`;
        },
        onYearSelected(item) {
            this.$router.push({
                name: "detail",
                params: {year: item.year, tab: "intro"},
            });
        }
    }
};
</script>

<style lang="less">
@import "~@/assets/css/event/midautumn/v2/nav.less";
</style>
