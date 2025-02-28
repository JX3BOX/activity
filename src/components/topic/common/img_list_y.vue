<template>
    <div class="m-topic-imglist m-topic-imglist-y">
        <!-- 横向排列图片组 -->
        <a
            class="u-img"
            :href="item.link"
            target="_blank"
            :key="item.id"
            v-for="item in list"
            :style="'margin-bottom:' + gap + 'px'"
        >
            <img :src="item.img | resolveImagePath" />
        </a>
    </div>
</template>

<script>
export default {
    name: "ImgListY",
    props: ["data", "gap", "length"],
    components: {},
    computed: {
        list: function () {
            let data = this.data || [];
            if (this.length) {
                data = data.slice(0, this.length);
            }
            return data;
        },
    },
};
</script>

<style lang="less">
.m-topic-imglist-y {
    .u-img {
        .db;
        img {
            .db;
        }
        &:last-child {
            margin-bottom: 0 !important;
        }
    }
}
</style>