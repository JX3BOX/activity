<template>
    <!-- 中秋诗词专题页 -->
    <div class="p-event midAutumn" :class="'v-' + page_name" v-loading="loading">
        <Header :overlayEnable="true"></Header>
        <!-- <router-view></router-view> -->
        <transition name="fade" mode="out-in" v-if="!loading">
            <router-view class="c-midAutumn" :years="years"></router-view>
        </transition>
    </div>
</template>

<script>
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __imgPath } from "@/utils/config";
import { getBreadcrumb } from '@jx3box/jx3box-common/js/api_misc';
export default {
    name: "App",
    data: function () {
        return {
            years: [],
            loading: false,
        };
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

        this.init();
    },
    methods: {
        init() {
            this.loading = true;
            getBreadcrumb("mid_autumn_map").then(res => {
                this.years = JSON.parse(res)
            }).finally(() => {
                this.loading = false;
            });
        }
    }
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
