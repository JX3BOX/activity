<template>
    <div class="m-two" :style="{ height }">
        <slider
            class="m-slider"
            :height="height"
            :autoplay="false"
            animation="fade"
            :indicators="false"
            :touch="false"
            v-model="sliderIndex"
        >
            <slider-item class="u-item">
                <img
                    :src="`${img}home_02_01.png`"
                    class="u-img p-animation"
                    :class="index == 1 ? 'fadeInRight' : 'bounceIn'"
                />
                <img
                    :src="`${img}home_02_people.png`"
                    class="u-people p-animation fadeIn"
                    :class="`u-people-${index}`"
                />
            </slider-item>
            <slider-item class="u-item">
                <div class="u-video" v-html="video"></div>
                <img
                    :src="`${img}home_02_people.png`"
                    class="u-people p-animation fadeIn"
                    :class="`u-people-${index}`"
                />
            </slider-item>
            <slider-item class="u-item">
                <div class="u-icon">
                    <img src="https://img.jx3box.com/image/xf/10224.png" @click="change" />
                    <img src="https://img.jx3box.com/image/xf/10225.png" @click="change" />
                </div>
                <a href="http://" target="_blank">
                    <img
                        v-show="show"
                        :src="`${img}home_02_02.png`"
                        class="u-img"
                        :class="show ? 'p-animation fadeInRight' : ''"
                /></a>
                <a href="http://" target="_blank">
                    <img
                        v-show="!show"
                        :src="`${img}home_02_03.png`"
                        class="u-img"
                        :class="show ? '' : 'p-animation fadeInRight'"
                    />
                </a>
                <img
                    :src="`${img}home_02_people.png`"
                    class="u-people p-animation fadeIn"
                    :class="`u-people-${index}`"
                />
            </slider-item>
        </slider>
    </div>
</template>
<script>
export default {
    name: "twoView",
    props: ["moduleData"],
    data: function () {
        return {
            sliderIndex: 0,
            show: true,
        };
    },
    computed: {
        img() {
            return this.moduleData.img;
        },
        height() {
            return this.moduleData.height;
        },
        index() {
            return this.moduleData.index;
        },
        video() {
            return `<iframe src="//player.bilibili.com/player.html?aid=513903294&bvid=BV17g41117o3&cid=786179224&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>`;
        },
    },
    methods: {
        change() {
            this.show = !this.show;
        },
    },
};
</script>
<style lang="less">
.m-two {
    background-image: url("@{kv_bashufengyun}home_02_bg.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    .m-slider {
        .w(100%);
        .u-item {
            .pr;
            .flex;
            align-items: center;
            justify-content: center;
            .u-icon {
                .pa;
                .z(3);
                .lt(50%,120px);
                .w(260px);
                .flex;
                .ml(-100px);
                align-items: center;
                justify-content: space-between;
                img {
                    .size(68px);
                    cursor: pointer;
                    transition: 0.2s ease;
                    &:hover {
                        transform: scale(1.25);
                    }
                }
            }
            .u-people {
                .pa;
                .lb(50%,0);
                .z(-1);
                &.u-people-1 {
                    .ml(-896px);
                }
                &.u-people-2 {
                    .ml(-260px);
                }
                &.u-people-3 {
                    .ml(-260px);
                }
            }
            .u-video {
                .size(80%);
                box-sizing: border-box;
                iframe,
                video {
                    .size(100%);
                }
            }
        }
        .slider-btn {
            outline: none;
            .lt(50%,0);
            background: none;
            .slider-icon {
                .size(30px);
                border-left: 6px solid rgba(255, 255, 255, 0.8);
                border-bottom: 6px solid rgba(255, 255, 255, 0.8);
                transition: border 0.2s;
            }
            &.slider-btn-left {
                .ml(-45%);
            }
            &.slider-btn-right {
                .ml(42%);
            }
        }
    }
}
</style>
