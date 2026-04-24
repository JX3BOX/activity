<template>
    <div class="m-rank-container" ref="appRef" :class="[id_cls, win_env, 'm-rank-bg-' + id]" :style="Bg">
        <CommonHeader></CommonHeader>
        <!-- <race-bg :class="'m-rank-bg-' + id"></race-bg> -->
        <div class="m-rank-primary">
            <div class="m-rank-race" v-if="id">
                <div class="m-rank-header">
                    <race-header :data="data"></race-header>
                </div>
                <div class="m-rank-content">
                    <router-view></router-view>
                </div>
                <div class="m-rank-union" v-if="note">
                    <h5 class="u-title">媒体宣传</h5>
                    <div v-html="note"></div>
                </div>
            </div>
        </div>
        <div class="m-rank-misc" v-if="id">
            <!-- 往届赛事 -->
            <a href="/rank" class="u-history"><img :src="back_img_url" /></a>

            <!-- 网页二维码 -->
            <QRcode class="u-mobile-qrcode" v="static" :s="100" />
        </div>
        <img
            class="u-back-top"
            :class="{
                conceal: !showBackToTop,
            }"
            :src="arrow"
            @click="scrollToTop"
        />
        <CommonFooter></CommonFooter>
    </div>
</template>

<script>
import PICS from "@/assets/js/pics.js";
import race_header from "@/components/rank/race_header.vue";
import { getEvent, getIdFromSlug } from "@/service/rank/event.js";
import QRcode from "@jx3box/jx3box-ui/src/interact/QRcode.vue";
import jx3box from "@jx3box/jx3box-common/data/jx3box.json";
const { __cdn } = jx3box;
import { isNumber } from "lodash";
export default {
    name: "RankLayout",
    props: [],
    data: function () {
        return {
            data: "",
            back_img_url: __cdn + "design/rank/common/history.png",
            win_env: window.outerWidth < 780 ? "isMobile" : "isPC",
            achieves: [],
            arrow: `${__cdn}design/rank/common/timeline_arrow.svg`,
            showBackToTop: false,
            id: "",
            scrollTarget: null,
        };
    },
    computed: {
        note: function () {
            return this.$store.state.race.note;
        },
        id_cls: function () {
            return "m-rank-event-" + this.id;
        },
        Bg() {
            return `background-image: url(${PICS.bg(this.id)})`;
        },
    },
    methods: {
        init: function () {
            getEvent(this.id).then((res) => {
                this.data = res.data.data;
                this.$store.state.achieves = res.data.data.boss_map;
                this.$store.state.race = res.data.data;
            });
        },
        getScrollElement() {
            const dom = this.$refs.appRef;
            if (dom && dom.scrollHeight > dom.clientHeight) {
                return dom;
            }
            return window;
        },
        getScrollTop() {
            if (this.scrollTarget && this.scrollTarget !== window) {
                return this.scrollTarget.scrollTop;
            }
            return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        },
        updateBackToTop() {
            this.showBackToTop = this.getScrollTop() >= 300;
        },
        handleScroll() {
            this.removeScrollListener();
            this.scrollTarget = this.getScrollElement();
            this.scrollTarget.addEventListener("scroll", this.updateBackToTop, { passive: true });
            this.updateBackToTop();
        },
        removeScrollListener() {
            if (!this.scrollTarget) return;
            this.scrollTarget.removeEventListener("scroll", this.updateBackToTop);
            this.scrollTarget = null;
        },
        scrollToTop() {
            const target = this.getScrollElement();
            if (target === window) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
                return;
            }
            target.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.handleScroll();
        });
    },
    beforeUnmount() {
        this.removeScrollListener();
    },
    watch: {
        $route: {
            deep: true,
            immediate: true,
            async handler(val) {
                const id = Number(val.params.id);
                if (!isNaN(id) && isNumber(id)) {
                    this.id = id;
                    this.$store.state.id = this.id || 0;
                    this.init();
                } else {
                    const res = await getIdFromSlug(val.params.id);
                    this.id = res.data.data.id;
                    this.$store.state.id = this.id || 0;
                    this.init();
                }
                this.$nextTick(() => {
                    this.handleScroll();
                });
            },
        },
    },
    components: {
        "race-header": race_header,
        QRcode,
        // "race-bg": race_bg,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/race.less";
</style>
