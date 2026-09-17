<template>
    <!-- <div class="p-rank"> -->
    <router-view></router-view>
    <!-- </div> -->
</template>

<script>
export default {
    name: "Rank",
    created() {},
};
</script>

<style lang="less">
@import "~@/assets/css/rank/app.less";
@import "~@/assets/css/rank/race.less";
// 必须最后加载：App 仅覆盖视觉，不维护第二套页面结构。
@import "~@/assets/css/rank/app-mode.less";
</style>
