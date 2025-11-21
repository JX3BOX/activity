<template>
    <!-- 专题页 -->
    <div class="p-event" :class="'v-' + page_name">
        <Header :overlayEnable="true"></Header>
        <!-- <img :src="imgRoot + '/main/main__bg.png'" class="m-bg" /> -->
        <router-view></router-view>
        <!-- <div class="p-event-footer">
            <div class="wp">
                <Footer></Footer>
            </div>
        </div> -->
    </div>
</template>

<script>
import { isMiniProgram } from "@jx3box/jx3box-common/js/utils";
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __imgPath } from "@/utils/config";
export default {
    name: "App",
    data: function () {
        return {
            isMiniProgram: isMiniProgram(),
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

        // 小程序下设置viewport
        if (isMiniProgram()) {
            let meta = document.createElement("meta");
            meta.setAttribute("name", "viewport");
            meta.setAttribute("content", "width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
            document.getElementsByTagName("head")[0].appendChild(meta);
        }
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/jx3story/common.less";
</style>
