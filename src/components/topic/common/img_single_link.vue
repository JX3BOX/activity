<template>
    <a class="m-topic-img-single-link" :style="styles" :href="link">
        <!-- 带链接版单图片 -->
        <img :src="url | resolveImagePath" :alt="alt" />
    </a>
</template>

<script>
export default {
    name: "ImgSingleLink",
    props: ["data", "width", "height", "alt", "href", "src"],
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
        // 链接地址
        link: function () {
            if (this.href) {
                return this.href;
            } else {
                return this.data?.[0]?.["link"];
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