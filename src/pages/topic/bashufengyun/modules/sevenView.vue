<template>
    <div class="m-seven">
        <img class="u-title-1 p-animation" v-animate="'zoomInFull'" :src="`${img}title7.png`" />
        <img class="u-box-logo p-animation fadeIn" :src="`${img}box-logo.png`" />
    </div>
</template>
<script>
export default {
    name: "sevenView",
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
        height() {
            return this.moduleData.height;
        },
    },
};
</script>
<style lang="less">
.m-seven {
    margin-top: -44px;
    .pr;
    background-image: url("@{kv_bashufengyun}bg7.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 411px 0 137px;
    .u-title-1 {
        width: 451px;
        margin: 0 auto;
        animation-duration: 0.5s;
    }
    .u-box-logo {
        width: 330px;
        margin: 152px auto 0;
    }
}
@keyframes zoomInFull {
    0% {
        opacity: 0;
        transform: scale(0);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
.zoomInFull {
    animation-name: zoomInFull;
}
</style>
