<template>
    <div class="m-index m-xuanfuleidong" :class="{ 'is-mini': isMiniProgram }">
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
                <component class="m-info" :is="active" :list="componentData" />
                <img :src="`${__imgRoot}end.png`" class="u-axis" />
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
            return this.key == "winner" ? this.winList : this.list;
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
                    this.list = shuffle(res.data?.data?.vote_items || []);
                    await this.loadMyVote();
                    await this.loadWinner();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async loadMyVote() {
            const myVote = await getMyVote(this.id);
            this.myVote = myVote.data?.data?.list || [];
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
                        .filter(Boolean)
                        .map((voteItem) => {
                            const foundVote = this.myVote.find((e) => e.vote_item_id == voteItem.id);
                            this.$set(voteItem, "isVoted", !!foundVote);
                            return voteItem;
                        });
                }
                return newItem;
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
