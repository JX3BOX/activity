<template>
    <router-view></router-view>
</template>

<script>
import { __imgPath } from "@/utils/config";
import { isApp } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Lover",
    provide: {
        __imgRoot: __imgPath + `image/lover/`,
    },
    created() {
        isApp() && localStorage.setItem("__env", "app");
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/lover/index.less";
</style>
