<template>
    <!-- 专题页 -->
    <div class="p-topic" :class="'v-' + page_name">
        <CommonHeader :overlayEnable="true"></CommonHeader>
        <div id="box">
            <router-view></router-view>
        </div>
        <CommonFooter></CommonFooter>
    </div>
</template>

<script>
import { postStat } from "@jx3box/jx3box-common/js/stat";
export default {
    name: "App",
    computed: {
        page_name: function () {
            return this.$route.name;
        },
    },
    created: function () {
        postStat("topic", "bashufengyun");
    },
};
</script>
<style lang="less">
@import "~@/assets/css/topic/app.less";
@import "~@/assets/css/topic/common/animation.less";
</style>
