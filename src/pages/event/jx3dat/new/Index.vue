<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { assetRoot } from "./config";
import Process from "./Process.vue";
import Rewards from "./Rewards.vue";
import Winners from "./Winners.vue";
import Safety from "./Safety.vue";
const route = useRoute();
const tabs = [
    { key: "process", label: "活动流程", component: Process },
    { key: "rewards", label: "活动奖励", component: Rewards },
    { key: "winners", label: "获奖名单", component: Winners },
    { key: "safety", label: "安全与风险控制", component: Safety },
];
const current = computed(() => tabs.find((tab) => tab.key === route.query.tab) || tabs[0]);
</script>

<template>
    <div class="p-jx3dat-new">
        <div class="dat-decor" aria-hidden="true">
            <div class="dat-decor-stream dat-decor-left"></div>
            <div class="dat-decor-stream dat-decor-right"></div>
        </div>
        <header class="dat-hero">
            <img class="dat-logo" :src="assetRoot + 'logo.png'" alt="剑网3魔盒 · 剑网3" />
            <h1><img class="dat-title" :src="assetRoot + 'title.png'" alt="剑网3数据大师赛" /></h1>
            <div class="dat-year">
                <span class="dat-star" aria-hidden="true"><img class="dat-star-core" :src="assetRoot + 'star-q-a.svg'" alt="" /><img class="dat-star-ring" :src="assetRoot + 'star-q-b.svg'" alt="" /></span>
                <span>2026 · 龙马精神</span>
                <span class="dat-star" aria-hidden="true"><img class="dat-star-core" :src="assetRoot + 'star-q-a.svg'" alt="" /><img class="dat-star-ring" :src="assetRoot + 'star-q-b.svg'" alt="" /></span>
            </div>
            <nav class="dat-tabs" aria-label="活动导航">
                <router-link
                    v-for="tab in tabs"
                    :key="tab.key"
                    :to="{ name: 'index', query: { ...route.query, tab: tab.key } }"
                    :class="{ 'is-active': current.key === tab.key }"
                    :aria-current="current.key === tab.key ? 'page' : undefined"
                >
                    {{ tab.label }}
                </router-link>
            </nav>
        </header>
        <main class="dat-content"><component :is="current.component" /></main>
        <footer class="dat-footer"><img :src="assetRoot + 'logo.png'" alt="剑网3魔盒 · 剑网3" /></footer>
    </div>
</template>

<style lang="less">
@import "~@/assets/css/event/jx3dat/new.less";
</style>
