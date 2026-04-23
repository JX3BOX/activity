<template>
    <div class="m-index">
        <div class="m-bashufengyun">
            <section
                v-for="(item, index) in moduleConfigs"
                :key="item.id"
                class="m-bashufengyun__section"
            >
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
import { __cdn } from "@/utils/config";
export default {
    name: "Index",
    data() {
        return {
            moduleConfigs: [
                { id: "one", component: "oneView", height: "1066px" },
                { id: "two", component: "twoView", height: "800px" },
                { id: "three", component: "threeView", height: "800px" },
                { id: "four", component: "fourView", height: "800px" },
                { id: "five", component: "fiveView", height: "800px" },
                { id: "six", component: "sixView", height: "800px" },
            ],
        };
    },
    components: { oneView, twoView, threeView, fourView, fiveView, sixView },
    computed: {
        img() {
            return __cdn + "design/topic/bashufengyun/";
        },
    },
    methods: {
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
