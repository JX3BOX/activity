<template>
    <!-- 专题页 -->
    <div class="p-event" :class="'v-' + page_name">
        <Header :overlayEnable="true"></Header>
        <!-- <img :src="imgRoot + '/main/main__bg.png'" class="m-bg" /> -->
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
import { __imgPath } from "@/utils/config";
export default {
    name: "App",
    data: function () {
        return {
            imgRoot: __imgPath + "topic/jx3story/",
        };
    },
    provide: {
        __imgRoot: __imgPath + "topic/jx3story/",
    },
    computed: {
        page_name: function () {
            return this.$route.name;
        },
    },
    created: function () {
        postStat("event", "jx3story");
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/jx3story/common.less";
</style>
