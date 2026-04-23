<template>
    <div class="m-index">
        <div class="m-bashufengyun" ref="fullPage">
            <div class="m-page-list">
                <!-- 第一屏 -->
                <section class="m-page-section" :style="sectionStyle(0)">
                    <div class="u-one u-item">
                        <img class="u-fire p-animation fadeIn" :src="`${img}home_01_fire.png`" />
                        <img class="u-txt p-animation fadeIn" :src="`${img}home_01_txt.png`" />
                    </div>
                </section>
                <!-- 第二屏 -->
                <section class="m-page-section" :style="sectionStyle(1)">
                    <div class="u-two u-item">
                        <div class="u-video" v-html="video"></div>
                    </div>
                </section>
                <!-- 第三屏 -->
                <section class="m-page-section" :style="sectionStyle(2)">
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
                </section>
                <!-- 第四屏 -->
                <section class="m-page-section" :style="sectionStyle(3)">
                    <div class="u-three u-item">
                        <img :src="`${img}home_03_01.png`" class="u-bg p-animation fadeIn" />
                        <img :src="`${img}home_03_txt.png`" class="u-txt p-animation fadeIn" />
                    </div>
                </section>
                <!-- 第五屏 -->
                <section class="m-page-section" :style="sectionStyle(4)">
                    <EasySlider
                        class="u-three m-slider"
                        :height="sliderHeight"
                        :autoplay="false"
                        animation="fade"
                        :touch="false"
                        :indicators="false"
                        v-model="threeIndex"
                    >
                        <EasySliderItem class="u-item" v-for="index in 4" :key="index">
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
                        </EasySliderItem>
                    </EasySlider>
                </section>
                <!-- 第六屏 -->
                <section class="m-page-section" :style="sectionStyle(5)">
                    <div class="u-four u-item">
                        <img :src="`${img}home_04_01.png`" class="u-bg p-animation fadeIn" />
                        <img :src="`${img}home_04_txt.png`" class="u-txt p-animation fadeIn" />
                    </div>
                </section>
                <!-- 第七屏 -->
                <section class="m-page-section" :style="sectionStyle(6)">
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
                    </div>
                </section>
                <!-- 第八屏 -->
                <section class="m-page-section" :style="sectionStyle(7)">
                    <div class="u-five u-item">
                        <img :src="`${img}home_05.png`" class="u-bg p-animation fadeIn" />
                        <img :src="`${img}home_05_txt.png`" class="u-txt p-animation fadeIn" />
                    </div>
                </section>
                <!-- 第九屏 -->
                <section class="m-page-section" :style="sectionStyle(8)">
                    <EasySlider
                        class="u-five m-slider"
                        :height="sliderHeight"
                        :autoplay="false"
                        animation="fade"
                        :touch="false"
                        :indicators="false"
                        v-model="fiveIndex"
                    >
                        <EasySliderItem class="u-item" v-for="index in 5" :key="index">
                            <img
                                :src="`${img}home_05_0${index + 1}.png`"
                                class="u-cont p-animation fadeIn"
                                :class="`u-cont-${index + 1}`"
                            />
                        </EasySliderItem>
                    </EasySlider>
                </section>
                <!-- 第十屏 -->
                <section class="m-page-section" :style="sectionStyle(9)">
                    <div class="u-six u-item">
                        <EasySlider
                            class="m-slider"
                            :height="sliderHeight"
                            animation="fade"
                            :touch="false"
                            :interval="5000"
                            :indicators="false"
                            v-model="sixIndex"
                        >
                            <EasySliderItem class="u-item" v-for="(item, i) in sixImg" :key="i">
                                <a :href="item.link" target="_blank" class="u-link">
                                    <img :src="item.src" class="u-bg" />
                                </a>
                            </EasySliderItem>
                        </EasySlider>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
import { __cdn } from "@/utils/config";
import EasySlider from "@/components/topic/common/EasySlider.vue";
import EasySliderItem from "@/components/topic/common/EasySliderItem.vue";
export default {
    name: "Index",
    components: { EasySlider, EasySliderItem },
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

            mobile: false,
            mobileHeight: "",
        };
    },
    computed: {
        sliderHeight() {
            return this.mobile ? this.mobileHeight : "800px";
        },
        img() {
            return __cdn + "design/topic/bashufengyun/";
        },
        video() {
            return `<iframe src="//player.bilibili.com/player.html?aid=513903294&bvid=BV17g41117o3&cid=786179224&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>`;
        },
    },
    methods: {
        sectionStyle(index) {
            if (this.mobile) {
                return { height: this.mobileHeight };
            }
            return { height: index === 0 ? "1066px" : "800px" };
        },
        change(num, str) {
            if (num == "two") this.two = !this.two;
            if (num == "four") this.four = str;
        },
    },

    mounted() {
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;
        if (width < height) {
            this.mobile = true;
            this.mobileHeight = width + "px";
        }
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/bashufengyun/index_page.less";
</style>
