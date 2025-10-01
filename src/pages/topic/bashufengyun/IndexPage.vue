<template>
    <div class="m-index">
        <div class="m-bashufengyun" ref="fullPage" :style="height">
            <!-- 监控滚动 -->
            <div
                class="fullPageContainer"
                ref="fullPageContainer"
                @mousewheel="mouseWheelHandle"
                @DOMMouseScroll="mouseWheelHandle"
                @touchstart="handleTouchstart"
                @touchend="handleTouchend"
            >
                <!-- 轮播 -->
                <el-carousel
                    class="m-carousel"
                    direction="vertical"
                    trigger="click"
                    :autoplay="false"
                    :height="carousel"
                    ref="carousel"
                    @change="change('carousel', $event)"
                >
                    <!-- 第一屏 -->
                    <el-carousel-item name="0">
                        <div class="u-one u-item">
                            <img class="u-fire p-animation fadeIn" :src="`${img}home_01_fire.png`" />
                            <img class="u-txt p-animation fadeIn" :src="`${img}home_01_txt.png`" />
                        </div>
                    </el-carousel-item>
                    <!-- 第二屏 -->
                    <el-carousel-item name="1">
                        <div class="u-two u-item">
                            <div class="u-video" v-html="video"></div>
                        </div>
                    </el-carousel-item>
                    <!-- 第三屏 -->
                    <el-carousel-item name="2">
                        <div class="u-two u-item">
                            <div class="u-icon">
                                <img src="https://img.jx3box.com/image/xf/10224.png" @click="change('two')" />
                                <img src="https://img.jx3box.com/image/xf/10225.png" @click="change('two')" />
                            </div>
                            <a
                                href="https://origin.jx3box.com/bps/#/?subtype=%E6%83%8A%E7%BE%BD%E8%AF%80"
                                target="_blank"
                                class="u-link"
                                v-show="two"
                            >
                                <img
                                    :src="`${img}home_02_02.png`"
                                    class="u-img"
                                    :class="two ? 'p-animation fadeInRight' : ''"
                            /></a>
                            <a
                                href="https://origin.jx3box.com/bps/#/?subtype=%E5%A4%A9%E7%BD%97%E8%AF%A1%E9%81%93"
                                target="_blank"
                                class="u-link"
                                v-show="!two"
                            >
                                <img
                                    :src="`${img}home_02_03.png`"
                                    class="u-img"
                                    :class="two ? '' : 'p-animation fadeInRight'"
                                />
                            </a>
                            <img
                                :src="`${img}home_02_people.png`"
                                class="u-people p-animation fadeIn"
                                :class="`u-people-1`"
                            />
                        </div>
                    </el-carousel-item>
                    <!-- 第四屏 -->
                    <el-carousel-item name="3">
                        <div class="u-three u-item">
                            <img :src="`${img}home_03_01.png`" class="u-bg p-animation fadeIn" />
                            <img :src="`${img}home_03_txt.png`" class="u-txt p-animation fadeIn" />
                        </div>
                    </el-carousel-item>
                    <!-- 第五屏 -->
                    <el-carousel-item name="4">
                        <slider
                            class="u-three m-slider"
                            :height="carousel"
                            :autoplay="false"
                            animation="fade"
                            :touch="false"
                            :indicators="false"
                            v-model="threeIndex"
                        >
                            <slider-item class="u-item" v-for="index in 4" :key="index">
                                <div class="u-all">
                                    <img :src="`${img}home_03_0${index + 1}_num.png?num`" class="u-num" />
                                    <img
                                        :src="`${img}home_03_0${index + 1}.png`"
                                        :class="index ? 'p-animation fadeInRight' : ''"
                                    />
                                    <img
                                        :src="`${img}home_03_0${index + 1}_people.png`"
                                        class="u-people"
                                        :class="index ? `u-people-${index + 1}  p-animation fadeInLeft` : ''"
                                    />
                                </div>
                            </slider-item>
                        </slider>
                    </el-carousel-item>
                    <!-- 第六屏 -->
                    <el-carousel-item name="5">
                        <div class="u-four u-item">
                            <img :src="`${img}home_04_01.png`" class="u-bg p-animation fadeIn" />
                            <img :src="`${img}home_04_txt.png`" class="u-txt p-animation fadeIn" /></div
                    ></el-carousel-item>
                    <!-- 第七屏 -->
                    <el-carousel-item name="6">
                        <div class="u-four u-item">
                            <img
                                v-show="four == '0'"
                                :src="`${img}home_04_02.png`"
                                class="u-cont p-animation fadeIn"
                                :class="`u-cont-2`"
                            />
                            <img
                                v-show="four == '1'"
                                :src="`${img}home_04_03.png`"
                                class="u-cont p-animation fadeIn"
                                :class="`u-cont-2`"
                            />
                            <img
                                v-show="four == '2'"
                                :src="`${img}home_04_04.png`"
                                class="u-cont p-animation fadeIn"
                                :class="`u-cont-2`"
                            />

                            <div class="u-icon">
                                <span @click="change('four', '0')">副本介绍</span>
                                <span @click="change('four', '1')">辽东双煞</span>
                                <span @click="change('four', '2')">蛮人将帅</span>
                            </div>
                        </div></el-carousel-item
                    >
                    <!-- 第八屏 -->
                    <el-carousel-item name="7">
                        <div class="u-five u-item">
                            <img :src="`${img}home_05.png`" class="u-bg p-animation fadeIn" />
                            <img :src="`${img}home_05_txt.png`" class="u-txt p-animation fadeIn" /></div
                    ></el-carousel-item>
                    <!-- 第九屏 -->
                    <el-carousel-item name="8">
                        <slider
                            class="u-five m-slider"
                            :height="carousel"
                            :autoplay="false"
                            animation="fade"
                            :touch="false"
                            :indicators="false"
                            v-model="fiveIndex"
                        >
                            <slider-item class="u-item" v-for="index in 5" :key="index">
                                <img
                                    :src="`${img}home_05_0${index + 1}.png`"
                                    class="u-cont p-animation fadeIn"
                                    :class="`u-cont-${index + 1}`"
                                />
                            </slider-item> </slider
                    ></el-carousel-item>
                    <!-- 第十屏 -->
                    <el-carousel-item name="9">
                        <div class="u-six u-item">
                            <slider
                                class="m-slider"
                                :height="carousel"
                                animation="fade"
                                :touch="false"
                                interval="5000"
                                :indicators="false"
                                v-model="sixIndex"
                            >
                                <slider-item class="u-item" v-for="(item, i) in sixImg" :key="i">
                                    <a :href="item.link" target="_blank" class="u-link">
                                        <img :src="item.src" class="u-bg" />
                                    </a>
                                </slider-item>
                            </slider></div
                    ></el-carousel-item>
                </el-carousel>
            </div>
        </div>
    </div>
</template>
<script>
import { __cdn } from "@/utils/config";
export default {
    name: "Index",
    data() {
        return {
            two: true,
            four: "0",
            threeIndex: 0,
            sixIndex: 0,
            fiveIndex: 0,
            sixImg: [
                {
                    src: "https://oss.jx3box.com/upload/post/2021/11/22/6037_7424178.png",
                    link: "https://origin.jx3box.com/fb/#/?fb_zlp=%E5%B7%B4%E8%9C%80%E9%A3%8E%E4%BA%91&fb_name=%E8%8D%BB%E8%8A%B1%E5%9C%A3%E6%AE%BF",
                },
                {
                    src: "https://oss.jx3box.com/upload/post/2021/11/19/6037_96162.png",
                    link: "https://origin.jx3box.com/fb/#/drop?fb_zlp=%E5%B7%B4%E8%9C%80%E9%A3%8E%E4%BA%91&fb_name=%E8%8D%BB%E8%8A%B1%E5%9C%A3%E6%AE%BF",
                },
            ],

            current: 0,
            isScrolling: false,
            deltaY: 0,
            mobile: false,

            mobileHeight: "",
            startTime: "",
            startX: "",
            startY: "",
        };
    },
    computed: {
        height() {
            return this.mobile
                ? { height: this.mobileHeight }
                : this.current == 0
                ? { height: "1066px" }
                : { height: "800px" };
        },
        carousel() {
            return this.mobile ? this.mobileHeight : this.current == 0 ? "1066px" : "800px";
        },
        img() {
            return __cdn + "design/topic/bashufengyun/";
        },
        video() {
            return `<iframe src="//player.bilibili.com/player.html?aid=513903294&bvid=BV17g41117o3&cid=786179224&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>`;
        },
    },
    methods: {
        // 控制切换间隔1.5秒
        stop() {
            this.isScrolling = true;
            setTimeout(() => {
                this.isScrolling = false;
            }, 1500);
        },
        setActiveItem(i = this.current) {
            this.$refs.carousel.setActiveItem(i);
            this.stop();
        },
        // 往下切换
        next() {
            let len = 10; // 页面的个数
            if (this.current + 1 <= len) {
                this.current += 1;
                this.setActiveItem();
            }
        },
        // 往上切换
        pre() {
            if (this.current - 1 >= 0) {
                this.current -= 1;
                this.setActiveItem();
            }
        },
        // 切换
        change(num, str) {
            if (num == "two") this.two = !this.two;
            if (num == "four") this.four = str;
            if (num == "carousel") this.current = ~~str;
        },
        // 判断上下滚动
        mouseWheelHandle(event) {
            let evt = event || window.event;
            if (evt.stopPropagation) {
                evt.stopPropagation();
            } else {
                evt.returnValue = false;
            }
            if (this.isScrolling) return false;
            let e = event.originalEvent || event;
            this.deltaY = e.deltaY || e.detail;
            if (this.deltaY > 0) {
                this.next();
            } else if (this.deltaY < 0) {
                this.pre();
            }
        },
        //屏幕滑动
        //手指按下屏幕
        handleTouchstart(event) {
            this.startTime = Date.now();
            this.startX = event.changedTouches[0].clientX;
            this.startY = event.changedTouches[0].clientY;
        },
        //手指离开屏幕
        handleTouchend(event) {
            const endTime = Date.now();
            const endX = event.changedTouches[0].clientX;
            const endY = event.changedTouches[0].clientY;
            //判断按下的时长
            if (endTime - this.startTime < 200) {
                if (event.target.tagName == "A" || event.target.tagName == "a") {
                    event.preventDefault();
                    return window.open(event.target.href, "_self");
                }
            }

            if (endTime - this.startTime > 2000) {
                return;
            }
            //滑动的方向
            let direction = "";

            if (Math.abs(endX - this.startX) > 10) {
                if (Math.abs(endY - this.startY) > 100) {
                    return;
                } else {
                    direction = endX - this.startX > 0 ? "right" : "left";
                }
            } else {
                return;
            }
            //用户做了合法的滑动操作
            if (direction === "right") {
                this.next();
            } else {
                this.pre();
            }
        },
    },

    mounted() {
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;
        if (width < height) {
            this.mobile = true;
            this.mobileHeight = width + "px";
        }
        document.addEventListener(
            "touchmove",
            function (ev) {
                ev.preventDefault();
            },
            { passive: false }
        );
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/bashufengyun/index_page.less";
</style>
