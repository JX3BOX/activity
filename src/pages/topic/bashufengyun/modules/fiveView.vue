<template>
    <div class="m-five" :style="{ height }">
        <slider
            class="m-slider"
            :height="height"
            :autoplay="false"
            animation="fade"
            :indicators="false"
            v-model="sliderIndex"
            :touch="false"
        >
            <slider-item class="u-item" v-for="index in 6" :key="index">
                <template v-if="index == 1">
                    <img :src="`${img}home_05.png`" class="u-img p-animation fadeIn" />
                    <img :src="`${img}home_05_txt.png`" class="u-txt p-animation fadeIn" />
                </template>
                <template v-else>
                    <img
                        :src="`${img}home_05_0${index}.png`"
                        class="u-cont p-animation fadeIn"
                        :class="`u-cont-${index}`"
                    />
                </template>
            </slider-item>
        </slider>
    </div>
</template>
<script>
export default {
    name: "fiveView",
    props: ["moduleData"],
    data: function () {
        return {
            sliderIndex: 0,
        };
    },
    computed: {
        img() {
            return this.moduleData.img;
        },
        height() {
            return this.moduleData.height;
        },
    },
};
</script>
<style lang="less">
.m-five {
    .h(800px);
    background-image: url("@{kv_bashufengyun}home_05_bg.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    .m-slider {
        .w(100%);
        .u-item {
            .pr;
            .u-img {
                height: 100%;
            }
            .u-txt {
                .pa;
                .lt(50%);
                margin: -400px 0 0 -999px;
            }
            .u-num {
                .pa;
                .lt(0);
                .z(-2);
            }
        }
        .u-cont {
            .pa;
            .lt(50%);
            .z(-1);
            &.u-cont-2 {
                margin: -172px 0 0 -540px;
            }
            &.u-cont-3 {
                margin: -330px 0 0 -420px;
            }
            &.u-cont-4 {
                margin: -333px 0 0 -405px;
            }
            &.u-cont-5 {
                margin: -335px 0 0 -440px;
            }
            &.u-cont-6 {
                margin: -335px 0 0 -467px;
            }
        }
        .slider-btn {
            outline: none;
            .lt(50%,0);
            background: none;
            &:hover .slider-icon {
                border-color: #000;
            }
            .slider-icon {
                .size(30px);
                border-left: 6px solid rgba(0, 0, 0, 0.8);
                border-bottom: 6px solid rgba(0, 0, 0, 0.8);
                transition: border 0.2s;
            }
            &.slider-btn-left {
                .ml(-40%);
            }
            &.slider-btn-right {
                .ml(40%);
            }
        }
    }
}
</style>
