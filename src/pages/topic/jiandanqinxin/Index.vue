<template>
    <div class="m-index">
        <div class="m-bg-list">
            <img loading="lazy" v-for="index in 8" :key="index" :src="imgurl + 'bg_0' + index + '.jpg'" width="100%" />
        </div>
        <div class="m-content">
            <img class="u-page-title p-animation" v-animate="'fadeInUp'" :src="imgurl + 'dabiaoti.png'" />

            <!-- 新门派 -->
            <div class="m-content-title" style="margin-top: 21%">
                <img
                    class="u-title-index p-animation"
                    v-animate="'fadeInUp'"
                    loading="lazy"
                    :src="imgurl + 'bt1-2.png'"
                />
                <img
                    class="u-title-text p-animation"
                    v-animate="'fadeInDown'"
                    loading="lazy"
                    :src="imgurl + 'bt1-1.png'"
                />
                <img class="u-title-bg p-animation" v-animate="`fadeIn`" loading="lazy" :src="imgurl + 'bt-0.png'" />
            </div>
            <div class="m-cg">
                <img class="p-animation u-bg" :class="{ 'opacity-1': cgAddClassStatus }" :src="imgurl + 'cg-bg.png'" />
                <img
                    class="p-animation u-figure"
                    @animationend="addCgClass"
                    v-animate="'fadeInLeft'"
                    :src="imgurl + 'cg-1.png'"
                />
                <img class="p-animation u-title" v-animate="'fadeInRight'" :src="imgurl + 'cg-2.png'" />
                <div class="m-cg-content">
                    <div class="u-mw"></div>
                    <div class="u-xz"></div>
                    <img
                        class="u-content p-animation"
                        :class="{ 'opacity-1': cgAddClassStatus }"
                        :src="imgurl + 'cg-3.png'"
                    />
                    <img class="u-counter-content u-mw-content p-animation" :src="imgurl + 'cg-4.png'" />
                    <img class="u-counter-content u-xz-content p-animation" :src="imgurl + 'cg-5.png'" />
                </div>
            </div>
            <!-- 新团本 -->
            <div class="m-content-title" style="margin-top: 13.5%">
                <img
                    class="u-title-index p-animation"
                    v-animate="'fadeInUp'"
                    loading="lazy"
                    :src="imgurl + 'bt2-2.png'"
                />
                <img
                    class="u-title-text p-animation"
                    v-animate="'fadeInDown'"
                    loading="lazy"
                    :src="imgurl + 'bt2-1.png'"
                />
                <img class="u-title-bg p-animation" v-animate="`fadeIn`" loading="lazy" :src="imgurl + 'bt-0.png'" />
            </div>
            <div class="m-xl">
                <img class="p-animation u-xl-title" v-animate="'fadeInRight'" :src="imgurl + 'xl-bt.png'" />

                <div class="m-xl-content">
                    <img
                        class="u-xl-arrow"
                        @click="$refs.xlCarouselRef.prev()"
                        loading="lazy"
                        :src="imgurl + `jt1.png`"
                    />
                    <el-carousel
                        ref="xlCarouselRef"
                        indicator-position="outside"
                        arrow="never"
                        class="m-xl-carousel"
                        @change="xlCarouselChange"
                    >
                        <el-carousel-item>
                            <img
                                class="u-xl-item"
                                @click="openNewWindow('https://www.jx3box.com/fb/102053')"
                                loading="lazy"
                                :src="imgurl + `xl0-1.png`"
                            />
                            <img
                                v-if="xlCarouselIndex === 0"
                                class="u-xl-item-wz p-animation"
                                v-animate="'fadeInUp'"
                                loading="lazy"
                                :src="imgurl + `xl0-2.png`"
                            />
                        </el-carousel-item>
                        <el-carousel-item v-for="index in 5" :key="index">
                            <img
                                class="u-xl-item"
                                @click="openNewWindow('https://www.jx3box.com/fb/102053')"
                                loading="lazy"
                                :src="imgurl + `xl${index}.png`"
                            />
                        </el-carousel-item>
                    </el-carousel>
                    <img
                        class="u-xl-arrow"
                        @click="$refs.xlCarouselRef.next()"
                        loading="lazy"
                        :src="imgurl + `jt2.png`"
                    />
                </div>
            </div>
            <!-- 新大战本 -->
            <div class="m-content-title" style="margin-top: 15%">
                <img
                    class="u-title-index p-animation"
                    v-animate="'fadeInUp'"
                    loading="lazy"
                    :src="imgurl + 'bt3-2.png'"
                />
                <img
                    class="u-title-text p-animation"
                    v-animate="'fadeInDown'"
                    loading="lazy"
                    :src="imgurl + 'bt3-1.png'"
                />
                <img class="u-title-bg p-animation" v-animate="`fadeIn`" loading="lazy" :src="imgurl + 'bt-0.png'" />
            </div>
            <div class="m-dz">
                <img
                    loading="lazy"
                    class="u-dz-item"
                    v-for="(item, index) in dzJumpUrlArr"
                    :key="index"
                    @click="openNewWindow(item)"
                    :src="imgurl + `dz${index + 1}.png`"
                />
            </div>
            <!-- 剑踪幻域 -->
            <div class="m-content-title" style="margin-top: 19.2%">
                <img
                    class="u-title-index p-animation"
                    v-animate="'fadeInUp'"
                    loading="lazy"
                    :src="imgurl + 'bt4-2.png'"
                />
                <img
                    class="u-title-text p-animation"
                    v-animate="'fadeInDown'"
                    loading="lazy"
                    :src="imgurl + 'bt4-1.png'"
                />
                <img class="u-title-bg p-animation" v-animate="`fadeIn`" loading="lazy" :src="imgurl + 'bt-0.png'" />
            </div>
            <div class="m-jzhy">
                <img class="u-jzhy-bt" loading="lazy" :src="imgurl + `jzhy-bt.png`" />
                <img class="u-jzhy-bg" loading="lazy" :src="imgurl + `jzhy-bg.png`" />

                <div class="u-jzhy-bt-item-container">
                    <img
                        v-for="index in 3"
                        :key="index"
                        class="u-jzhy-bt-item"
                        :class="{
                            itemHover: jzhyMoveClass,
                            isHover: jzhyMoveClass === `u-jzhy-bt-item${index}`,
                        }"
                        @mouseenter="jzhyMoveClass = `u-jzhy-bt-item${index}`"
                        @mouseleave="jzhyMoveClass = ''"
                        loading="lazy"
                        :src="imgurl + `jzhy-bt${index}.png`"
                    />
                </div>

                <div class="u-jzhy-wz-item-container">
                    <img
                        class="u-jzhy-wz-item p-animation"
                        v-animate="'fadeInUp'"
                        loading="lazy"
                        :src="imgurl + `jzhy-wz1.png`"
                        v-if="jzhyMoveClass === 'u-jzhy-bt-item1'"
                    />
                    <img
                        class="u-jzhy-wz-item p-animation"
                        v-animate="'fadeInUp'"
                        loading="lazy"
                        :src="imgurl + `jzhy-wz2.png`"
                        v-if="jzhyMoveClass === 'u-jzhy-bt-item2'"
                    />

                    <img
                        class="u-jzhy-wz-item p-animation"
                        v-animate="'fadeInUp'"
                        loading="lazy"
                        :src="imgurl + `jzhy-wz3.png`"
                        v-if="jzhyMoveClass === 'u-jzhy-bt-item3'"
                    />
                </div>
            </div>
            <!-- 阵营更新 -->
            <div class="m-content-title" style="margin-top: 14.7%">
                <img
                    class="u-title-index p-animation"
                    v-animate="'fadeInUp'"
                    loading="lazy"
                    :src="imgurl + 'bt5-2.png'"
                />
                <img
                    class="u-title-text p-animation"
                    v-animate="'fadeInDown'"
                    loading="lazy"
                    :src="imgurl + 'bt5-1.png'"
                />
                <img class="u-title-bg p-animation" v-animate="`fadeIn`" loading="lazy" :src="imgurl + 'bt-0.png'" />
            </div>
            <div class="m-zy">
                <!-- <img class="" loading="lazy" :src="imgurl + 'bt5-2.png'" /> -->
                <el-carousel ref="zyCarouselRef" indicator-position="outside" arrow="never" @change="zyCarouselChange">
                    <el-carousel-item v-for="index in 3" :key="index">
                        <img loading="lazy" :src="imgurl + `zy-${index}.png`" />
                    </el-carousel-item>
                </el-carousel>
                <img class="u-arrow" loading="lazy" :src="imgurl + 'jt3.png'" />
                <div class="u-zy-wz-container">
                    <img
                        class="u-zy-wz p-animation"
                        v-animate="'fadeInUp'"
                        :key="'zy-0'"
                        v-if="zyCarouselIndex === 0"
                        loading="lazy"
                        :src="imgurl + 'zy1-3.png'"
                    />
                    <img
                        class="u-zy-wz p-animation"
                        v-animate="'fadeInUp'"
                        :key="'zy-1'"
                        v-if="zyCarouselIndex === 1"
                        loading="lazy"
                        :src="imgurl + 'zy2-3.png'"
                    />
                    <img
                        class="u-zy-wz p-animation"
                        v-animate="'fadeInUp'"
                        :key="'zy-2'"
                        v-if="zyCarouselIndex === 2"
                        loading="lazy"
                        :src="imgurl + 'zy3-3.png'"
                    />
                </div>
                <img
                    class="u-zy-tip"
                    v-animate="`initialEffect`"
                    loading="lazy"
                    :src="imgurl + `zy${zyCarouselIndex + 1}-1.png`"
                />
                <img class="u-arrow" @click="$refs.zyCarouselRef.next()" loading="lazy" :src="imgurl + 'jt3.png'" />
                <img class="u-zy-bg" loading="lazy" :src="imgurl + 'zy-bg.png'" />
            </div>
            <!-- 新奇遇 -->
            <div class="m-content-title" style="margin-top: 18.2%">
                <img
                    class="u-title-index p-animation"
                    v-animate="'fadeInUp'"
                    loading="lazy"
                    :src="imgurl + 'bt6-2.png'"
                />
                <img
                    class="u-title-text p-animation"
                    v-animate="'fadeInDown'"
                    loading="lazy"
                    :src="imgurl + 'bt6-1.png'"
                />
                <img class="u-title-bg p-animation" v-animate="`fadeIn`" loading="lazy" :src="imgurl + 'bt-0.png'" />
            </div>
            <div class="m-qy">
                <img
                    v-for="(item, index) in qyJumpUrlArr"
                    :key="index"
                    @click="openNewWindow(item)"
                    class="u-qy-item"
                    loading="lazy"
                    :src="imgurl + `qy${index + 1}.png`"
                />
            </div>
            <!-- 更多精彩 -->
            <div class="m-content-title" style="margin-top: 18.2%">
                <img
                    class="u-title-index p-animation"
                    v-animate="'fadeInUp'"
                    loading="lazy"
                    :src="imgurl + 'bt7-2.png'"
                />
                <img
                    class="u-title-text p-animation"
                    v-animate="'fadeInDown'"
                    loading="lazy"
                    :src="imgurl + 'bt7-1.png'"
                />
                <img class="u-title-bg p-animation" v-animate="`fadeIn`" loading="lazy" :src="imgurl + 'bt-0.png'" />
            </div>
            <div class="m-more">
                <div class="m-more-item">
                    <img
                        class="u-more-bg p-animation"
                        v-animate="'fadeInRight'"
                        loading="lazy"
                        :src="imgurl + 'xk1.png'"
                    />
                    <img
                        class="u-more-title p-animation"
                        v-animate="'fadeInLeft'"
                        loading="lazy"
                        :src="imgurl + 'xk2.png'"
                    />
                    <img
                        class="u-more-tip p-animation"
                        v-animate="'fadeInLeft'"
                        loading="lazy"
                        :src="imgurl + 'xk3.png'"
                    />
                </div>
                <div class="m-more-item">
                    <img
                        class="u-more-bg p-animation"
                        v-animate="`fadeInLeft`"
                        loading="lazy"
                        :src="imgurl + 'sh1.png'"
                    />
                    <img
                        class="u-more-title p-animation"
                        v-animate="'fadeInRight'"
                        loading="lazy"
                        :src="imgurl + 'sh2.png'"
                    />
                    <img
                        class="u-more-tip p-animation"
                        v-animate="'fadeInRight'"
                        loading="lazy"
                        :src="imgurl + 'sh3.png'"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const KEY = "jiandanqinxin";
export default {
    name: "Index",
    props: [],
    components: {},
    data: function () {
        return {
            imgurl: `https://cdn.jx3box.com/design/topic/${KEY}/`,

            cgAddClassStatus: false,
            dzJumpUrlArr: [
                "https://www.jx3box.com/fb/31227",
                "https://www.jx3box.com/fb/31223",
                "https://www.jx3box.com/fb/31220",
                "https://www.jx3box.com/fb/31222",
                "https://www.jx3box.com/fb/31226",
            ],
            qyJumpUrlArr: [
                "https://www.jx3box.com/cj/view/5179",
                "https://www.jx3box.com/cj/view/5187",
                "https://www.jx3box.com/cj/view/9732",
            ],
            jzhyMoveClass: "",
            xlCarouselIndex: 0,
            zyCarouselIndex: 0,
        };
    },
    directives: {
        animate: {
            inserted: function (el, binding) {
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
            unbind: function (el, binding) {
                if (binding.addClass) {
                    window.removeEventListener("scroll", binding.addClass);
                }
            },
        },
    },
    computed: {},
    watch: {},
    methods: {
        addCgClass() {
            this.cgAddClassStatus = true;
        },
        xlCarouselChange(index) {
            this.xlCarouselIndex = index;
        },
        zyCarouselChange(index) {
            this.zyCarouselIndex = index;
        },
        openNewWindow(url) {
            window.open(url, "_blank");
        },
    },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/topic/jiandanqinxin/index.less";
</style>
