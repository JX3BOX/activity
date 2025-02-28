<template>
    <div class="m-topic-imglist m-topic-imglist-x">
        <!-- 横向排列图片组 -->
        <a
            class="u-img"
            :href="item.link"
            target="_blank"
            :key="item.id"
            v-for="item in list"
            :style="'margin-right:' + gap + 'px'"
        >
            <img :src="item.img | resolveImagePath" />
        </a>
    </div>
</template>

<script>
export default {
    name: "ImgListX",
    props: ["data", "gap"],
    components: {},
    computed: {
        list: function () {
            return this.data || [];
        },
    },
};
</script>

<style lang="less">
.m-topic-imglist-x {
    display: flex;
    .u-img {
        .db;
        img {
            .db;
            .size(100%);
        }
        &:last-child {
            margin-right: 0 !important;
        }
    }
}
</style>