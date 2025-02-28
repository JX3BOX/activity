<template>
    <div class="c-midAutumn-appreciate" v-loading="loading">
        <div v-if="!showPoem">
            <!-- 投票/参赛 -->
            <!-- <div class="u-btn">
                    <span class="u-item active">投票</span>

                </div> -->
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
                        <!-- {{ item.author }}{{ item.title.replace(/《/g, "︽").replace(/》/g, "︾") }} -->
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
                    <!-- <div class="u-vote" @click.stop="vote(item, i)">
                            <el-tooltip effect="dark" content="投票" placement="top">
                                <div class="u-number"><img src="../../../assets/img/mdi_vote.svg" /><b>20</b></div>
                            </el-tooltip>
                        </div> -->
                    <!-- 票数 -->
                    <!-- <div class="u-number">20</div> -->
                </div>
            </div>
        </div>
        <!-- 详细诗词 -->
        <transition name="fade" mode="out-in">
            <div class="m-poem-main" v-if="showPoem">
                <div class="u-back" @click="back"><i class="el-icon-arrow-left"></i></div>

                <div class="u-author-info">
                    <div class="u-title">{{ poemData.title }}</div>
                    <div class="u-author">{{ poemData.sub_title }}</div>
                    <a :href="`${root}author/${poemData.user_info.id}`" target="_blank" class="u-user">{{
                        poemData.user_info.display_name
                    }}</a>
                </div>
                <!-- 诗词内容区域 -->
                <div class="u-content">
                    <div
                        class="u-desc-item"
                        :class="{ warp: item.length > 43 }"
                        v-for="(item, i) in getText(poemData.content, 2)"
                        :key="i"
                        v-html="item"
                    ></div>
                </div>
                <div class="u-title-tips">
                    {{ tips }}
                </div>
            </div>
        </transition>
        <div class="m-judges" v-if="showPoem">
            <div class="m-qrcode">
                <img class="u-img" :src="`${cdn}design/miniprogram/midautumn/code-bg.png?1`" alt="" />
                <img class="u-qrcode" :src="qrcode" alt="" />
            </div>
            <div class="m-list">
                <div class="m-tips">
                    <img class="u-icon" :src="`${cdn}design/miniprogram/midautumn/mdi_vote.svg`" alt="" />
                    <div class="u-tips">
                        <div class="u-title">微信扫月亮参与投票↗</div>
                        <div class="u-desc">有机会赢取故宫中秋好礼！</div>
                    </div>
                </div>
                <template v-if="poemData?.id && judges[poemData.id] && judges[poemData.id].length">
                    <img :src="`${cdn}design/miniprogram/midautumn/judges.png`" class="u-judges" />
                    <div class="m-scrollbar">
                        <div class="m-item" v-for="(item, i) in judges[poemData.id]" :key="item.id">
                            <div class="m-user">
                                <img :src="`${cdn}design/miniprogram/midautumn/avatar.png`" class="u-avatar" />
                                <div class="u-name">
                                    <span>{{ `评委${i + 1}` }}</span>
                                    <span class="u-value">魔盒诗词大会</span>
                                </div>
                            </div>
                            <div class="m-content" :style="bgStyle">
                                <span v-html="item.description"></span>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import color from "@/assets/data/event/color.json";
import { getProgramDetail, getVoteItemQrcode, getVoteJudges } from "@/service/event/vote";
import { __cdn, __Root } from "@jx3box/jx3box-common/data/jx3box.json";
import { cloneDeep, shuffle } from "lodash";
const KEY = "poems";
export default {
    components: {},
    props: {},
    data() {
        return {
            poemData: null,
            showPoem: false,
            achieve_id: null,
            select_id: null,
            list: [],
            tips: "",
            loading: false,
            qrcode: "",
            judges: {},
            cdn: __cdn,
            bgStyle: null,
            root: __Root,

            id: 12,
        };
    },
    watch: {
        "$route.query": {
            handler: function (val) {
                if (val.a) {
                    this.achieve_id = val.a;
                }
                if (val.select) {
                    this.select_id = val.select;
                }
                this.load();
            },
            immediate: true,
        },

        select_id: {
            handler(val) {
                if (val) {
                }
            },
            immediate: true,
        },
    },
    mounted() {
        this.loadJudges();
    },
    methods: {
        load() {
            this.loading = true;
            getProgramDetail(this.id).then((res) => {
                this.list = shuffle(res.data.data.vote_items || []);
                this.loading = false;
                this.init();
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
        init() {
            let val = this.list;
            if (val.length > 0 && this.select_id) {
                this.showPoem = true;
                let index = val.findIndex((item) => item.id == this.select_id);
                this.poemData = val[index];
                this.getTipsText(this.poemData.title);
                this.$emit("poem", { item: this.poemData, c: index });
                this.poemBg(index);
                getVoteItemQrcode(val[index].id, {
                    page: "pages/midautumn/poem/poem",
                    program_id: val[index].program_id,
                }).then((res) => {
                    const cdn = __cdn.replace(/\/+$/, "");
                    this.qrcode = `${cdn}${res.data.data}?123`;
                });
            }
        },
        poemBg(i) {
            const _c = color.color[i] ? color.color[i].color : `rgba(23, 36, 58, 0.95)`;
            this.bgStyle = `background:linear-gradient(90deg, ${_c} 0%, rgba(175, 72, 89, 0) 100%)`;
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
            // let splitArr = val.split(/[。？！]/);
            // let splitArr = val.split(/(?<=。)|(?=。)/);
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
        poem(item, i) {
            this.poemData = item;
            this.showPoem = true;
            this.$emit("poem", { item, c: i });
            this.poemBg(i);
            this.getTipsText(item.title);
            this.$router.push({
                query: {
                    a: this.achieve_id,
                    select: item.id,
                },
            });
        },
        back() {
            this.poemData = null;
            this.showPoem = false;
            this.select_id = null;
            this.$emit("back");
            this.$router.push({
                query: {
                    a: this.achieve_id,
                },
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/event/midautumn/v2/appreciate.less";
</style>
