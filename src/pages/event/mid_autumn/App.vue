<template>
    <!-- 中秋诗词专题页 -->
    <div class="p-event midAutumn" :class="'v-' + page_name">
        <Header :overlayEnable="true"></Header>
        <!-- <router-view></router-view> -->
        <transition name="fade" mode="out-in">
            <router-view class="c-midAutumn"></router-view>
        </transition>
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
        __imgRoot: __imgPath + "topic/midAutumn/",
    },
    computed: {
        page_name: function () {
            return this.$route.name;
        },
    },
    created: function () {
        postStat("event", "midAutumn");
    },
};
</script>
<style lang="less">
@import "~@/assets/css/event/common/animation.less";
@import "~@/assets/css/event/midautumn/font.less";
.c-midAutumn {
    font-family: FZLTSJW;
    background-color: rgba(23, 36, 58, 0.95);
    transition: all 1s ease;
    min-width: 1366px;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}
@media screen and (max-width: @ipad) {
    .c-midAutumn {
        min-width: 500px;
    }
}
</style>
