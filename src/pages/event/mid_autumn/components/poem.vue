<template>
    <div class="c-midAutumn-appreciate">
        <div class="u-empty" v-if="!list.length && !loading">
            作品收集中，侠士可按照活动介绍中参赛方式前往魔盒网站茶馆论坛处提交作品~
            <div class="u-item">
                <a href="/community?category=story" target="_blank">快速前往 <i class="el-icon-right"></i></a>
            </div>
        </div>
        <!-- 诗词区域 -->
        <div class="u-list">
            <template v-if="loading">
                <div
                    class="u-item u-skeleton"
                    v-for="i in 8"
                    :key="`skeleton-${i}`"
                    :style="{ 'background-color': getColorStyle(i - 1) }"
                    aria-hidden="true"
                >
                    <span class="u-skeleton-author">
                        <i v-for="char in 8" :key="char"></i>
                    </span>
                    <span class="u-skeleton-content">
                        <span class="u-skeleton-column" v-for="column in 5" :key="column">
                            <i v-for="char in 8 + ((column + i) % 4)" :key="char"></i>
                        </span>
                    </span>
                </div>
            </template>
            <div
                v-else
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
                    <span v-for="(item2, i2) in getPoemTextLines(item.content)" :key="i2">
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
import poemsMixin from "../mixins/poems";
import { getPoemTextLines } from "../components_app/poemCommon";
export default {
    mixins: [poemsMixin],
    props: {
        years: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        year() {
            return this.$route.params.year || new Date().getFullYear();
        },
        voteId() {
            return this.years.find((item) => item.year == this.year)?.vote_id || 0;
        },
    },
    methods: {
        getPoemTextLines,
        getUserAndTitle(item) {
            return (item.user_info?.display_name || "") + ("︽" + item.title + "︾");
        },
        symbolJudge(item) {
            let symbol = item.substring(0, 16).substring(item.substring(0, 16).length - 1);
            return ["！", "？", "。", "，", "︽", "︾"].includes(symbol);
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
            });
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/midautumn/v2/appreciate.less";
</style>
