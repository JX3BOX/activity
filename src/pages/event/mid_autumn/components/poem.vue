<template>
    <div class="c-midAutumn-appreciate" v-loading="loading">
        <div class="u-empty" v-if="!list.length && !loading">
            作品收集中，侠士可按照活动介绍中参赛方式前往魔盒网站茶馆论坛处提交作品~
            <div class="u-item">
                <a href="/community?category=诗词" target="_blank">快速前往 <i class="el-icon-right"></i></a>
            </div>
        </div>
        <!-- 诗词区域 -->
        <div class="u-list">
            <div
                class="u-item"
                v-for="(item, i) in list"
                :key="i"
                :style="{ 'background-color': getColorStyle(i) }"
                @click="poem(item, i)"
            >
                <div class="u-left">
                    <span class="u-text" :title="item.title">
                        {{
                            getUserAndTitle(item).length > 24
                                ? getUserAndTitle(item).substring(0, 24)
                                : getUserAndTitle(item)
                        }}
                        <span
                            v-if="getUserAndTitle(item).length > 24 && !symbolJudge(getUserAndTitle(item))"
                            class="u-more"
                            >...</span
                        >
                    </span>
                </div>
                <div class="u-right">
                    <span v-for="(item2, i2) in getText(item.content, 1)" :key="i2">
                        <div v-if="i2 < 6">
                            <span v-if="i2 < 5" class="u-text"
                                >{{ item2.length > 16 ? item2.substring(0, 16) : item2 }}

                                <span v-if="item2.length > 16 && !symbolJudge(item2)" class="u-more">...</span>
                                <span v-if="item2.length < 16 && !symbolJudge(item2)">。</span>
                            </span>
                            <span v-if="i2 == 5" class="u-more">...</span>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import color from "@/assets/data/event/color.json";
import { getProgramDetail, getVoteJudges } from "@/service/event/vote";
import { __cdn, __Root } from "@/utils/config";
import { cloneDeep, shuffle } from "lodash";
export default {
    components: {},
    props: {
        years: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            poemData: null,
            showPoem: false,
            achieve_id: null,
            select_id: null,
            list: [],
            tips: "",
            loading: false,

            judges: {},

            id: 0,
        };
    },
    computed: {
        year() {
            return this.$route.params.year || new Date().getFullYear();
        },
    },
    mounted() {
        this.loadJudges();

        this.id = this.years.find((item) => item.year == this.year)?.vote_id || 0;
        this.load();
    },
    methods: {
        load() {
            if (!this.id) {
                return;
            }
            this.loading = true;
            getProgramDetail(this.id).then((res) => {
                this.list = shuffle(res.data.data.vote_items || []);
                this.loading = false;
            });
        },
        loadJudges() {
            getVoteJudges().then((res) => {
                const _res = res || [];
                this.judges = _res
                    .filter((item) => item.status)
                    .reduce((acc, cur) => {
                        if (!acc[cur.remark]) {
                            acc[cur.remark] = [];
                        }
                        acc[cur.remark].push(cur);
                        return acc;
                    }, {});
            });
        },
        getUserAndTitle(item) {
            return (item.user_info?.display_name || "") + ("︽" + item.title + "︾");
        },
        /**
         * 根据诗词标题截取
         *1 个字 截取1，2 截取12，3 截取23，4-99截取34
         */
        getTipsText(title) {
            let text = title?.match(/[\u4e00-\u9fa5]/g) || [];

            if (text.length == 3) {
                this.tips = text[1] + text[2];
            } else if (text.length > 3) {
                this.tips = text[2] + text[3];
            } else {
                this.tips = title;
            }
        },
        symbolJudge(item) {
            let symbol = item.substring(0, 16).substring(item.substring(0, 16).length - 1);
            return ["！", "？", "。", "，", "︽", "︾"].includes(symbol);
        },
        getText(val, type) {
            let str = cloneDeep(val);
            let splitArr = str.split(/\n/);
            let arr = [];
            splitArr.forEach((item, i) => {
                if (item) {
                    let regex = /https?:\/\/[^"']*\.(?:jpg|jpeg|gif|png)/gi;
                    var imageUrls = item.match(regex);
                    if (imageUrls) {
                        imageUrls.forEach((element) => {
                            if (type == 1) {
                                item = item.replace(element, "");
                            } else {
                                let imgStr = `<img src="${element}" alt="" />`;
                                item = item.replace(element, imgStr);
                            }
                        });
                    }
                    arr.push(item);
                }
            });
            return arr;
        },
        getColorStyle(i) {
            let colors = color.color;
            return colors[i % colors.length].color;
        },
        poem(item) {
            this.$router.push({
                name: "poem",
                params: { year: this.year },
                query: { id: item.id },
            })
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/midautumn/v2/appreciate.less";
</style>
