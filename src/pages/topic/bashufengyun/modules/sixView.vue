<template>
    <div class="m-six">
        <img class="u-title-1 p-animation" v-animate="'fadeInDown'" :src="`${img}title6-1.png`" />
        <img class="u-title-2 p-animation" v-animate="'fadeInDown'" :src="`${img}title6-2.png`" />

        <div class="m-stack">
            <img :src="`${img}v1.png`" class="u-arrow p-animation fadeIn" :class="{ 'is-disabled': currentIndex === 0 }" @click="onPrev" />
            <el-carousel
                ref="carousel"
                class="u-carousel"
                :autoplay="false"
                :loop="false"
                height="740px"
                indicator-position="none"
                arrow="never"
                @change="onCarouselChange"
            >
                <el-carousel-item v-for="item in 4" :key="item">
                    <img :src="`${img}boss6-${item}.png`" class="p-animation fadeIn" />
                </el-carousel-item>
            </el-carousel>
            <img :src="`${img}v2.png`" class="u-arrow p-animation fadeIn" :class="{ 'is-disabled': currentIndex === 3 }" @click="onNext" />
        </div>
    </div>
</template>
<script>
export default {
    name: "sixView",
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
        height() {
            return this.moduleData.height;
        },
    },
};
</script>
<style lang="less">
.m-six {
    .pr;
    background-image: url("@{kv_bashufengyun}bg6.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 458px;
    padding: 458px 0 119px;
    .u-title-1 {
        width: 358px;
        margin: 0 auto;
        animation-delay: 0.3s;
    }
    .u-title-2 {
        width: 382px;
        margin: 13px auto 0;
    }

    .m-stack {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 45px;
        .u-carousel {
            width: 1400px;
        }
        .u-arrow {
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
