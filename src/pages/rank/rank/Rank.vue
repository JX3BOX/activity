<template>
    <!-- <div class="p-rank"> -->
    <router-view></router-view>
    <!-- </div> -->
</template>

<script>
import { isApp } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Rank",
    created() {
        isApp() && localStorage.setItem("__env", "app");
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/race.less";
</style>
