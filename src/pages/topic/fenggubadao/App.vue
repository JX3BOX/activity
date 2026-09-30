<template>
    <div class="p-topic" :class="'v-' + $route.name">
        <router-view />
        <CommonFooter />
    </div>
</template>

<script>
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __cdn } from "@/utils/config";

export default {
    name: "FengguBadaoApp",
    provide: { __imgRoot: __cdn + "design/topic/fenggubadao/" },
    created() {
        postStat("topic", "fenggubadao");
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/app.less";
@import "~@/assets/css/topic/common/common.less";
</style>
