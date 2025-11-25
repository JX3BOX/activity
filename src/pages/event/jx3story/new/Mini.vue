<template>
    <div class="p-jx3story-mini">
        <img :src="`${cdn}2025/mini/index/logo.png`" />
        <div class="m-menu">
            <router-link class="u-menu-item" v-for="item in menu" :key="item.key" :to="item.link">
                {{ item.name }}
            </router-link>
        </div>
    </div>
</template>

<script>
import { __cdn } from "@/utils/config";
export default {
    name: "jx3storyMini",
    inject: ["__imgRoot"],
    data() {
        return {
            cdn: __cdn + "design/event/jx3story/",
            menu: [
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
        };
    },
    computed: {},
};
</script>

<style lang="less">
@import "~@/assets/css/event/jx3story/new/mini.less";
</style>
