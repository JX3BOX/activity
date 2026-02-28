<template>
    <div
        class="events-page"
        :class="{ isMiniProgram }"
        v-loading="loading"
        :style="{ backgroundImage: `url(${getYearImgUrl('bg.jpg')})` }"
    >
        <!-- 主视觉区域 -->
        <div class="events-page__header">
            <img class="events-page__header-title" :src="getImgUrl('title.png')" alt="剑三年度大事件" />
            <div class="events-page__header-year">
                <img :src="getYearImgUrl('year.png')" :alt="year" />
                <el-dropdown trigger="click" placement="bottom-start" @command="onChange">
                    <span class="u-change" @click.stop="clickChange"></span>
                    <el-dropdown-menu slot="dropdown" v-if="!changeVisible">
                        <el-dropdown-item v-for="(item, index) in list" :key="index" :command="item.year">
                            <span>{{ item.year }}</span>
                            <i class="el-icon-check"></i>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

        <!-- 内容区域 -->
        <div class="events-page__content">
            <!-- 羊皮纸提示 -->
            <div class="events-page__tip" v-html="tip"></div>

            <!-- 卷轴列表 -->
            <div class="events-page__scroll">
                <img :src="getImgUrl('bg__top.png')" class="scroll__top" alt="卷轴上端" />
                <div class="m-table" v-if="eventList.length">
                    <div class="m-table__header">
                        <span class="u-index">序号</span>
                        <span class="u-event">事件</span>
                        <span class="u-vote">我喜欢</span>
                    </div>
                    <div class="m-table__body">
                        <div v-if="loading" class="loading-state">加载中...</div>
                        <template v-else>
                            <a
                                v-for="(item, index) in eventList"
                                :key="index"
                                class="scroll__item"
                                target="_blank"
                                :href="postLink(item.link_user_id)"
                            >
                                <div class="item__rank">{{ index + 1 }}</div>
                                <div class="item__content">
                                    <div class="item__title">
                                        <span class="title">{{ item.title }}</span>
                                        <div class="u-tags" v-if="item.sub_title">
                                            <span class="u-tag" v-for="tag in item.sub_title.split('|')" :key="tag">
                                                {{ tag }}
                                            </span>
                                        </div>
                                    </div>
                                    <p class="item__desc">{{ item.content }}</p>
                                </div>
                                <div class="item__stats">
                                    <div class="u-btn u-btn--voted" v-if="item.disabled" @click.stop.prevent>
                                        已投票
                                    </div>
                                    <div class="u-btn u-btn--vote" @click="(e) => vote(item, e)" v-else>
                                        喜欢！吃瓜！
                                    </div>
                                    <div class="u-count">人气: {{ item.amount }}</div>
                                </div>
                            </a>
                        </template>
                    </div>
                </div>
                <div class="m-table" v-else>
                    <img :src="getImgUrl('null.png')" />
                </div>
                <img :src="getImgUrl('bg__bottom.png')" class="scroll__bottom" alt="卷轴下端" />
            </div>
        </div>

        <!-- 右下角吉祥物 -->
        <div class="events-page__character" :class="{ visible: isInMainContent }">
            <img :src="getImgUrl('pin.png')" alt="吉祥物" />
        </div>

        <!-- 左下角 -->
        <div class="events-page__slogan" :class="{ visible: isInMainContent }">
            <img :src="getYearImgUrl('slogan.png')" class="bigbang-title" alt="剑三年度大事件2024" />
            <el-dropdown trigger="click" placement="bottom-start" @command="onChange">
                <span class="u-change"></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item, index) in list" :key="index" :command="item.year">
                        <span>{{ item.year }}</span>
                        <i class="el-icon-check"></i>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-drawer class="m-bigbang-drawer" :visible.sync="changeVisible" direction="btt" :with-header="false">
            <div class="m-drawer">
                <div class="u-item">切换年份</div>
                <span
                    v-for="(item, i) in list"
                    :key="i"
                    class="u-item"
                    :class="{ active: item.year === year }"
                    @click="onChange(item.year)"
                >
                    {{ item.year }}
                </span>
                <div class="u-item" @click="changeVisible = false">取消</div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { getMenu } from "@jx3box/jx3box-common/js/api_misc";
import { debounce } from "lodash";
import { getVoteInfo, submitVote } from "@/service/event/bigbang";
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";
import { isMiniProgram, isApp } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "EventsPage",
    inject: ["__imgRoot"],
    data() {
        return {
            list: [],
            showChange: false,
            eventList: [], // 待投票的事件列表
            loading: false,

            userStatus: [], // 用户的投票状态
            voting: false,

            isInMainContent: false,
            tip: "踏入江湖，揭秘剑网3十大热门八卦！从深情告白到阵营风云，从副本黑幕到生活琐事，每一条都让你眼界大开。轻松一刻，尽在剑三八卦圈，大侠们，准备好瓜子，一起享受这场游戏界的八卦盛宴吧！",

            changeVisible: false,
            isMiniProgram: isMiniProgram() || isApp(),
        };
    },
    computed: {
        year() {
            return this.$route.query.year || "2025";
        },
        event_id() {
            return this.list.filter((item) => item.year === this.year)[0]?.event_id || "";
        },
    },
    watch: {
        event_id: {
            handler() {
                this.loadData();
            },
            immediate: true,
        },
    },
    methods: {
        getImgUrl(name) {
            return `${this.__imgRoot}common/${name}`;
        },
        getYearImgUrl(name) {
            return `${this.__imgRoot}${this.year}/${name}`;
        },
        postLink(id) {
            return __Root + "knowledge/view/" + id;
        },
        showDecoration() {
            return debounce(() => {
                const scrollDistance = window.scrollY; // 获取垂直滚动距离
                const HEADER_HEIGHT = 800;

                if (scrollDistance > HEADER_HEIGHT) {
                    this.isInMainContent = true;
                } else {
                    this.isInMainContent = false;
                }
            }, 100);
        },
        onChange(year) {
            this.$router.push({ query: { year } });
            this.showChange = false;
            this.changeVisible = false;
        },
        loaMenu() {
            getMenu("bigbang_data").then((res) => {
                this.list = res.map((item) => ({ year: item.year, event_id: item.event_id }));
            });
        },
        loadData() {
            this.loading = true;
            if (this.event_id) {
                getVoteInfo(this.event_id)
                    .then((res) => {
                        this.eventList = res.data.data?.vote_items || []; // 待投票的事件列表
                        this.userStatus = res.data.data?.latest_vote_history_record?.vote_item_id_list || []; // 用户的投票状态
                        // 更新列表项的禁用状态
                        this.eventList.forEach((item) => {
                            item.disabled = this.userStatus.includes(item.id);
                        });
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            } else {
                this.eventList = [];
                this.userStatus = [];
                this.loading = false;
            }
        },
        vote(item, e) {
            // 阻止事件冒泡和默认行为
            e.stopPropagation();
            e.preventDefault();
            submitVote(this.event_id, {
                vote_id_list: [item.id],
            }).then(() => {
                this.$message.success("投票成功！");
                item.amount += 1;
                item.disabled = true;
            });
        },
        clickChange() {
            if (this.isMiniProgram) {
                this.changeVisible = true;
            }
        },
    },
    mounted() {
        this.loaMenu();
        window.addEventListener("scroll", this.showDecoration());
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/bigbang/index.less";
</style>
