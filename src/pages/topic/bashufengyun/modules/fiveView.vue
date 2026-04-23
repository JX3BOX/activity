<template>
    <div class="m-five" :style="{ minHeight: height }">
        <div class="m-stack">
            <section class="u-item" v-for="slideIndex in 6" :key="slideIndex">
                <template v-if="slideIndex == 1">
                    <img :src="`${img}home_05.png`" class="u-img p-animation fadeIn" />
                    <img :src="`${img}home_05_txt.png`" class="u-txt p-animation fadeIn" />
                </template>
                <template v-else>
                    <img
                        :src="`${img}home_05_0${slideIndex}.png`"
                        class="u-cont p-animation fadeIn"
                        :class="`u-cont-${slideIndex}`"
                    />
                </template>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    name: "fiveView",
    props: ["moduleData"],
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
.m-five {
    min-height: 800px;
    background-image: url("@{kv_bashufengyun}home_05_bg.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    .m-stack {
        .w(100%);
        .u-item {
            .pr;
            min-height: 800px;
            overflow: hidden;
            .u-img {
                height: 100%;
            }
            .u-txt {
                .pa;
                .lt(50%);
                margin: -400px 0 0 -999px;
            }
            .u-num {
                .pa;
                .lt(0);
                .z(-2);
            }
        }
        .u-cont {
            .pa;
            .lt(50%);
            .z(-1);
            &.u-cont-2 {
                margin: -172px 0 0 -540px;
            }
            &.u-cont-3 {
                margin: -330px 0 0 -420px;
            }
            &.u-cont-4 {
                margin: -333px 0 0 -405px;
            }
            &.u-cont-5 {
                margin: -335px 0 0 -440px;
            }
            &.u-cont-6 {
                margin: -335px 0 0 -467px;
            }
        }
    }
}
</style>
