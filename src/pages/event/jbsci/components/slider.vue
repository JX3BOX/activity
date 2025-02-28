<template>
    <div class="m-slider">
        <el-carousel :height="height">
            <el-carousel-item v-for="(item, i) in slider" :key="i">
                <a
                    :href="item.link"
                    target="_blank"
                    class="u-item"
                    :style="{ backgroundColor: item.color, height: height }"
                >
                    <el-image :src="item.img" fit="cover"></el-image>
                </a>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { orderBy } from "lodash";
export default {
    name: "slider",
    props: ["data"],
    data: function () {
        return {
            slider: [],
        };
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler: function (slider) {
                if (slider) {
                    console.log(slider);
                    this.slider = orderBy(slider, ["power"], ["desc"]);
                }
            },
        },
    },
    computed: {
        height() {
            const h = window.innerHeight - 64 - 160;
            return h < 680 ? "680px" : `${h}px`;
        },
    },
};
</script>
<style lang="less">
.m-slider {
    .u-item,
    .el-image__inner {
        .db;
    }
    .u-item {
        .flex;
        align-items: center;
        justify-content: center;
    }
    .el-carousel__indicators--horizontal {
        left: 20px;
    }
    .el-carousel__indicator--horizontal .el-carousel__button {
        .size(10px);
        .r(50%);
        background: #fff;
        border: 1px solid #fff;
        border-radius: 50%;
        opacity: 0.3;
    }
    .el-carousel__indicator--horizontal.is-active .el-carousel__button {
        .size(10px);
        .r(50%);
        background: #ba9624;
        border: 1px solid #ba9624;
        opacity: 1;
    }
}
</style>
