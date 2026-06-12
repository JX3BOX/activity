<template>
    <div class="m-index" :style="{ zoom: pageZoom }">
        <div class="m-bashufengyun">
            <section v-for="(item, index) in moduleConfigs" :key="item.id" class="m-bashufengyun__section">
                <component :is="item.component" :moduleData="getModuleData(item, index)" />
            </section>
        </div>
    </div>
</template>
<script>
import oneView from "./modules/oneView.vue";
import twoView from "./modules/twoView.vue";
import threeView from "./modules/threeView.vue";
import fourView from "./modules/fourView.vue";
import fiveView from "./modules/fiveView.vue";
import sixView from "./modules/sixView.vue";
import sevenView from "./modules/sevenView.vue";
import { __cdn } from "@/utils/config";
export default {
    name: "Index",
    data() {
        return {
            moduleConfigs: [
                { id: "one", component: "oneView", height: "100vh" },
                { id: "two", component: "twoView", height: "100vh" },
                { id: "three", component: "threeView", height: "100vh" },
                { id: "four", component: "fourView", height: "100vh" },
                { id: "five", component: "fiveView", height: "100vh" },
                { id: "six", component: "sixView", height: "100vh" },
                { id: "seven", component: "sevenView", height: "100vh" },
            ],
            pageZoom: 1,
        };
    },
    components: { oneView, twoView, threeView, fourView, fiveView, sixView, sevenView },

    computed: {
        img() {
            return __cdn + "design/topic/bashufengyun/re/";
        },
    },
    mounted() {
        this.calcZoom();
        window.addEventListener("resize", this.calcZoom);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.calcZoom);
    },
    methods: {
        calcZoom() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const scaleX = width / 1920;
            const scaleY = height / 1080;
            this.pageZoom = Math.min(scaleX, scaleY);
        },
        getModuleData(item, index) {
            return {
                img: this.img,
                height: item.height,
                index,
            };
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/bashufengyun/index.less";
</style>
