<template>
    <div class="m-index m-xuanfuleidong">
        <Miniprogram v-if="isMiniProgram" :data="miniData" />
        <template v-else>
            <div class="m-kv">
                <img :src="`${__imgRoot}kv.jpg`" alt="玄府雷动" />
                <div class="m-title">
                    <img :src="`${__imgRoot}title.png`" alt="玩法创意大赛" />
                    <img :src="`${__imgRoot}no${index}.png?2`" class="u-no" :alt="`第${index || '1'}届`" />
                    <p class="u-desc" v-html="descHtml"></p>
                </div>
            </div>
            <div class="m-tabs">
                <div
                    v-for="(item, i) in tabs"
                    :key="i"
                    :class="[{ active: item.key == key }, [`u-tab-0${i + 1} u-tab-item`]]"
                    @click="handleTabClick(item.key)"
                ></div>
            </div>
            <div class="m-content" v-loading="loading">
                <div class="u-start"></div>
                <img :src="`${__imgRoot}end.png`" class="u-axis" />
                <!-- 详细内容 -->
                <component class="m-info" :is="active" :list="componentData" @update="changeList" />
                <img :src="`${__imgRoot}end.png`" class="u-axis" />
            </div>
            <div class="m-tips" :class="{ 'is-show': isShow }">
                <div class="m-code" v-if="key == 'vote'">
                    <div class="u-box">
                        <img class="u-code" :src="`${__imgRoot}qrcode.png`" alt="魔盒小程序" />
                        <p>微信扫码<br />给喜欢的玩法投票吧！</p>
                    </div>
                </div>
                <div class="u-top" @click="goTop">
                    <img :src="`${__imgRoot}top.png`" alt="返回顶部" />
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import { isMiniProgram } from "@jx3box/jx3box-common/js/utils";
import { getProgramDetail, getMyVote } from "@/service/event/vote";
import { getMenu } from "@jx3box/jx3box-common/js/api_misc";
import introduction from "./components/introduction.vue";
import vote from "./components/vote.vue";
import winner from "./components/winner.vue";
import Miniprogram from "./components/miniprogram.vue";
import { shuffle } from "lodash";
import { __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
import User from "@jx3box/jx3box-common/js/user.js";
export default {
    name: "Index",
    inject: ["__imgRoot"],
    components: {
        introduction,
        vote,
        winner,
        Miniprogram,
    },
    data: function () {
        return {
            isMiniProgram: isMiniProgram(),
            loading: false,
            index: "", // 届数
            id: 25, // 投票ID
            list: [], // 投票列表
            winList: [], // 获奖作品列表
            myVote: [], // 我的投票
            isShow: false,
            elementOffsetTop: 0,
            // key: "vote", // 当前选中的tab
            menu: "2025_xuanfuleidong_winner", // 获奖作品Key
            tabs: [
                { name: "活动介绍", key: "introduction", component: introduction },
                { name: "玩法投票", key: "vote", component: vote },
                { name: "获奖作品", key: "winner", component: winner },
            ],
            descHtml: `侠影开新境，巧思妙笔神。至微至玄、不可察之空隙，亦能震荡躁动，声势若雷鸣，名曰玄府雷动。<br />
                侠士是江湖最微小的构成点，是否也心有丘壑，意蕴磅礴，遂于一瞬，巧思如泉涌，欲为江湖开辟新局、创作出新鲜的玩法呢？<br />
                快拿起手中的生花妙笔，祝侠士奇思异想如潮生，同品江湖新章！
                <span class="u-desc-shadow">
                  侠影开新境，巧思妙笔神。至微至玄、不可察之空隙，亦能震荡躁动，声势若雷鸣，名曰玄府雷动。<br />
                  侠士是江湖最微小的构成点，是否也心有丘壑，意蕴磅礴，遂于一瞬，巧思如泉涌，欲为江湖开辟新局、创作出新鲜的玩法呢？<br />
                  快拿起手中的生花妙笔，祝侠士奇思异想如潮生，同品江湖新章！
                </span>`,
            miniHtml: `侠影开新境，巧思妙笔神。<br />至微至玄、不可察之空隙，亦能震荡躁动，声势若雷鸣，名曰玄府雷动。<br />侠士是江湖最微小的构成点，<br />是否也心有丘壑，意蕴磅礴，遂于一瞬，巧思如泉涌，<br />欲为江湖开辟新局、创作出新鲜的玩法呢？<br />快拿起手中的生花妙笔，祝侠士奇思异想如潮生，同品江湖新章！
                `,
        };
    },
    computed: {
        active() {
            return this.tabs.find((item) => item.key == this.key).component;
        },
        componentData() {
            return this.key === "winner" ? this.winList : this.list;
        },
        miniData() {
            return {
                descHtml: this.miniHtml,
                list: this.list,
                winList: this.winList,
                myVote: this.myVote,
                tabs: this.tabs,
            };
        },
        key() {
            return this.$route.query.key || "introduction";
        },
    },
    created() {
        this.loadData();
    },
    mounted() {
        this.$nextTick(() => {
            const element = this.$refs.stickyElement;
            if (element) {
                this.elementOffsetTop = element.offsetTop;
            }
        });

        window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    watch: {
        key() {
            if (this.key === "winner") {
                this.loadWinner();
            } else {
                this.loadData();
            }
        },
    },
    methods: {
        handleTabClick(key) {
            this.$router.push({
                query: {
                    key: key,
                },
            });
        },
        loadData() {
            this.loading = true;
            getProgramDetail(this.id)
                .then(async (res) => {
                    const list = shuffle(res.data?.data?.vote_items || []);
                    this.list = list.map((item) => {
                        if (!item?.user_info?.avatar) item.user_info.avatar = `${__cdn}image/common/avatar.png`;
                        return item;
                    });
                    if (User.isLogin()) await this.loadMyVote();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async loadMyVote() {
            const myVote = await getMyVote(this.id);
            this.myVote = myVote.data?.data?.list || [];
            this.list = this.list.map((item) => {
                item.isVoted = this.myVote.some((e) => e.vote_item_id == item.id);
                return item;
            });
        },
        async loadWinner() {
            const winList = await getMenu(this.menu);
            this.winList = (winList || []).map((item) => {
                const newItem = { ...item };
                if (newItem.ids) {
                    newItem.list = newItem.ids
                        .split(",")
                        .map((id) => {
                            return this.list.find((e) => e.id == id);
                        })
                        .filter(Boolean);
                }
                return newItem;
            });
        },
        changeList(id) {
            this.list = this.list.map((item) => {
                if (item.id == id) {
                    item.isVoted = true;
                    item.amount++;
                }
                return item;
            });
        },
        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.isShow = scrollTop > this.elementOffsetTop;
        },
        goTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/xuanfuleidong/index.less";
@import "~@/assets/css/event/xuanfuleidong/components.less";
@import "~@/assets/css/event/xuanfuleidong/miniProgram.less";
</style>
