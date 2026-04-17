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
            <img :src="resolveImagePath(item.img)" />
        </a>
    </div>
</template>

<script>
import { resolveImagePath } from "@jx3box/jx3box-common/js/utils";
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
    methods: {
        resolveImagePath: function (path) {
            return resolveImagePath(path);
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