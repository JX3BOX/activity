<template>
    <div class="p-event" :class="'v-' + $route.name">
        <CommonHeader v-if="!appMode" :overlayEnable="true"></CommonHeader>
        <router-view></router-view>
        <Footer v-if="!appMode" darkMode></Footer>
    </div>
</template>

<script>
import { isApp, syncAppEnv, applyAppEnv } from "@/utils/env";
import { ref, watch, provide } from "vue";
import { useRoute } from "vue-router";
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __imgPath } from "@/utils/config";
export default {
    name: "App",
    setup() {
        const route = useRoute();
        const appMode = ref(isApp());
        watch(() => route.fullPath, () => {
            syncAppEnv();
            appMode.value = route.query.__env === undefined ? isApp() : route.query.__env === "app";
            applyAppEnv();
            document.documentElement.classList.toggle("v-app", appMode.value);
        }, { immediate: true });
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
