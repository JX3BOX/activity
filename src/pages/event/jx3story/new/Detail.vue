<template>
    <div class="m-jx3story-main" :class="`m-${key}-main`">
        <div class="m-left">
            <div class="m-change">
                <div class="m-change-item"></div>
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
            <component :is="components[key]" :data="componentData"></component>
        </div>
    </div>
</template>
<script>
import { getMenu } from "@jx3box/jx3box-common/js/api_misc";
import { __cdn } from "@/utils/config";
import Info from "../components/Info.vue";
import Vote from "../components/Vote.vue";
import Stats from "../components/Stats.vue";
export default {
    name: "jx3storyMain",
    inject: ["__imgRoot"],
    data() {
        return {
            list: [],
            year: "2025",
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
        componentData() { 
            const data = this.list.filter((item) => item.year == this.year)[0] || {};
            return { ...data, nullImg: __cdn + "/design/event/jx3story/2025/web/null.png" };
        },
    },
    mounted() {
        this.load();
    },
    methods: {
        load() {
            getMenu("jx3story_data").then((res) => {
                this.list = res;
            });
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/jx3story/new/detail.less";
</style>
