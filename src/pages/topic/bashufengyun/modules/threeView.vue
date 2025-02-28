<template>
    <div class="m-three" :style="{ height }">
        <slider
            class="m-slider"
            :height="height"
            :autoplay="false"
            animation="fade"
            :touch="false"
            :indicators="false"
            v-model="sliderIndex"
        >
            <slider-item class="u-item" v-for="index in 5" :key="index">
                <template v-if="index == 1">
                    <img :src="`${img}home_03_0${index}.png`" class="u-img p-animation fadeIn" />
                    <img :src="`${img}home_03_txt.png`" class="u-txt p-animation fadeIn" />
                </template>
                <template v-else>
                    <img :src="`${img}home_03_0${index}_num.png`" class="u-num p-animation fadeIn" />
                    <img :src="`${img}home_03_0${index}.png`" class="p-animation fadeInRight" />
                    <img
                        :src="`${img}home_03_0${index}_people.png`"
                        class="u-people p-animation fadeInLeft"
                        :class="`u-people-${index}`"
                    />
                </template>
            </slider-item>
        </slider>
    </div>
</template>
<script>
export default {
    name: "threeView",
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
.m-three {
    .h(800px);
    background-image: url("@{kv_bashufengyun}home_03_bg.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    .m-slider {
        .w(100%);
        .u-item {
            .pr;
            .u-txt {
                .pa;
                .lt(50%);
                margin: -135px 0 0 -475px;
            }
            .u-num {
                .pa;
                .lt(0);
                .z(-2);
            }
            .u-img {
                height: 100%;
            }
        }
        .u-people {
            .pa;
            .lt(50%);
            .z(-1);
            &.u-people-2 {
                margin: -400px 0 0 -648px;
            }
            &.u-people-3 {
                margin: -328px 0 0 -618px;
            }
            &.u-people-4 {
                margin: -308px 0 0 -618px;
            }
            &.u-people-5 {
                margin: -328px 0 0 -568px;
            }
        }
        .slider-btn {
            outline: none;
            .lt(50%,0);
            background: none;
            &:hover .slider-icon {
                border-color: #f50;
            }
            .slider-icon {
                .size(30px);
                border-left: 6px solid rgba(255, 85, 0, 0.8);
                border-bottom: 6px solid rgba(255, 85, 0, 0.8);
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
