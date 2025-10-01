<template>
    <div class="p-midautumn-detail">
        <div class="u-bg" :style="bgStyle">
            <Nav :poemName="poemData?.title || ''" @navChange="back" :years="years"></Nav>
            <div class="u-main-box">
                <div class="c-midAutumn-appreciate">
                    <transition name="fade" mode="out-in" v-if="poemData">
                        <div class="m-poem-main">
                            <div class="u-back" @click="back"><i class="el-icon-arrow-left"></i></div>

                            <div class="u-author-info">
                                <div class="u-title">{{ poemData.title }}</div>
                                <div class="u-author">{{ poemData.sub_title }}</div>
                                <a :href="`/author/${poemData.user_info.id}`" target="_blank" class="u-user">{{
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
                    <div class="m-judges">
                        <div class="m-qrcode">
                            <img class="u-img" :src="`${getPic('design/miniprogram/midautumn/code-bg.png?1')}`" alt="" />
                            <img class="u-qrcode" :src="qrcode" alt="" />
                        </div>
                        <div class="m-list">
                            <div class="m-tips">
                                <img class="u-icon" :src="`${getPic('design/miniprogram/midautumn/mdi_vote.svg')}`" alt="" />
                                <div class="u-tips">
                                    <div class="u-title">微信扫月亮参与投票↗</div>
                                    <div class="u-desc">有机会赢取故宫中秋好礼！</div>
                                </div>
                            </div>
                            <template v-if="poemData?.id && judges[poemData.id] && judges[poemData.id].length">
                                <img :src="`${getPic('design/miniprogram/midautumn/judges.png')}`" class="u-judges" />
                                <div class="m-scrollbar">
                                    <div class="m-item" v-for="(item, i) in judges[poemData.id]" :key="item.id">
                                        <div class="m-user">
                                            <img :src="`${getPic('design/miniprogram/midautumn/avatar.png')}`" class="u-avatar" />
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
            </div>
        </div>
    </div>
</template>

<script>
import color from "@/assets/data/event/color.json";
import Nav from "./components/nav.vue";
import { getProgramItem, getVoteJudges, getVoteItemQrcode } from "@/service/event/vote";
import { __cdn } from "@/utils/config";
import { cloneDeep } from "lodash";
export default {
    props: {
        years: {
            type: Array,
            default: () => [],
        },
    },
    components: { Nav },
    data() {
        return {
            poemData: null,

            tips: "注：图片仅为展示效果，非最终获奖作品",
            qrcode: "",
            bgStyle: null,
            judges: {}
        }
    },
    computed: {
        year() {
            return this.$route.params.year || new Date().getFullYear();
        },
        poem_id() {
            return this.$route.query.id || 0;
        },
        id() {
            return this.years.find((item) => item.year == this.year)?.vote_id || 0;
        }
    },
    watch: {
        poem_id: {
            handler: function (val) {
                if (val) {
                    this.getPoemDetail();
                }
            },
            immediate: true,
        },
    },
    methods: {
        getPoemDetail() {
            if (!this.poem_id) {
                return;
            }
            getProgramItem(this.id, this.poem_id).then((res) => {
                this.poemData = res.data.data;

                getVoteItemQrcode(this.poemData.id, {
                    page: "pages/midautumn/poem/poem",
                    program_id: this.poemData.program_id,
                }).then((res) => {
                    const cdn = __cdn.replace(/\/+$/, "");
                    this.qrcode = `${cdn}${res.data.data}?123`;
                });
            });

            // this.getRandomColor();
            this.loadJudges();
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
        getPic(url) {
            return `${__cdn}${url}`;
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
        back() {
            this.$router.go(-1)
        },
        getRandomColor() {
            const colors = Object.values(color.color).map((item) => item.color);
            const i = Math.floor(Math.random() * colors.length);
            const _c = colors[i] ? colors[i] : `rgba(23, 36, 58, 0.95)`;
            this.bgStyle = `background:linear-gradient(90deg, ${_c} 0%, rgba(175, 72, 89, 0) 100%)`;
        },
    }
}
</script>

<style lang="less">
@import "~@/assets/css/event/midautumn/v2/index.less";
@import "~@/assets/css/event/midautumn/v2/appreciate.less";
</style>
