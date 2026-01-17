<template>
    <div class="p-event-content p-jx3cxk">
        <div class="m-jx3cxk-bg">
            <div class="u-note"></div>
            <div class="u-staff"></div>
        </div>
        <div class="m-kv">
            <div class="u-title">
                <img :src="`${imgRoot}web/title.png`" />
                <img class="u-year" :src="`${imgRoot}web/title2026.png`" />
                <img class="u-star" :src="`${imgRoot}web/biling.png`" />
            </div>
        </div>
        <div class="m-tabs wp">
            <div
                class="u-tab"
                v-for="(item, i) in tabs"
                :class="{ active: active === item.key }"
                :key="i"
                @click="changeTab(item.key)"
            >
                {{ item.name }}
            </div>
        </div>
        <component :is="components[active]" :list="componentList"></component>
    </div>
</template>
<script>
import Info from "./components/Info.vue";
import Vote from "./components/Vote.vue";
import Stats from "./components/Stats.vue";
import User from "@jx3box/jx3box-common/js/user.js";
import { shuffle } from "lodash";
import { getMenu } from "@jx3box/jx3box-common/js/api_misc";
import { getProgramDetail, getMyVote } from "@/service/event/vote";
export default {
    name: "Index",
    inject: ["__imgRoot"],
    components: { Info, Vote, Stats },
    data: function () {
        return {
            id: 28,
            menu: "jx3cxk_data",
            imgRoot: this.__imgRoot,
            active: "info",
            tabs: [
                { key: "info", name: "活动介绍" },
                { key: "vote", name: "参赛作品" },
                { key: "stats", name: "获奖展示" },
            ],
            components: {
                info: Info,
                vote: Vote,
                stats: Stats,
            },
            loading: false,
            firstLoad: true,
            list: [],
            myVote: [],
            stats: [],
        };
    },
    computed: {
        router_tab() {
            return this.$route.query?.tab;
        },
        year() {
            return this.$route.query.year || new Date().getFullYear();
        },
        statsList() {
            const obj = this.stats.reduce((prev, cur) => {
                prev[cur.year] = cur;
                return prev;
            }, {});
            const top = this.handlerItem(obj[this.year]?.top || "");
            const other = this.handlerItem(obj[this.year]?.other || "");
            return [top, other];
        },
        componentList() {
            const obj = {
                vote: this.list,
                stats: this.statsList,
            };
            return obj[this.active] || [];
        },
    },
    watch: {
        router_tab: {
            handler(val) {
                val ? this.changeTab(val) : this.changeTab(this.active);
            },
            immediate: true,
        },
    },
    methods: {
        changeTab(key) {
            this.active = key;
            const tabActionMap = {
                info: () => {},
                vote: () => {
                    User.isLogin() && this.loadMyVote();
                },
                stats: () => {
                    this.loadStats();
                },
                default: () => {
                    this.loadData();
                },
            };
            if (this.firstLoad) {
                this.loadData();
                return;
            }
            (tabActionMap[this.active] || tabActionMap.default)();
        },
        loadData() {
            if (!this.firstLoad) {
                return;
            }
            this.loading = true;
            this.firstLoad = false;
            getProgramDetail(this.id)
                .then(async (res) => {
                    const list = shuffle(res.data?.data?.vote_items || []);
                    this.list = list.map((item) => {
                        if (!item?.user_info?.avatar) item.user_info.avatar = `${__cdn}image/common/avatar.png`;
                        item.slider = 0;
                        return item;
                    });
                    if (User.isLogin() && this.active === "vote") this.loadMyVote();
                    if (this.active === "stats") this.loadStats();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        loadMyVote() {
            if (this.myVote.length) return;
            getMyVote(this.id).then((res) => {
                this.myVote = res.data?.data?.list || [];
                this.list = this.list.map((item) => ({
                    ...item,
                    isVoted: this.myVote.some((e) => e.vote_item_id == item.id),
                }));
            });
        },
        loadStats() {
            if (this.stats.length) return;
            this.loading = true;
            getMenu(this.menu)
                .then((res) => {
                    this.stats = res || [];
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        handlerItem(str) {
            const list = str.split(",");
            return list.map((item) => ({
                ...this.list.find((e) => e.id == item),
            }));
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/jx3cxk/index.less";
</style>
