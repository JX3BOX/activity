<template>
    <div class="p-topic" :class="'v-' + $route.name">
        <router-view />
        <CommonFooter v-if="!appMode" />
    </div>
</template>

<script>
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { isEmbeddedApp } from "@/utils/env";
import { __cdn } from "@/utils/config";

export default {
    name: "FengguBadaoApp",
    data: () => ({ appMode: isEmbeddedApp() }),
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

<style lang="less">
html.v-app body {
    min-width: 0;
    margin: 0;
}
</style>
