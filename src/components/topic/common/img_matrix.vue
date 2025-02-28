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
                    <img :src="item.img | resolveImagePath" />
                </a>
            </el-col>
        </el-row>
    </div>
</template>

<script>
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