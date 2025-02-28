<template>
    <div class="m-topic-img-single-simple" :style="styles">
        <!-- 无链接版单图片 -->
        <img :src="url | resolveImagePath" :alt="alt" />
    </div>
</template>

<script>
export default {
    name: "ImgSingleSimple",
    props: ["data", "width", "height", "alt", "src"],
    components: {},
    data: function () {
        return {};
    },
    computed: {
        styles: function () {
            return {
                width: this.width,
                height: this.height,
            };
        },
        // 图片地址
        url: function () {
            if (this.src) {
                return this.src;
            } else {
                return this.data?.[0]?.["img"];
            }
        },
    },
};
</script>

<style scoped lang="less">
.m-topic-img-single-link {
    .db;
    img {
        .db;
        .size(100%);
    }
}
</style>