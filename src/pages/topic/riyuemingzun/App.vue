<template>
    <!-- 专题页 -->
    <div class="p-topic" :class="'v-' + page_name">
        <CommonHeader :overlayEnable="true"></CommonHeader>
        <router-view></router-view>
        <CommonFooter darkMode></CommonFooter>
    </div>
</template>

<script>
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __cdn } from "@/utils/config";
export default {
    name: "App",
    props: [],
    components: {},
    data: function () {
        return {};
    },
    computed: {
        page_name: function () {
            return this.$route.name;
        },
    },
    watch: {},
    methods: {},

    created: function () {
        postStat("topic", "riyuemingzun");
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/topic/app.less";
@import "~@/assets/css/topic/common/common.less";
</style>
