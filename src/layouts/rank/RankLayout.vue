<template>
    <div class="m-rank-container" ref="appRef" :class="[id_cls, win_env, 'm-rank-bg-' + id]" :style="Bg">
        <Header></Header>

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
                conceal: showBackToTop,
            }"
            :src="arrow"
            @click="scrollToTop"
        />
        <Footer></Footer>
    </div>
</template>

<script>
import PICS from "@/assets/js/pics.js";
import race_header from "@/components/rank/race_header.vue";
import { getEvent } from "@/service/rank/event.js";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "RankLayout",
    props: [],
    data: function () {
        return {
            data: "",
            back_img_url: __imgPath + "image/rank/common/history.png",
            win_env: window.outerWidth < 780 ? "isMobile" : "isPC",
            achieves: [],
            arrow: `${__imgPath}image/rank/common/timeline_arrow.svg`,
            showBackToTop: false,
        };
    },
    computed: {
        id: function () {
            return this.$route.params.id || 0;
        },
        note: function () {
            return this.$store.state.race.note;
        },
        id_cls: function () {
            return "m-rank-event-" + this.id;
        },
        Bg(){
            return `background-image: url(${PICS.bg(this.id)})`;
        }
    },
    methods: {
        init: function () {
            getEvent(this.id).then((res) => {
                this.data = res.data.data;
                this.$store.state.achieves = res.data.data.boss_map;
                this.$store.state.race = res.data.data;
            });
        },
        handleScroll() {
            let _dom = this.$refs.appRef;
            _dom.onscroll = () => {
                this.showBackToTop = _dom.scrollTop < 300;
            };
        },
        scrollToTop() {
            let _dom = this.$refs.appRef;
            _dom.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
    },
    created() {},
    destroyed() {},
    mounted() {
        this.handleScroll();
    },
    watch: {
        "$route.params.id": {
            immediate: true,
            handler: function (id) {
                if (id) {
                    this.$store.state.id = id;
                    this.init();
                }
            },
        },
    },
    components: {
        "race-header": race_header,
        // "race-bg": race_bg,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/race.less";
</style>
