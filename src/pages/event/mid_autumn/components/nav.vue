<template>
    <aside class="c-midAutumn-nav" :style="buttonThemeStyle">
        <div class="m-midAutumn-nav">
            <img class="u-title" :src="getCdnLink('design/event/mid_autumn/title_new.png')" alt="魔盒诗词大会" />
            <button class="m-date" type="button" aria-label="切换活动年份" @click="onDateShow">· {{ currentYear }} ·</button>
            <nav class="u-nav-box" aria-label="活动导航">
                <button v-for="item in navs" :key="item.value" class="u-nav-item" type="button"
                    :class="{ active: achieve_id === item.value }" :aria-current="achieve_id === item.value ? 'page' : undefined"
                    @click="navChange(item.value)"><span>{{ item.text }}</span></button>
                <div v-if="poemName" class="u-select-poem">《{{ poemName }}》</div>
            </nav>
        </div>
        <YearChange v-model="showDialog" :years="years" @year-selected="onYearSelected" />
    </aside>
</template>

<script>
import {__cdn} from "@/utils/config";
import buttonThemeMixin from "../mixins/buttonTheme";
import YearChange from "./year_change.vue";
export default {
    mixins: [buttonThemeMixin],
    emits: ["navChange"],
    computed: { year() { return this.currentYear; } },
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
                { text: "诗词赏鉴", value: 'poem' },
                { text: "作品投票", value: "vote" },
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
                    this.achieve_id = 'poem';
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
                params: {year: item.year, tab: this.achieve_id},
            });
        }
    }
};
</script>

<style lang="less">
@import "~@/assets/css/event/midautumn/v2/nav.less";
</style>
