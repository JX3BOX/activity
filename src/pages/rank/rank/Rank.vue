<template>
    <!-- <div class="p-rank"> -->
    <router-view></router-view>
    <!-- </div> -->
</template>

<script>
import { isApp } from "@/utils/env";

export default {
    name: "Rank",
    mounted() {
        document.addEventListener("click", this.openAppContentLink);
    },
    beforeUnmount() {
        document.removeEventListener("click", this.openAppContentLink);
    },
    methods: {
        // 活动介绍、奖励和时间线中的后台 HTML 也可能带 target="_blank"。
        openAppContentLink(event) {
            if (!isApp() || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            const link = event.target.closest?.("a[href]");
            if (!link || !link.closest(".m-rank-container") || link.target !== "_blank" || link.hasAttribute("download")) return;
            event.preventDefault();
            window.location.assign(link.href);
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/app.less";
@import "~@/assets/css/rank/race.less";
// 必须最后加载：App 仅覆盖视觉，不维护第二套页面结构。
@import "~@/assets/css/rank/app-mode.less";
</style>
