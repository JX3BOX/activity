<template>
    <!-- 中秋诗词专题页 -->
    <div class="p-event midAutumn" :class="'v-' + page_name" v-loading="yearsLoading">
        <CommonHeader :overlayEnable="true"></CommonHeader>
        <!-- <router-view></router-view> -->
        <router-view v-if="!yearsLoading" v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" class="c-midAutumn" :years="years" />
            </transition>
        </router-view>
    </div>
</template>

<script>
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __imgPath } from "@/utils/config";
import yearsMixin from "./mixins/years";
export default {
    name: "App",
    mixins: [yearsMixin],
    yearsDescending: false,
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
    width: 100%;
    min-width: 0;
    font-family: "LXGWWenKaiMono-Regular", Arial, sans-serif;
    background-color: rgba(23, 36, 58, 0.95);
    transition: all 1s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}
</style>
