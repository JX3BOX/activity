<template>
    <div class="m-five">
        <img :src="`${img}title5-1.png`" class="u-title-1 p-animation" v-animate="'fadeInDown'" />
        <img :src="`${img}title5-2.png`" class="u-title-2 p-animation" v-animate="'fadeInDown'" />
        <div class="m-stack">
            <img :src="`${img}v1.png`" class="u-arrow p-animation fadeIn" :class="{ 'is-disabled': currentIndex === 0 }" @click="onPrev" />
            <el-carousel
                ref="carousel"
                class="u-carousel"
                :autoplay="false"
                :loop="false"
                height="756px"
                indicator-position="none"
                arrow="never"
                @change="onCarouselChange"
            >
                <el-carousel-item v-for="item in 4" :key="item">
                    <img :src="`${img}boss5-${item}.png`" class="p-animation fadeIn" />
                </el-carousel-item>
            </el-carousel>
            <img :src="`${img}v2.png`" class="u-arrow p-animation fadeIn" :class="{ 'is-disabled': currentIndex === 3 }" @click="onNext" />
        </div>
    </div>
</template>
<script>
export default {
    name: "fiveView",
    props: ["moduleData"],
    directives: {
        animate: {
            mounted: function (el, binding) {
                binding.addClass = () => {
                    const { top } = el.getBoundingClientRect();
                    const h = document.documentElement.clientHeight || document.body.clientHeight;
                    if (top < h) {
                        if (el.className.indexOf(binding.value) == -1) {
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
    data() {
        return {
            currentIndex: 0,
        };
    },
    methods: {
        onCarouselChange(index) {
            this.currentIndex = index;
        },
        onPrev() {
            if (this.currentIndex > 0) {
                this.$refs.carousel.prev();
            }
        },
        onNext() {
            if (this.currentIndex < 3) {
                this.$refs.carousel.next();
            }
        },
    },
    computed: {
        img() {
            return this.moduleData.img;
        },
    },
};
</script>
<style lang="less">
.m-five {
    height: 1227px;
    background-image: url("@{kv_bashufengyun}bg5.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 172px;
    .u-title-1 {
        width: 330px;
        margin: 0 auto;
    }
    .u-title-2 {
        width: 528px;
        margin: 0 auto;
        animation-delay: 0.3s;
    }
    .m-stack {
        display: flex;
        align-items: center;
        justify-content: center;
        .u-carousel {
            width: 1515px;
        }
        .u-arrow{
            width: 104px;
            cursor: pointer;
            &.is-disabled {
                opacity: 0.3 !important;
                cursor: not-allowed;
            }
        }
    }
}
</style>
