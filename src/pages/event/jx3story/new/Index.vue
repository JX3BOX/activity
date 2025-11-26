<template>
    <router-link to="/detail" class="p-jx3story m-video">
        <video class="mp4" playsinline="" autoplay="" muted="" loop="" :poster="poster">
            <source :src="videoLink" type="video/mp4" />
        </video>
        <img class="u-logo" :src="`${cdn}2025/web/1/logo.png`" />
    </router-link>
</template>

<script>
import { __cdn } from "@/utils/config";
export default {
    name: "jx3storyMain",
    inject: ["__imgRoot"],
    data() {
        return {
            cdn: __cdn + "design/event/jx3story/",
        };
    },
    computed: {
        videoLink() {
            return __cdn + "design/event/jx3story/2025/web/index.mp4";
        },
        poster() {
            return `${this.__imgRoot}web/1/bg.jpg`;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/jx3story/new/index.less";
</style>
