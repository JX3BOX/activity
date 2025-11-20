<template>
    <div class="m-jx3story-main">
        <div class="m-left">
            <div class="m-change">
                <div class="m-change-item">
                    <img :src="__imgRoot + 'main/main__bg.png'" class="m-bg" />
                </div>
            </div>
            <div class="m-tabs">
                <router-link
                    class="u-router"
                    :class="key == item.key ? 'active' : ''"
                    :to="item.link"
                    v-for="item in tabs"
                    :key="item.name"
                >
                    <span class="u-txt">{{ item.name }}</span>
                </router-link>
            </div>
        </div>
        <div class="m-main">
            <component :is="components[key]"></component>
        </div>
    </div>
</template>
<script>
import { __cdn } from "@/utils/config";
import Info from "../components/Info.vue";
import Vote from "../components/Vote.vue";
import Stats from "../components/Stats.vue";
export default {
    name: "jx3storyMain",
    inject: ["__imgRoot"],
    data() {
        return {
            tabs: [
                {
                    name: "返回首页",
                    link: { path: "/" },
                },
                {
                    name: "活动介绍",
                    key: "info",
                    link: { path: "/detail", query: { key: "info" } },
                },
                {
                    name: "投票赏析",
                    key: "vote",
                    link: { path: "/detail", query: { key: "vote" } },
                },
                {
                    name: "票数统计",
                    key: "stats",
                    link: { path: "/detail", query: { key: "stats" } },
                },
            ],
            components: {
                info: Info,
                vote: Vote,
                stats: Stats,
            },
        };
    },
    computed: {
        key() {
            return this.$route.query.key || "vote";
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/jx3story/new/detail.less";
</style>
