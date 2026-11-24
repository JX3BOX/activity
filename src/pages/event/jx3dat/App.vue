<template>
    <div class="p-event" :class="'v-' + $route.name">
        <CommonHeader v-if="!appMode" :overlayEnable="true"></CommonHeader>
        <router-view></router-view>
        <Footer v-if="!appMode" darkMode></Footer>
    </div>
</template>

<script>
import { isApp, isEmbeddedApp, syncAppEnv, applyAppEnv, responsiveAppMode } from "@/utils/env";
import { ref, watch, provide } from "vue";
import { useRoute } from "vue-router";
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __imgPath } from "@/utils/config";
export default {
    name: "App",
    setup() {
        const route = useRoute();
        const appMode = ref(isApp());
        // 同步 App 环境：
        // - env=app 始终生效（显式应用内请求，全局）。
        // - 小屏响应式适配仅作用于 2026+ 新布局（IndexNew.vue）；
        //   2023 旧版布局与 2026 完全不同，保持原样（站点页头/页脚 + 自有 @media 适配）。
        const syncAppMode = () => {
            syncAppEnv();
            if (route.query.__env !== undefined) {
                appMode.value = route.query.__env === "app";
            } else {
                const isLegacy = route.name === "index-2023";
                const envApp = isEmbeddedApp();
                const responsive = responsiveAppMode.value && !isLegacy;
                appMode.value = envApp || responsive;
            }
            applyAppEnv();
            document.documentElement.classList.toggle("v-app", appMode.value);
        };
        watch(() => route.fullPath, syncAppMode, { immediate: true });
        // 响应式断点（小屏）变化时同步，使 .is-app 适配样式随之生效。
        watch(responsiveAppMode, syncAppMode);
        provide("jx3datAppMode", appMode);
        return { appMode };
    },
    provide: {
        __imgRoot: __imgPath + "topic/jx3dat/",
    },
    created: function () {
        postStat("event", "jx3dat");
    },
};
</script>
