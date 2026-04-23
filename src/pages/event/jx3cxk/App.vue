<template>
    <!-- 专题页 -->
    <div class="p-event" :class="'v-' + page_name">
        <CommonHeader :overlayEnable="true"></CommonHeader>
        <router-view></router-view>
        <CommonFooter></CommonFooter>
    </div>
</template>

<script>
import { isMiniProgram, isApp } from "@jx3box/jx3box-common/js/utils";
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __cdn } from "@/utils/config";
export default {
    name: "App",
    data: function () {
        return {};
    },
    provide: {
        __imgRoot: __cdn + "design/event/jx3cxk/",
    },
    computed: {
        page_name: function () {
            return this.$route.name;
        },
        isPhone() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
    },
    created: function () {
        postStat("event", "jx3cxk");
        if (isMiniProgram() || isApp() || this.isPhone) {
            let meta = document.createElement("meta");
            meta.setAttribute("name", "viewport");
            meta.setAttribute("content", "width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
            document.getElementsByTagName("head")[0].appendChild(meta);
        }
        isApp() && localStorage.setItem("__env", "app");
    },
};
</script>
