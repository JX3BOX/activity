<template>
    <div class="p-midautumn-detail">
        <div class="u-bg" :style="bgStyle">
            <Nav :poemName="poemData?.title || ''" @navChange="back"></Nav>
            <div class="u-main-box">
                <transition name="fade" mode="out-in">
                    <Introduce v-if="achieve_id == 1"></Introduce>
                    <Appreciate v-if="achieve_id == 2" @poem="poem" @back="back"></Appreciate
                ></transition>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "./components_v2/nav.vue";
import Introduce from "./components_v2/introduce.vue";
import Appreciate from "./components_v2/appreciate.vue";
import color from "@/assets/data/event/color.json";

export default {
    components: { Nav, Introduce, Appreciate },
    data() {
        return {
            achieve_id: 1,
            bgStyle: null,
            poemData: null,
            article: [],
            introduce: [],
        };
    },
    watch: {
        "$route.query": {
            handler: function (val) {
                if (val.a) {
                    this.achieve_id = val.a;
                    this.$nextTick(() => {
                        let dom = document.querySelector(".u-bg"); //获取组件
                        dom && (dom.scrollTop = 0);
                    });
                }
            },
            immediate: true,
        },
    },
    created() {
        // this.init();
    },
    mounted() {},
    methods: {
        init() {},
        poem(e) {
            this.poemData = e.item;
            const bgStyle = color.color[e.c]?.color
                ? "background-color:" + color.color[e.c].color + ";opacity: 0.95"
                : "";
            this.bgStyle = bgStyle;
            this.$nextTick(() => {
                let dom = document.querySelector(".u-bg"); //获取组件
                dom && (dom.scrollTop = 0);
            });
        },
        back() {
            this.poemData = null;
            this.bgStyle = null;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/midautumn/v2/index.less";
</style>
