<template>
    <div class="m-container" :style="{ zoom: pageZoom }">
        <img class="banner_kv" :src="buildImgUrl('KV/kv.jpg')" alt="丝路风语" />
        <!-- P1 -->
        <section class="m-instance">
            <img class="u-title" :src="buildImgUrl('1/tittle.png')" alt="" />
            <el-carousel
                ref="p1Carousel"
                height="746px"
                autoplay
                indicator-position="none"
                arrow="never"
                @change="onCarouselChange"
            >
                <el-carousel-item v-for="item in 4" :key="item">
                    <img :src="buildImgUrl(`1/${item}.jpg`)" />
                </el-carousel-item>
            </el-carousel>
            <div class="m-indicator">
                <div class="m-arrow" @click="prevSlide">
                    <img class="u-img" :src="buildImgUrl('1/arrow.svg')" alt="" />
                </div>
                <div
                    class="m-select"
                    v-for="item in 4"
                    :key="item"
                    :class="{ active: currentSlide === item - 1 }"
                    @click="goToSlide(item - 1)"
                >
                    <img class="u-select" :src="buildImgUrl('1/select.svg')" alt="" />
                    <img class="u-select-border" :src="buildImgUrl('1/select-border.svg')" alt="" />
                </div>
                <div class="m-arrow m-arrow-right" @click="nextSlide">
                    <img class="u-img" :src="buildImgUrl('1/arrow.svg')" alt="" />
                </div>
            </div>
            <img class="u-bg" :src="buildImgUrl('1/bg1.png')" alt="" />
        </section>
        <!-- P2 -->
        <section class="m-daily">
            <img class="u-title" :src="buildImgUrl('2/tittle.png')" alt="" />
            <div class="m-carousel-container">
                <svg
                    class="u-arrow u-arrow-left"
                    :class="{ dis: p2CurrentSlide === 0 }"
                    @click="p2PrevSlide"
                    viewBox="0 0 23 26"
                >
                    <path d="M22.5 12.9904L-6.8385e-07 -2.38717e-05L-1.81951e-06 25.9807L22.5 12.9904Z" />
                </svg>
                <el-carousel
                    ref="p2Carousel"
                    class="u-carousel"
                    :loop="false"
                    height="150px"
                    autoplay
                    indicator-position="none"
                    arrow="never"
                    @change="onP2CarouselChange"
                >
                    <el-carousel-item>
                        <img :src="buildImgUrl('2/content1.png')" />
                    </el-carousel-item>
                    <el-carousel-item>
                        <img :src="buildImgUrl('2/content2.png')" />
                    </el-carousel-item>
                </el-carousel>
                <svg class="u-arrow" :class="{ dis: p2CurrentSlide === 1 }" @click="p2NextSlide" viewBox="0 0 23 26">
                    <path d="M22.5 12.9904L-6.8385e-07 -2.38717e-05L-1.81951e-06 25.9807L22.5 12.9904Z" />
                </svg>
            </div>
        </section>
        <!-- P3 -->
        <section class="m-conference">
            <img class="u-top" :src="buildImgUrl('3/bg2.png')" alt="" />
            <img class="u-title" :src="buildImgUrl('3/tittle.png')" alt="" />
            <img class="u-bottom" :src="buildImgUrl('3/bg3.png')" alt="" />
        </section>
        <!-- P4 -->
        <section class="m-update">
            <img class="u-title" :src="buildImgUrl('4/tittle.png')" alt="" />
            <img class="u-content" :src="buildImgUrl('4/content.png')" alt="" />
            <img class="u-over" :src="buildImgUrl('4/over.png')" alt="" />
        </section>
    </div>
</template>

<script>
export default {
    name: "Index",
    inject: ["__imgRoot"],
    data() {
        return {
            currentSlide: 0,
            p2CurrentSlide: 0,
            pageZoom: 1,
        };
    },
    mounted() {
        this.calcZoom();
        window.addEventListener("resize", this.calcZoom);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.calcZoom);
    },
    methods: {
        calcZoom() {
            const width = window.innerWidth;
            this.pageZoom = width < 1920 ? width / 1920 : 1;
        },
        buildImgUrl(path) {
            return `${this.__imgRoot}${path}`;
        },
        onCarouselChange(current) {
            this.currentSlide = current;
        },
        prevSlide() {
            this.$refs.p1Carousel.prev();
        },
        nextSlide() {
            this.$refs.p1Carousel.next();
        },
        goToSlide(index) {
            this.$refs.p1Carousel.setActiveItem(index);
        },
        onP2CarouselChange(current) {
            this.p2CurrentSlide = current;
        },
        p2PrevSlide() {
            if (this.p2CurrentSlide > 0) {
                this.$refs.p2Carousel.prev();
            }
        },
        p2NextSlide() {
            if (this.p2CurrentSlide < 1) {
                this.$refs.p2Carousel.next();
            }
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/anyingqianji/index.less";
</style>
