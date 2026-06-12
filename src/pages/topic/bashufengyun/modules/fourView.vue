<template>
    <div class="m-four">
        <img :src="`${img}title4-1.png`" class="u-title-1 p-animation" v-animate="'fadeInDown'" />
        <img :src="`${img}title4-2.png`" class="u-title-2 p-animation" v-animate="'fadeInDown'" />
        <div class="m-stack">
            <img :src="`${img}boss4-1.png`" class="u-boss-1 p-animation" v-animate="'fadeInLeft'" />
            <img :src="`${img}boss4-2.png`" class="u-boss-2 p-animation" v-animate="'fadeInRight'" />
        </div>
        <div class="u-txt p-animation fadeIn">
            天南大侠与星宿老仙携手设下生死擂台一一龙渊泽之擂，并以各种珍奇秘宝、神兵利刃作为攻擂豪礼邀群侠论剑。<br />
            各路武林中人集于此地争宝，连绵激战之下，巨擘挫败小卒成 名之事不胜枚举. 龙渊泽之擂即将再次广邀群侠,<br />
            是魂落野岭，亦或是江湖成名？ <br />
            侠士们在新赛季「巴蜀风云」开启后前去一试便知。
        </div>
    </div>
</template>
<script>
export default {
    name: "fourView",
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
.m-four {
    height: 1431px;
    background-image: url("@{kv_bashufengyun}bg4.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 178px;
    .u-title-1 {
        width: 330px;
        margin: 0 auto;
    }
    .u-title-2 {
        width: 300px;
        margin: 20px auto 0;
        animation-delay: 0.3s;
    }
    .m-stack {
        display: flex;
        justify-content: center;
        .u-boss-1 {
            width: 772px;
            margin-top: 69px;
        }
        .u-boss-2 {
            width: 740px;
            margin-left: -94px;
        }
    }
    .u-txt {
        margin-top: 90px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        line-height: 32px;
    }
}
</style>
