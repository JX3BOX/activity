<template>
    <div class="c-midAutumn-nav">
        <div class="m-midAutumn-nav" :class="`m-midAutumn-nav-${i}`" v-for="(nav, i) in navs" :key="i">
            <div class="u-title">
                <img :src="`${__imgRoot}menu.png`" />
            </div>

            <div class="m-date" @click.stop="onDateShow">
                <span class="u-date">{{ currentYear }}</span>

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
                <i class="el-icon-arrow-down"></i>
            </div>

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
    </div>
</template>

<script>
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
    inject: ["__imgRoot"],
    components: {},
    data() {
        return {
            achieve_id: 1,
            navs: [
                { text: "活动介绍", value: 'intro' },
                { text: "诗词赏析", value: 'poem' },
                // { text: "往届作品", value: 3 },
            ],

            currentYear: 2024,

            dateShow: false,
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
            this.dateShow = !this.dateShow;
            document.addEventListener("click", this.onClose);
        },
        onClose() {
            this.dateShow = false;
            document.removeEventListener("click", this.onClose);
        },
    }
};
</script>

<style lang="less">
@import "~@/assets/css/event/midautumn/v2/nav.less";
</style>
