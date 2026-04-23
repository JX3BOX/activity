<template>
    <div class="p-event" :class="'v-' + page_name">
        <CommonHeader :overlayEnable="true"></CommonHeader>
        <div class="m-init" v-if="mark" @click="mark = false">
            <div class="m-mark-title">
                <p>JX3BOX SCIENCE</p>
                <p>CATION INDEX</p>
                <b class="u-button"> 探索JBSCI →</b>
            </div>
            <div class="m-scroll-pic">
                <div class="scroll-track" :style="{ animationDuration: `${totalDuration}s` }">
                    <img
                        v-for="(img, index) in slider.concat(slider)"
                        :key="index"
                        :src="img"
                        class="animate-image"
                        alt="滚动图片"
                    />
                </div>
            </div>
        </div>
        <template v-else>
            <div class="p-event-content">
                <h2 class="u-top">
                    <img class="u-logo" src="@/assets/img/event/jbsci.svg" svg-inline />
                    <b>JBSCI · JX3BOX SCIENCE CITATION INDEX</b>
                </h2>
                <div class="m-change" @click="toggleTab">
                    <div class="u-type">
                        {{ tabs[active].name }}
                        <img class="u-svg" src="@/assets/img/event/change.svg" svg-inline />
                    </div>
                    <div>{{ active }}</div>
                </div>

                <component :is="tabs[active].component" :data="componentData" />
            </div>
            <Footer />
        </template>
    </div>
</template>

<script>
const KEY = "jbsci";
import { getTopic } from "@/service/event/topic";
import { groupBy, mapValues } from "lodash";
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __imgPath } from "@/utils/config";
import Footer from "./components/footer.vue";
import ARTICLES from "./components/articles.vue";
import AUTHORS from "./components/authors.vue";
export default {
    name: "App",
    provide: {
        __imgRoot: __imgPath + "topic/jbsci/",
    },
    data: function () {
        return {
            raw: [],
            mark: false,

            slider: [],
            singleSpeed: 10, // 每张图片滚动耗时（秒）
            totalDuration: 0, // 总动画时长

            authors: [],
            invited: [],
            SCI: {},
            season: [],
            cover: [],

            tabs: {
                ARTICLES: {
                    name: "精选作品",
                    key: "ARTICLES",
                    component: ARTICLES,
                },

                AUTHORS: {
                    name: "作者",
                    key: "AUTHORS",
                    component: AUTHORS,
                },
            },

            active: "ARTICLES",
        };
    },
    components: { Footer, ARTICLES, AUTHORS },
    computed: {
        page_name: function () {
            return this.$route.name;
        },
        data() {
            let _data = {};
            this.raw.forEach((item) => {
                if (!item.subtype.includes("SCI") && !_data[item.subtype]) {
                    _data[item.subtype] = [];
                }
                if (_data[item.subtype]) {
                    _data[item.subtype].push(item);
                }
            });
            Object.keys(_data).forEach((key) => {
                _data[key] = _data[key].sort((a, b) => a.power - b.power);
            });

            const list = this.raw.filter((item) => item.subtype.includes("SCI"));
            const groupedByYear = groupBy(list, (item) => item.subtype.replace("SCI", ""));
            _data.SCI = mapValues(groupedByYear, (group) => {
                return groupBy(group, "icon");
            });
            return _data;
        },
        linkKey() {
            return this.$route.query.tab;
        },
        componentData() {
            const _data = {
                ARTICLES: {
                    sci: this.SCI,
                    season: this.season,
                    cover: this.cover,
                },
                AUTHORS: this.authors,
            };
            return _data[this.active];
        },
        nextTabKey() {
            const tabKeys = Object.keys(this.tabs);
            const currentIndex = tabKeys.findIndex((key) => key === this.active);
            return tabKeys[(currentIndex + 1) % tabKeys.length];
        },
    },
    watch: {
        linkKey: {
            immediate: true,
            handler(val) {
                if (val && this.tabs[val]) {
                    this.mark = false;
                    this.active = val;
                    this.active_name = this.tabs[val].name;
                }
            },
        },
        slider: {
            handler(newVal) {
                if (newVal.length) {
                    this.totalDuration = this.singleSpeed * newVal.length;
                }
            },
            immediate: true,
        },
        active(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.$router.push({
                    query: { ...this.$route.query, tab: newVal },
                });
            }
        },
    },
    methods: {
        init() {
            getTopic(KEY).then((res) => {
                this.raw = res.data.data.map((item) => {
                    if (item.link) item.type = item.link.split("/")[0];
                    return item;
                });
                const { slider, authors, year_groups, SCI, season, cover } = this.data;
                this.slider = slider.map((item) => item.img) || [];
                this.authors = year_groups;
                this.invited = authors;
                this.SCI = SCI;
                this.season = season;
                this.cover = cover;
            });
        },

        toggleTab() {
            const nextKey = this.nextTabKey;
            this.active = nextKey;
            this.active_name = this.tabs[nextKey].name;
        },
    },
    mounted() {
        this.init();
    },
    created: function () {
        postStat("event", "jbsci");
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/jbsci/mobile.less";
</style>
