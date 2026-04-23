<template>
    <div class="m-three" :style="{ minHeight: height }">
        <div class="m-stack">
            <section class="u-item" v-for="slideIndex in 5" :key="slideIndex">
                <template v-if="slideIndex == 1">
                    <img :src="`${img}home_03_0${slideIndex}.png`" class="u-img p-animation fadeIn" />
                    <img :src="`${img}home_03_txt.png`" class="u-txt p-animation fadeIn" />
                </template>
                <template v-else>
                    <img :src="`${img}home_03_0${slideIndex}_num.png`" class="u-num p-animation fadeIn" />
                    <img :src="`${img}home_03_0${slideIndex}.png`" class="p-animation fadeInRight" />
                    <img
                        :src="`${img}home_03_0${slideIndex}_people.png`"
                        class="u-people p-animation fadeInLeft"
                        :class="`u-people-${slideIndex}`"
                    />
                </template>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    name: "threeView",
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
.m-three {
    min-height: 800px;
    background-image: url("@{kv_bashufengyun}home_03_bg.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    .m-stack {
        .w(100%);
        .u-item {
            .pr;
            min-height: 800px;
            overflow: hidden;
            .u-txt {
                .pa;
                .lt(50%);
                margin: -135px 0 0 -475px;
            }
            .u-num {
                .pa;
                .lt(0);
                .z(-2);
            }
            .u-img {
                height: 100%;
            }
        }
        .u-people {
            .pa;
            .lt(50%);
            .z(-1);
            &.u-people-2 {
                margin: -400px 0 0 -648px;
            }
            &.u-people-3 {
                margin: -328px 0 0 -618px;
            }
            &.u-people-4 {
                margin: -308px 0 0 -618px;
            }
            &.u-people-5 {
                margin: -328px 0 0 -568px;
            }
        }
    }
}
</style>
