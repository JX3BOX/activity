<template>
    <div class="m-topic-imgmatrix">
        <el-row :gutter="gap" :style="'margin-bottom:-' + gap + 'px'">
            <el-col
                :span="span"
                :style="'margin-bottom:' + gap + 'px'"
                :key="item.id"
                v-for="item in list"
            >
                <!-- 图片矩阵 -->
                <a class="u-img" :href="item.link" target="_blank">
                    <img :src="resolveImagePath(item.img)" />
                </a>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { resolveImagePath } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "ImgMatrix",
    props: ["data", "gap", "span", "length"],
    components: {},
    data: function () {
        return {};
    },
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
.m-topic-imgmatrix {
    .u-img {
        .db;
        img {
            .db;
            .size(100%);
        }
    }
}
</style>