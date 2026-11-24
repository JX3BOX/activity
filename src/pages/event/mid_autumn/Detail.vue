<template>
    <div class="p-midautumn-detail" :class="{ 'is-intro': achieve_id === 'intro' }" :style="yearBackground">
        <div class="u-bg" :style="bgStyle">
            <Nav :poemName="poemData?.title || ''" @navChange="back" :years="years"></Nav>
            <div class="u-main-box">
                <transition name="content-fade" mode="out-in">
                    <Introduce v-if="achieve_id === 'intro'" :years="years"></Introduce>
                    <Vote v-else-if="achieve_id === 'vote'" :key="$route.params.year" :years="years" />
                    <Poem v-else-if="achieve_id === 'poem'" :years="years" @poem="poem" @back="back"></Poem>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Vote from "./components/Vote.vue";
import { __cdn } from "@/utils/config";
import Nav from "./components/nav.vue";
import Introduce from "./components/introduce.vue";
import Poem from "./components/poem.vue";
import color from "@/assets/data/event/color.json";

export default {
    components: { Nav, Introduce, Poem, Vote },
    props: {
        years: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        yearBackground() {
            return { backgroundImage: `url(${__cdn}design/event/mid_autumn/${this.$route.params.year}/pc/bg.jpg)` };
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
                    let dom = this.$el.querySelector(".u-main-box"); //获取组件
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
                let dom = this.$el.querySelector(".u-main-box"); //获取组件
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

.content-fade-enter-from,
.content-fade-leave-to {
    opacity: 0;
}

.content-fade-enter-active,
.content-fade-leave-active {
    transition: opacity 0.18s ease;
}
</style>
