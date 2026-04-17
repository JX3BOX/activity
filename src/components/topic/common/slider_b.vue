<template>
    <div class="m-topic-slider m-topic-slider-b" :style="{ height: height }">
        <!-- 无文本切换slider -->
        <el-carousel
            :height="height"
            indicator-position="none"
            ref="elcarousel"
            :autoplay="autoplay"
        >
            <el-carousel-item v-for="(item, i) in list" :key="i">
                <a class="u-img" :href="item.link" target="_blank">
                    <img :src="resolveImagePath(item.img)" :alt="item.title" />
                </a>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { resolveImagePath } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "TopicSliderB",
    props: ["data", "height", "autoplay"],
    components: {},
    data: function () {
        return {};
    },
    computed: {
        list: function () {
            return this.data || [];
        },
    },
    methods: {
        resolveImagePath: function (path) {
            return resolveImagePath(path);
        },
    },
    watch: {},
};
</script>

<style lang="less">
.m-topic-slider-b {
    .u-img {
        .db;
        .size(100%);
        overflow: hidden;
        img {
            .db;
            .auto(x);
        }
    }
    .pr;
}
</style>