<template>
    <div class="m-content-title" :style="`margin-top: ${marginTop}`">
        <img
            class="u-title-index p-animation"
            v-animate="'fadeInUp'"
            loading="lazy"
            :src="imgurl + `bt${titleIndex}-2.png`"
        />
        <img
            class="u-title-text p-animation"
            v-animate="'fadeInDown'"
            loading="lazy"
            :src="imgurl + `bt${titleIndex}-1.png`"
        />
        <img class="u-title-bg p-animation" v-animate="`fadeIn`" loading="lazy" :src="imgurl + 'bt-0.png'" />
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    inject: ["imgurl"],
    props: {
        titleIndex: {
            type: String,
        },
        marginTop: {
            type: String,
            default: "",
        },
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
};
</script>
<style scoped lang="less">
.m-content-title {
    position: relative;
    .u-title-index {
        margin: 0 auto;
        width: 25%;
        position: relative;
        z-index: 1;
        display: block;
    }
    .u-title-text {
        margin: 0 auto;
        width: 63%;
        position: relative;
        z-index: 1;
        display: block;
    }
    .u-title-bg {
        position: absolute;
        left: 0;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
        z-index: 0;
        pointer-events: none;
    }
}
</style>
