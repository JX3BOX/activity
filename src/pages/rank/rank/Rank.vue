<template>
    <!-- <div class="p-rank"> -->
    <router-view></router-view>
    <!-- </div> -->
</template>

<script>
import { isApp, isEmbeddedApp } from "@/utils/env";

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
            if (!link || !link.closest(".m-rank-container") || link.hasAttribute("download")) return;
            // 普通链接和后台 HTML 中的百强站内链接也交给路由，避免整页跳转新增历史。
            const url = new URL(link.href, window.location.href);
            if (isEmbeddedApp() && url.origin === window.location.origin && /^\/rank\/?$/.test(url.pathname)) {
                event.preventDefault();
                const route = url.hash.slice(1) || "/";
                this.$router.push(route.startsWith("/") ? route : "/" + route);
                return;
            }
            if (link.target !== "_blank") return;
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
