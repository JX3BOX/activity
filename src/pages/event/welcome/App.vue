<template>
    <!-- 专题页 -->
    <div class="p-event" :class="'v-' + page_name">
        <CommonHeader :overlayEnable="true"></CommonHeader>
        <router-view></router-view>
        <CommonFooter></CommonFooter>
    </div>
</template>

<script>
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __imgPath } from "@/utils/config";
export default {
    name: "App",
    data: function () {
        return {};
    },
    provide: {
        __imgRoot: __imgPath + "topic/welcome/",
    },
    computed: {
        page_name: function () {
            return this.$route.name;
        },
    },
    created: function () {
        postStat("event", "welcome");
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/welcome/common.less";
</style>
