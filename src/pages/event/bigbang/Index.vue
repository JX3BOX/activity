<template>
    <div class="events-page">
        <!-- 主视觉区域 -->
        <div class="events-page__header">
            <img class="events-page__header-title" :src="getImgUrl('title.png')" alt="剑三年度大事件" />
            <img class="events-page__header-year" :src="getImgUrl('year.png')" alt="2024" />
        </div>

        <!-- 内容区域 -->
        <div class="events-page__content">
            <!-- 羊皮纸提示 -->
            <div class="events-page__tip">
                踏入江湖，揭秘剑网3十大热门八卦！从深情告白到阵营风云，从副本黑幕到生活琐事，每一条都让你眼界大开。轻松一刻，尽在剑三八卦圈，大侠们，准备好瓜子，一起享受这场游戏界的八卦盛宴吧！
            </div>

            <!-- 卷轴列表 -->
            <div class="events-page__scroll">
                <img :src="getImgUrl('bg__top.png')" class="scroll__top" alt="卷轴上端" />
                <div class="m-table">
                    <div class="m-table__header">
                        <span class="u-index">名次</span>
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
                                        <template v-if="item.sub_title">
                                            <span class="u-tag" v-for="tag in item.sub_title.split('|')" :key="tag">
                                                {{ tag }}
                                            </span>
                                        </template>
                                    </div>
                                    <p class="item__desc">{{ item.content }}</p>
                                </div>
                                <div class="item__stats">
                                    <div class="u-btn u-btn--voted" v-if="item.disabled" @click.stop.prevent>已投票</div>
                                    <div class="u-btn u-btn--vote" @click="(e) => vote(item, e)" v-else>喜欢！吃瓜！</div>
                                    <div class="u-count">人气: {{ item.amount }}</div>
                                </div>
                            </a>
                        </template>
                    </div>
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
            <img :src="getImgUrl('slogan.png')" class="bigbang-title" alt="剑三年度大事件2024" />
        </div>
    </div>
</template>

<script>
import { debounce } from "lodash";
import { getVoteInfo, submitVote } from "@/service/event/bigbang";
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "EventsPage",
    inject: ["__imgRoot"],
    data() {
        return {
            event_id: 22,
            eventList: [], // 待投票的事件列表
            loading: false,

            userStatus: [], // 用户的投票状态
            voting: false,

            isInMainContent: false,
        };
    },
    methods: {
        getImgUrl(name) {
            return this.__imgRoot + name;
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
        loadData() {
            this.loading = true;
            return getVoteInfo(this.event_id)
                .then((res) => {
                    this.eventList = res.data.data?.vote_items || []; // 待投票的事件列表
                    console.log(this.eventList);
                    this.userStatus = res.data.data?.latest_vote_history_record?.vote_item_id_list || []; // 用户的投票状态
                    // 更新列表项的禁用状态
                    this.eventList.forEach((item) => {
                        item.disabled = this.userStatus.includes(item.id);
                    });
                })
                .finally(() => {
                    this.loading = false;
                });
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
    },
    mounted() {
        this.loadData();
        window.addEventListener("scroll", this.showDecoration());
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/bigbang/index.less";
</style>
