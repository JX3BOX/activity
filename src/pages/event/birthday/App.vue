<template>
    <!-- 周年专题页 -->
    <div class="p-event birthday" :class="'v-' + page_name">
        <Header :overlayEnable="true"></Header>
        <transition name="fade" mode="out-in">
            <router-view class="c-birthday"></router-view>
        </transition>
    </div>
</template>

<script>
import { __cdn, __Links, __imgPath } from "@/utils/config";

export default {
    name: "App",
    data: function () {
        return {};
    },
    provide: {
        __imgRoot: __cdn + "design/event/birthday/",
        __Links,
        __imgPath,
    },
    computed: {
        page_name: function () {
            return this.$route.name;
        },
    },
    created: function () {
        // postStat("event", "celebration");
    },
};
</script>
<style lang="less">
@import "~@/assets/css/event/common/animation.less";

.birthday {
    padding-top: @header-height;
    position: relative;
    .scrollbar();
    box-sizing: border-box;
    height: calc(100vh);
    overflow-y: auto;
}

.c-birthday {
    transition: all 1s ease;
}

// @media screen and (max-width: @ipad) {
//     .c-birthday {
//         min-width: 500px;
//     }
// }
</style>
