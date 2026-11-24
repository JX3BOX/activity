<script setup>
import { isApp } from "@/utils/env";
import { computed, inject, ref } from "vue";
import { useRoute } from "vue-router";
import { assetRoot, useTopic, useVotePhase, voteYear } from "./topic";
import DocumentContent from "./components/DocumentContent.vue";
import Rewards from "./components/Rewards.vue";
import Winners from "./components/Winners.vue";
import EditionSelect from "./components/EditionSelect.vue";
import PlayerVote from "./components/PlayerVote.vue";

const route = useRoute();
const { modules, loading, error } = useTopic(route);
const appMode = inject("jx3datAppMode", ref(isApp()));
const tabs = [
    { key: "process", label: "活动流程", component: DocumentContent, module: "document" },
    { key: "rewards", label: "活动奖励", component: Rewards, module: "prize" },
    { key: "vote", label: "玩家投票", component: PlayerVote, year: voteYear },
    { key: "winners", label: "获奖名单", component: Winners, module: "rank" },
    { key: "safety", label: "安全与风险控制", component: DocumentContent, module: "document" },
];
const editionTabs = computed(() => tabs.filter((tab) => !tab.year || tab.year === route.params.year));
const useTimedTabs = computed(() => appMode.value && route.params.year === voteYear);
const votePhase = useVotePhase(useTimedTabs);
const availableTabs = computed(() => {
    if (!useTimedTabs.value) return editionTabs.value;
    return editionTabs.value.filter((tab) => {
        if (tab.key === "vote") return votePhase.value === "active";
        if (tab.key === "winners") return votePhase.value === "ended";
        return true;
    });
});
const visibleTabs = computed(() => availableTabs.value.filter((tab) => !appMode.value || tab.key !== "safety"));
const current = computed(() => {
    const requested = availableTabs.value.find((tab) => tab.key === route.query.tab);
    if (requested) return requested;
    if (useTimedTabs.value && ["vote", "winners"].includes(route.query.tab)) {
        return availableTabs.value.find((tab) => ["vote", "winners"].includes(tab.key)) || tabs[0];
    }
    return tabs[0];
});
const isVoteTab = computed(() => current.value.key === "vote");
const currentItems = computed(() => {
    const tab = current.value;
    if (!tab.module) return [];
    const items = modules.value[tab.module];
    return tab.module === "document" ? items.filter((item) => item.link === tab.key) : items;
});
</script>

<template>
    <div class="p-jx3dat-new" :class="{ 'is-app': appMode, 'is-vote-tab': isVoteTab }">
        <div class="dat-decor" aria-hidden="true">
            <div class="dat-decor-stream dat-decor-left"></div>
            <div class="dat-decor-stream dat-decor-right"></div>
        </div>
        <header class="dat-hero">
            <router-link v-if="appMode" class="dat-safety-link" :to="{ path: route.path, query: { ...route.query, tab: 'safety' } }" aria-label="安全与风险控制" :aria-current="current.key === 'safety' ? 'page' : undefined"><img :src="assetRoot + 'spec.svg'" alt="" /></router-link>
            <img class="dat-logo" :src="assetRoot + 'logo.png'" alt="剑网3魔盒 · 剑网3" />
            <h1><img class="dat-title" :src="assetRoot + 'title.png'" alt="剑网3数据大师赛" /></h1>
            <div class="dat-year">
                <span class="dat-star" aria-hidden="true"><img class="dat-star-core" :src="assetRoot + 'star-q-a.svg'" alt="" /><img class="dat-star-ring" :src="assetRoot + 'star-q-b.svg'" alt="" /></span>
                <EditionSelect />
                <span class="dat-star" aria-hidden="true"><img class="dat-star-core" :src="assetRoot + 'star-q-a.svg'" alt="" /><img class="dat-star-ring" :src="assetRoot + 'star-q-b.svg'" alt="" /></span>
            </div>
            <nav class="dat-tabs" :class="{ 'has-vote': editionTabs.length === 5 }" aria-label="活动导航">
                <router-link
                    v-for="tab in visibleTabs"
                    :key="tab.key"
                    :to="{ path: route.path, query: { ...route.query, tab: tab.key } }"
                    :class="{ 'is-active': current.key === tab.key }"
                    :aria-current="current.key === tab.key ? 'page' : undefined"
                >
                    {{ tab.label }}
                </router-link>
            </nav>
        </header>
        <main class="dat-content" :aria-busy="!isVoteTab && loading">
            <PlayerVote v-if="isVoteTab" />
            <p v-else-if="loading">活动数据加载中…</p>
            <p v-else-if="error" role="alert">{{ error }}</p>
            <component v-else :is="current.component" :items="currentItems" />
        </main>
        <footer class="dat-footer"><img :src="assetRoot + 'logo.png'" alt="剑网3魔盒 · 剑网3" /></footer>
    </div>
</template>

<style lang="less">
@import "~@/assets/css/event/jx3dat/new.less";
</style>
