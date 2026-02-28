<template>
    <!-- 专题页 -->
    <div class="p-event" :class="'v-' + page_name">
        <Header :overlayEnable="true"></Header>
        <router-view></router-view>
        <!-- <div class="p-event-footer">
            <div class="wp">
                <Footer></Footer>
            </div>
        </div> -->
    </div>
</template>

<script>
// import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __imgPath } from "@/utils/config";
import { isMiniProgram, isApp } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    data: function () {
        return {};
    },
    provide: {
        __imgRoot: __imgPath + "topic/exam/",
    },
    computed: {
        page_name: function () {
            return this.$route.name;
        },
    },
    created: function () {
        // postStat("event", "gaokao");
        // 小程序下设置viewport
        if (isMiniProgram() || isApp()) {
            let meta = document.createElement("meta");
            meta.setAttribute("name", "viewport");
            meta.setAttribute("content", "width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
            document.getElementsByTagName("head")[0].appendChild(meta);
        }
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/welcome/common.less";
</style>
