<template>
    <!-- 专题页 -->
    <div class="p-event" :class="'v-' + page_name">
        <Header :overlayEnable="true"></Header>
        <router-view></router-view>
        <div class="p-event-footer">
            <div class="wp">
                <Footer></Footer>
            </div>
        </div>
    </div>
</template>

<script>
    import { postStat } from "@jx3box/jx3box-common/js/stat";
    import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
    export default {
        name: "App",
        data: function () {
            return {};
        },
        provide: {
            __imgRoot: __imgPath + "topic/bigbang/",
        },
        computed: {
            page_name: function () {
                return this.$route.name;
            },
        },
        created: function () {
            postStat("event", "bigbang");
        },
    };
</script>

<style lang="less">
    @import "~@/assets/css/event/welcome/common.less";
</style>
