<template>
    <div class="m-two">
        <div>
            <img :src="`${img}title2.png`" class="u-title p-animation" v-animate="'fadeInLeft'" />
            <div class="u-text p-animation" v-animate="'fadeInLeft'">
                全新门派「唐门」来袭！<br />唐门善使l弩箭和机关进行远距离战斗，<br />双心法分别拥有强大的单体爆发和群体输出能力。
            </div>
            <div class="u-video p-animation" v-animate="'fadeInLeft'" v-html="video"></div>

            <img :src="`${img}tangmen1.png`" class="u-img p-animation" v-animate="'fadeInRight'" />
        </div>
    </div>
</template>
<script>
export default {
    name: "twoView",
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
        index() {
            return this.moduleData.index;
        },
        video() {
            return `<iframe src="//player.bilibili.com/player.html?aid=513903294&bvid=BV17g41117o3&cid=786179224&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>`;
        },
    },
};
</script>
<style lang="less">
.m-two {
    background-image: url("@{kv_bashufengyun}bg2.jpg");
    height: 872px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    padding-left: 373px;
    position: relative;
    overflow: hidden;
    .u-title {
        width: 385px;
    }
    .u-text {
        color: #fff;
        text-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
        font-size: 20px;
        line-height: 30px;
    }
    .u-video {
        width: 640px;
        height: 360px;
        margin-top: 71px;
        position: relative;
        z-index: 1;
        iframe {
            width: 100%;
            height: 100%;
        }
    }
    .u-img {
        width: 1771px;
        height: 1456px;
        position: absolute;
        top: 0;
        left: 551px;
        z-index: 0;
    }
}
</style>
