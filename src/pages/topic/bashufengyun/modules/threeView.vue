<template>
    <div class="m-three">
        <img :src="`${img}title3.png`" class="u-title p-animation" v-animate="'fadeInDown'" />
        <img :src="`${img}tangmen0.png`" class="u-title-bg p-animation fadeIn" />
        <div class="m-stack">
            <div class="u-item u-left">
                <img :src="`${img}tangmen2.png`" class="u-img p-animation fadeIn" />
                <img :src="`${img}xinfa1-a.png`" class="u-img-a p-animation" v-animate="'fadeInLeft'" />
                <img :src="`${img}xinfa1-b.png`" class="u-img-b p-animation fadeIn" />
            </div>
            <div class="u-item u-right">
                <img :src="`${img}tangmrn3.png`" class="u-img p-animation fadeIn" />
                <img :src="`${img}xinfa2-a.png`" class="u-img-a p-animation" v-animate="'fadeInRight'" />
                <img :src="`${img}xinfa2-b.png`" class="u-img-b p-animation fadeIn" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "threeView",
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
    computed: {
        img() {
            return this.moduleData.img;
        },
    },
};
</script>
<style lang="less">
.m-three {
    min-height: 800px;
    background-image: url("@{kv_bashufengyun}bg3.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    padding-top: 102px;
    .u-title {
        width: 500px;
        margin: 0 auto;
        z-index: 1;
        position: relative;
    }
    .u-title-bg {
        position: absolute;
        top: 36px;
        left: 50%;
        transform: translateX(-50%);
        width: 706px;
        z-index: 0;
    }
    .m-stack {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 131px;
        padding-bottom: 81px;
        .u-item {
            position: relative;
            .u-img {
                width: 755px;
                animation-duration: 1s;
            }
            &.u-left {
                .u-img-a {
                    position: absolute;
                    width: 304px;
                    top: 16px;
                    right: 159px;
                }
                .u-img-b {
                    position: absolute;
                    top: -19px;
                    left: -284px;
                    width: 600px;
                }
            }
            &.u-right {
                margin-left: -160px;
                .u-img-a {
                    position: absolute;
                    width: 304px;
                    top: 16px;
                    left: 143px;
                }
                .u-img-b {
                    position: absolute;
                    top: -19px;
                    right: -268px;
                    width: 600px;
                }
            }
        }
    }
}
</style>
