<template>
    <router-link to="/detail" class="p-jx3story m-video">
        <video class="mp4" playsinline="" autoplay="" muted="" loop="" :poster="poster">
            <source :src="videoLink" type="video/mp4" />
        </video>
    </router-link>
</template>

<script>
import { __cdn } from "@/utils/config";
export default {
    name: "jx3storyMain",
    inject: ["__imgRoot"],
    data() {
        return {};
    },
    computed: {
        videoLink() {
            return __cdn + "design/video/20231128-fengyue-bg.mp4";
        },
        poster() {
            return `${this.__imgRoot}main/main__bg.png`;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/jx3story/new/index.less";
</style>
