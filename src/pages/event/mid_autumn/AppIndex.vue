<template>
    <div class="p-event midAutumn" :class="'v-' + page_name">
        <router-view></router-view>
    </div>
</template>

<script>
import { __cdn } from "@/utils/config";
import { postStat } from "@jx3box/jx3box-common/js/stat";
export default {
    name: "AppIndex",
    data: function () {
        return {};
    },
    provide: {
        __imgRoot: __cdn + "design/event/mid_autumn/",
    },
    computed: {
        page_name: function () {
            return this.$route.name;
        },
    },
    created: function () {
        postStat("event", "midAutumn");
    },
    methods: {},
};
</script>
<style lang="less">
@import "~@/assets/css/event/common/animation.less";
@import "~@/assets/css/event/midautumn/font.less";
.c-midAutumn {
    font-family: "LXGWWenKaiMono-Regular", Arial, sans-serif;
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
