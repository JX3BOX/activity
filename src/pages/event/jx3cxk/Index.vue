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
        <div class="m-component" :ref="`container_${active}`">
            <div
                v-for="(item, i) in this[`generatedItems_${active}`]"
                :key="i"
                class="u-note-item"
                :style="{
                    top: item.position + 'px',
                    position: 'absolute',
                }"
            >
                <img
                    class="u-img float-animation reverse"
                    :style="{
                        animationDelay: `${item.animationDelay}s`,
                        '--float-duration': `${floatConfig.duration}s`,
                        '--float-range': `${floatConfig.range}px`,
                    }"
                    :src="`${imgRoot}web/${item.images[0]}`"
                />
                <img
                    class="u-img float-animation"
                    :style="{
                        animationDelay: `${item.animationDelay}s`,
                        '--float-duration': `${floatConfig.duration}s`,
                        '--float-range': `${floatConfig.range}px`,
                    }"
                    :src="`${imgRoot}web/${item.images[1]}`"
                />
            </div>

            <component :is="components[active]" :list="componentList"></component>
        </div>
        <el-backtop :bottom="300" :visibility-height="1200">
            <div class="u-menu" v-for="(item, i) in menus" :key="i" @click.stop="handleMenuClick(item)">
                <img class="u-star" :src="`${imgRoot}web/star-tab.svg`" />
                {{ item.name }}
            </div>
        </el-backtop>
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
            key: "jx3cxk_data",
            imgRoot: this.__imgRoot,

            // tab
            active: "stats",
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

            // 数据
            loading: false,
            firstLoad: true,
            list: [],
            myVote: [],
            stats: [],

            // 音符
            itemSpacing: 1000,
            floatConfig: {
                duration: 3,
                delayStep: 0.2,
                range: 10,
            },
            originalItems: [
                ["note1.svg?1", "note2.svg?1"],
                ["note3.svg?1", "note4.svg?1"],
            ],
            generatedItems_info: [],
            generatedItems_vote: [],
            generatedItems_stats: [],
            resizeObserver: null,
            resizeTimer: null,
            observedContainers: new Set(),

            // link
            menus: [
                { name: "立即投稿", link: `https://www.jx3box.com/publish#/community` },
                { name: "作品集锦", link: "?tab=vote" },
                { name: "获奖展示", link: "?tab=stats" },
            ],
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

            this.$nextTick(() => {
                setTimeout(() => {
                    this.initContainer(`container_${this.active}`, `generatedItems_${this.active}`);
                }, 100);
            });
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
            getMenu(this.key)
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
        initContainer(containerRef, targetList) {
            const containerArr = this.$refs[containerRef];
            const container = Array.isArray(containerArr) ? containerArr[0] : containerArr;

            if (!container) {
                console.warn(`容器 ${containerRef} 未找到，跳过初始化`);
                return;
            }
            this.generateItems(container, targetList);
            if (!this.observedContainers.has(container)) {
                if (!this.resizeObserver) {
                    this.resizeObserver = new ResizeObserver((entries) => {
                        clearTimeout(this.resizeTimer);
                        this.resizeTimer = setTimeout(() => {
                            entries.forEach((entry) => {
                                const activeContainerArr = this.$refs[`container_${this.active}`];
                                const activeContainer = Array.isArray(activeContainerArr)
                                    ? activeContainerArr[0]
                                    : activeContainerArr;
                                if (entry.target === activeContainer && activeContainer) {
                                    this.generateItems(activeContainer, `generatedItems_${this.active}`);
                                }
                            });
                        }, 50);
                    });
                }
                this.resizeObserver.observe(container);
                this.observedContainers.add(container);
            }
        },
        generateItems(container, targetList) {
            if (!container) return;
            const containerHeight = container.clientHeight || container.offsetHeight || 0;
            if (containerHeight === 0) {
                console.warn(`容器高度为0，跳过元素生成`);
                this[targetList] = [];
                return;
            }

            const generated = [];
            const originalLength = this.originalItems.length;
            const singleRoundHeight = originalLength * this.itemSpacing;
            const totalRounds = Math.ceil(containerHeight / singleRoundHeight);
            let globalIndex = 0;

            for (let round = 0; round < totalRounds; round++) {
                this.originalItems.forEach((item, idx) => {
                    const position = round * singleRoundHeight + idx * this.itemSpacing;
                    if (position < containerHeight) {
                        const animationDelay = globalIndex * this.floatConfig.delayStep;
                        generated.push({
                            images: item,
                            position,
                            isCopy: round > 0,
                            copyRound: round,
                            animationDelay,
                        });
                        globalIndex++;
                    }
                });
            }
            this[targetList] = generated;
        },
        handleMenuClick(item) {
            const { link } = item;
            if (link.startsWith("http")) {
                window.open(link, "_blank");
                return;
            }
            this.$router
                .push({
                    query: { tab: link.replace("?tab=", "") },
                })
                .finally(() => {
                    window.scrollTo({ top: 1000, behavior: "smooth" });
                });
        },
    },
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => {
                this.initContainer(`container_${this.active}`, `generatedItems_${this.active}`);
            }, 100);
        });
    },
    beforeDestroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
        clearTimeout(this.resizeTimer);
        this.observedContainers.clear();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/jx3cxk/index.less";
</style>
