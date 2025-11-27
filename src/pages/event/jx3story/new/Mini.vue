<template>
    <div class="p-jx3story-mini">
        <img :src="`${cdn}2025/mini/index-logo.png`" />
        <div class="m-menu">
            <router-link class="u-menu-item" v-for="item in menu" :key="item.key" :to="item.link">
                {{ item.name }}
            </router-link>
            <div class="u-menu-item">
                <span @click.stop="show = !show">{{ year }}</span>
                <ul :class="{ active: show }">
                    <li v-for="item in years" :key="item" @click="onChange(item)" :class="{ active: year == item }">
                        {{ item }}
                    </li>
                </ul>
            </div>
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
            year: "2025",
            years: ["2025", "2024"],
            show: false,
        };
    },
    computed: {
        menu() {
            const year = this.year;
            return [
                {
                    name: "活动介绍",
                    key: "info",
                    link: { path: "/detail", query: { key: "info", year } },
                },
                {
                    name: "投票赏析",
                    key: "vote",
                    link: { path: "/detail", query: { key: "vote", year } },
                },
                {
                    name: "票数统计",
                    key: "stats",
                    link: { path: "/detail", query: { key: "stats", year } },
                },
            ];
        },
    },
    mounted() {
        const savedYear = sessionStorage.getItem("YEAR_KEY");
        if (savedYear && this.years.includes(savedYear)) {
            this.year = savedYear;
        }
    },
    methods: {
        onChange(year) {
            this.year = year;
            this.show = false;
            sessionStorage.setItem("YEAR_KEY", year);
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/jx3story/new/mini.less";
</style>
