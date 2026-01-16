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
            <div class="u-tab" v-for="(item, i) in tabs" :class="{ active: active === i }" :key="i" @click="active = i">
                {{ item }}
            </div>
        </div>
        <component :is="components[active]"></component>
    </div>
</template>
<script>
import Info from "./components/Info.vue";
import Vote from "./components/Vote.vue";
import Stats from "./components/Stats.vue";
export default {
    name: "Index",
    inject: ["__imgRoot"],
    components: { Info, Vote, Stats },
    data: function () {
        return {
            imgRoot: this.__imgRoot,
            active: 1,
            tabs: ["活动介绍", "参赛作品", "获奖展示"],
            components: {
                0: Info,
                1: Vote,
                2: Stats,
            },
        };
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/jx3cxk/index.less";
</style>
