<template>
    <div class="p-midautumn-detail">
        <div class="u-bg" :style="bgStyle">
            <Nav :poemName="poemData?.title || ''" @navChange="back" :years="years"></Nav>
            <div class="u-main-box">
                <transition name="fade" mode="out-in">
                    <Introduce v-if="achieve_id === 'intro'" :years="years"></Introduce>
                    <Poem v-if="achieve_id === 'poem'" :years="years" @poem="poem" @back="back"></Poem>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "./components/nav.vue";
import Introduce from "./components/introduce.vue";
import Poem from "./components/poem.vue";
import color from "@/assets/data/event/color.json";

export default {
    components: { Nav, Introduce, Poem },
    props: {
        years: {
            type: Array,
            default: () => [],
        },
    },
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
        "$route.params": {
            handler: function (val) {
                this.achieve_id = val.tab;
                this.$nextTick(() => {
                    let dom = document.querySelector(".u-bg"); //获取组件
                    dom && (dom.scrollTop = 0);
                });
            },
            immediate: true,
        },
    },
    methods: {
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
