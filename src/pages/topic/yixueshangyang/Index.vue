<template>
    <div data-topic="yixueshangyang" class="topic-mobile-layout m-index" :class="`m-${key}`">
        <!-- kv -->
        <div class="m-section m-section-1">
            <img :src="`${imgPath}logo.png`" class="u-logo" />
            <img :src="`${imgPath}yxsy.png`" class="u-yxsy p-animation" v-animate="'fadeInUp'" />
        </div>
        <!-- 黑市寻影 -->
        <div class="m-section m-section-2">
            <img :src="`${imgPath}title/title1.png`" class="u-title p-animation" v-animate="'fadeInUp'" />
            <div class="m-container">
                <el-carousel ref="carousel1" :interval="3000" indicator-position="none" arrow="always" height="546px">
                    <el-carousel-item v-for="item in carouselList1" :key="item">
                        <div class="u-item-content">
                            <img :src="`${imgPath}${item}`" class="u-img" />
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <!-- 厄境余息 -->
        <div class="m-section m-section-3">
            <img :src="`${imgPath}title/title2.png`" class="u-title p-animation" v-animate="'fadeInUp'" />
            <div class="m-container">
                <el-carousel ref="carousel2" :interval="3000" indicator-position="none" arrow="always" height="900px">
                    <el-carousel-item v-for="(item, i) in carouselList2" :key="i">
                        <div :class="`u-item-content u-item-content-${i + 1}`">
                            <h2>{{ item.title }}</h2>
                            <img :src="`${imgPath}${item.img}`" class="u-img" />
                            <img :src="`${imgPath}${item.img2}`" class="u-img2" v-if="item.img2" />
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <!-- 双曜亭 -->
        <div class="m-section m-section-4">
            <img :src="`${imgPath}title/title3.png`" class="u-title p-animation" v-animate="'fadeInUp'" />
            <div class="m-container">
                <div class="m-carousel-indicators">
                    <div
                        v-for="(item, index) in carouselList3"
                        :key="index"
                        class="u-item"
                        :class="{ active: activeIndex3 === index }"
                        @click="handleClick(index, '3')"
                    >
                        <img :src="`${imgPath}dot.png`" />
                        <img class="u-active" :src="`${imgPath}dot-active.png`" />
                    </div>
                </div>
                <el-carousel
                    v-model="activeIndex3"
                    ref="carousel3"
                    :interval="3000"
                    arrow="always"
                    indicator-position="none"
                    height="650px"
                    @change="handleCarouselChange($event, '3')"
                >
                    <el-carousel-item v-for="(item, i) in carouselList3" :key="i">
                        <div :class="`u-item-content u-item-content-${i + 1}`" v-if="activeIndex3 === i">
                            <h2 class="p-animation" v-animate="'fadeIn'">{{ item.title }}</h2>
                            <img
                                :src="`${imgPath}${item.img}`"
                                :class="`u-img p-animation`"
                                v-animate="'fadeInRight'"
                            />
                            <img :src="`${imgPath}${item.txt}`" class="u-img2 p-animation" v-animate="'fadeInLeft'" />
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <!-- 观风殿 -->
        <div class="m-section m-section-5">
            <img :src="`${imgPath}title/title4.png`" class="u-title p-animation" v-animate="'fadeInUp'" />
            <div class="m-container">
                <div class="m-carousel-indicators">
                    <div
                        v-for="(item, index) in carouselList4"
                        :key="index"
                        class="u-item"
                        :class="{ active: activeIndex4 === index }"
                        @click="handleClick(index, '4')"
                    >
                        <img :src="`${imgPath}dot.png`" />
                        <img class="u-active" :src="`${imgPath}dot-active.png`" />
                    </div>
                </div>
                <el-carousel
                    v-model="activeIndex4"
                    ref="carousel4"
                    :interval="3000"
                    arrow="always"
                    indicator-position="none"
                    height="650px"
                    @change="handleCarouselChange($event, '4')"
                >
                    <el-carousel-item v-for="(item, i) in carouselList4" :key="i">
                        <div :class="`u-item-content u-item-content-${i + 1}`" v-if="activeIndex4 === i">
                            <h2 class="p-animation" v-animate="'fadeIn'">{{ item.title }}</h2>
                            <img :src="`${imgPath}${item.img}`" class="u-img p-animation" v-animate="'fadeInLeft'" />
                            <img :src="`${imgPath}${item.txt}`" class="u-img2 p-animation" v-animate="'fadeInRight'" />
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="m-section m-section-6">
            <img :src="`${imgPath}title/title5.png`" class="u-title p-animation" v-animate="'fadeInUp'" />
            <div class="m-box">
                <div class="u-card" v-for="i in 3" :key="i" @mouseenter="activeIndex = i" @mouseleave="activeIndex = 0">
                    <img
                        :src="`${imgPath}0${i}-hover.png`"
                        :class="`u-img-hover ${activeIndex === i ? 'active' : ''}`"
                    />
                    <img :src="`${imgPath}0${i}.png`" :class="`u-img ${activeIndex === i ? 'active' : ''}`" />
                </div>
            </div>
        </div>
        <div class="m-section m-section-7">
            <img :src="`${imgPath}logo.png`" class="u-logo" />
        </div>
    </div>
</template>

<script>
const KEY = "yixueshangyang";
import { getTopic } from "@/service/topic";
import { __cdn } from "@/utils/config";
export default {
    name: "Index",
    components: {},
    data: function () {
        return {
            imgPath: __cdn + "design/topic/" + KEY + "/",
            key: KEY,
            activeIndex: 0,
            activeIndex3: 0,
            activeIndex4: 0,
            carouselList1: ["h-1.png", "h-3.png"],
            carouselList2: [
                { img: "e-1.png", img2: "shangui.png", title: "剧情篇" },
                { img: "e-2.png", title: "玩法篇" },
                { img: "e-3.png", img2: "xuanjing.png", title: "奖励篇" },
            ],
            carouselList3: [
                { img: "boss/boss1.png", txt: "boss/boss1_wz.png", title: "壹号首领" },
                { img: "boss/boss2.png", txt: "boss/boss2_wz.png", title: "贰号首领" },
                { img: "boss/boss3.png", txt: "boss/boss3_wz.png", title: "叁号首领" },
            ],
            carouselList4: [
                { img: "boss/boss4.png", txt: "boss/boss4_wz.png", title: "壹号首领" },
                { img: "boss/boss5.png", txt: "boss/boss5_wz.png", title: "贰号首领" },
                { img: "boss/boss6.png", txt: "boss/boss6_wz.png", title: "叁号首领" },
                { img: "boss/boss7.png", txt: "boss/boss7_wz.png", title: "肆号首领" },
            ],
            shakeTimer: null,
        };
    },
    directives: {
        animate: {
            mounted: function (el, binding) {
                binding.addClass = () => {
                    const { top } = el.getBoundingClientRect();
                    const h = document.documentElement.clientHeight || document.body.clientHeight;
                    if (top < h) {
                        if (el.className.indexOf(binding.value) == -1) {
                            // 初次还未绑定过，则新增类名(注意：下面单引号中间是一个空格！！！)
                            el.className = binding.value + " " + el.className;
                        }
                        if (binding.addClass) {
                            window.removeEventListener("scroll", binding.addClass);
                        }
                    }
                };
                window.addEventListener("scroll", binding.addClass, true);
                binding.addClass();
            },
            unmounted: function (el, binding) {
                if (binding.addClass) {
                    window.removeEventListener("scroll", binding.addClass);
                }
            },
        },
    },
    computed: {
        data: function () {
            let _data = {};
            this.raw.forEach((item) => {
                if (!_data[item.subtype]) {
                    _data[item.subtype] = [];
                }
                _data[item.subtype].push(item);
            });
            return _data;
        },
        st() {
            return this.activity[4];
        },
    },

    methods: {
        init: function () {
            getTopic(KEY).then((res) => {
                this.raw = res.data.data;
            });
        },
        startArrowShake() {
            let count = 0;
            this.shakeTimer = setInterval(() => {
                const leftArrows = this.$el.querySelectorAll(".el-carousel__arrow--left");
                const rightArrows = this.$el.querySelectorAll(".el-carousel__arrow--right");

                const isMobile = window.matchMedia("(max-width: 767px)").matches;
                const pos = count % 2 === 0 ? "8px" : "0px";

                leftArrows.forEach((left) => {
                    if (isMobile) return left.style.removeProperty("transform");
                    left.style.setProperty("transform", `translateY(-50%) rotate(180deg) translateX(-${pos})`, "important");
                });

                rightArrows.forEach((right) => {
                    if (isMobile) return right.style.removeProperty("transform");
                    right.style.setProperty("transform", `translateY(-50%) translateX(-${pos})`, "important");
                });

                count++;
            }, 300);
        },
        handleClick(index, num) {
            this[`activeIndex${num}`] = index;
            this.$refs[`carousel${num}`].setActiveItem(index);
        },
        handleCarouselChange(index, num) {
            this[`activeIndex${num}`] = index;
        },
    },
    mounted() {
        this.init();
        this.arrowShakeDelay = setTimeout(() => {
            this.startArrowShake();
        }, 500);
    },
    beforeUnmount() {
        clearTimeout(this.arrowShakeDelay);
        clearInterval(this.shakeTimer);
    },
};
</script>
<style lang="less" scoped>
:deep(.el-carousel__arrow) {
    background: transparent !important;
    background-color: transparent !important;
    font-size: 0 !important;
    border: none !important;
    outline: none !important;
    border-radius: 0 !important;
    background-image: url("@{kv_yixueshangyang}arrow.png") !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: var(--yixueshangyang-arrow-size, contain) !important;
    opacity: 1 !important;
    z-index: 9 !important;
}

@media (min-width: 768px) {
    :deep(.el-carousel__arrow) {
        top: 50% !important;
    }
    :deep(.el-carousel__arrow--left) {
        transform: translateY(-50%) rotate(180deg) !important;
    }

    :deep(.el-carousel__arrow--right) {
        transform: translateY(-50%) !important;
    }

    .m-section {
        :deep(.el-carousel__arrow) {
            width: 79px !important;
            height: 58px !important;
        }
        :deep(.el-carousel__arrow--left) {
            left: 20px !important;
        }

        :deep(.el-carousel__arrow--right) {
            right: 20px !important;
        }
        &-3 {
            :deep(.el-carousel__arrow) {
                width: 40px !important;
                height: 29px !important;
            }
            :deep(.el-carousel__arrow--left) {
                left: 50% !important;
                top: 90px !important;
                margin: 0 0 0 -200px !important;
            }

            :deep(.el-carousel__arrow--right) {
                right: 50% !important;
                top: 90px !important;
                margin: 0 -200px 0 0 !important;
            }
        }
        &-4,
        &-5 {
            :deep(.el-carousel__arrow) {
                width: 40px !important;
                height: 29px !important;
            }
            :deep(.el-carousel__arrow--left) {
                left: 50% !important;
                margin: 0 0 0 -650px !important;
                top: -185px !important;
            }

            :deep(.el-carousel__arrow--right) {
                right: 50% !important;
                margin: 0 -650px 0 0 !important;
                top: -185px !important;
            }
            :deep(.el-carousel__item) {
                animation: none !important;
                transition: none !important;
            }
            :deep(.el-carousel__container) {
                transition: none !important;
                transform: none !important;
            }
            :deep(.el-carousel__item.is-active) {
                animation: none !important;
                transition: none !important;
            }
            :deep(.el-carousel__track) {
                transition: none !important;
                transform: none !important;
            }
        }
    }
}
</style>
<style lang="less">
@import "~@/assets/css/topic/yixueshangyang/index.less";
</style>

<style lang="less">
@import "~@/assets/css/topic/mobile/reflow.less";

@media (max-width: 767px) {
    #app .topic-mobile-layout[data-topic="yixueshangyang"] {
        > .m-section-1 {
            min-height: 0;
            height: auto;
            aspect-ratio: 3840 / 2181;
            padding: 0;
            background-size: 100% 100%;
            background-position: center top;

            > .u-logo {
                position: absolute;
                inset: 6% auto auto 4%;
                width: min(25%, 135px);
                height: auto;
                margin: 0;
            }

            > .u-yxsy {
                position: absolute;
                inset: auto 0 7%;
                width: min(62%, 370px);
                height: auto;
                margin: 0 auto;
            }
        }

        > .m-section:not(.m-section-1) {
            padding: 24px 16px;
            background-size: cover;
            background-position: center top;

            > .u-title {
                width: min(76%, 270px);
                height: auto;
                margin: 0 auto 16px;
            }
        }

        .m-section {
            .el-carousel {
                padding-bottom: 52px;
            }

            // 只用当前画面撑开轮播容器，每张素材保留自身宽高比。
            .el-carousel__item.is-active {
                position: relative;
                height: auto;
            }

            .el-carousel__item:not(.is-active) {
                visibility: hidden;
            }

            .el-carousel__arrow--left {
                left: calc(50% - 60px);
                transform: rotate(180deg);
            }

            .el-carousel__arrow--right {
                right: calc(50% - 60px);
                transform: none;
            }

            .el-carousel__arrow {
                margin: 0;
                --yixueshangyang-arrow-size: 32px auto;
            }

            .u-item-content {
                display: flex;
                align-items: center;
                flex-direction: column;
                flex-wrap: nowrap;
                gap: 8px;
                width: 100%;
                margin: 0;

                h2 {
                    inset: auto;
                    width: auto;
                    margin: 0;
                    font-size: 18px;
                    line-height: 1.5;
                    letter-spacing: 0;
                    text-align: center;
                }

                > .u-img,
                > .u-img2 {
                    position: static;
                    inset: auto;
                    width: 100%;
                    height: auto;
                    margin: 0 auto;
                }
            }

            .m-carousel-indicators {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-flow: row nowrap;
                gap: 8px;
                margin: 0 auto 12px;

                &::before,
                &::after {
                    flex: 1 1 0;
                    min-width: 0;
                    max-width: 64px;
                    height: 44px;
                    margin: 0;
                }

                .u-item {
                    display: grid;
                    place-items: center;
                    flex: 0 0 44px;
                    width: 44px;
                    height: 44px;
                    margin: 0;
                    cursor: pointer;

                    &::after {
                        display: none;
                    }

                    > img {
                        position: static;
                        width: 24px;
                        height: auto;
                        margin: 0;
                    }

                    > .u-active,
                    &.active > img {
                        display: none;
                    }

                    &.active > .u-active {
                        display: block;
                        width: 28px;
                    }
                }
            }
        }

        .m-section-3 .u-item-content {
            > .u-img {
                max-width: 420px;
            }

            > .u-img2 {
                width: min(65%, 260px);
            }
        }

        .m-section-4,
        .m-section-5 {
            .m-container {
                background-position: center bottom;
                background-size: 100% auto;
            }

            .u-item-content > .u-img {
                width: min(74%, 340px);
            }

            .u-item-content > .u-img2 {
                // 两组说明图末尾都有透明留白，收回部分占位，保留完整文字。
                margin-bottom: -16%;
            }
        }

        .m-section-6 .m-box {
            display: grid;
            justify-content: center;
            gap: 12px;

            .u-card {
                display: grid;
                width: min(100%, 260px);
                margin: 0 auto;

                > img {
                    position: static;
                    grid-area: 1 / 1;
                    width: 100%;
                    height: auto;
                    margin: 0;
                }

                > .u-img-hover:not(.active),
                > .u-img.active {
                    visibility: hidden;
                }
            }
        }

        .m-section-7 > .u-logo {
            width: min(42%, 180px);
            height: auto;
            margin: 0 auto;
        }
    }
}
</style>
