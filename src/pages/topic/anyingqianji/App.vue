<template>
    <div class="p-topic" :class="'v-' + page_name">
        <CommonHeader :overlayEnable="true"></CommonHeader>
        <router-view></router-view>
        <CommonFooter></CommonFooter>
    </div>
</template>

<script>
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __cdn } from "@/utils/config";

export default {
    name: "App",
    provide: {
        __imgRoot: __cdn + "design/topic/anyingqianji/",
    },
    computed: {
        page_name() {
            return this.$route.name;
        },
    },
    created() {
        postStat("topic", "anyingqianji");
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/app.less";
@import "~@/assets/css/topic/common/common.less";
</style>
