<template>
    <router-view></router-view>
</template>

<script>
import { __imgPath } from "@/utils/config";
export default {
    name: "Lover",
    provide: {
        __imgRoot: __imgPath + `image/lover/`,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/lover/index.less";
</style>
