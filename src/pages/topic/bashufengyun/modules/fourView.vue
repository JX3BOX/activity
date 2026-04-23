<template>
    <div class="m-four" :style="{ minHeight: height }">
        <div class="m-stack">
            <section class="u-item" v-for="slideIndex in 4" :key="slideIndex">
                <template v-if="slideIndex == 1">
                    <img :src="`${img}home_04_0${slideIndex}.png`" class="u-img p-animation fadeIn" />
                    <img :src="`${img}home_04_txt.png`" class="u-txt p-animation fadeIn" />
                </template>
                <template v-else>
                    <img
                        :src="`${img}home_04_0${slideIndex}.png`"
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
    name: "fourView",
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
.m-four {
    min-height: 800px;
    background-image: url("@{kv_bashufengyun}home_04_bg.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    .m-stack {
        .w(100%);
        .u-item {
            .pr;
            min-height: 800px;
            .flex;
            align-items: center;
            overflow: hidden;
            .u-img {
                height: 100%;
            }
            .u-txt {
                .pa;
                .lt(50%);
                margin: -400px 0 0 -920px;
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
                margin: -200px 0 0 -527px;
            }
            &.u-cont-3 {
                margin: -400px 0 0 -407px;
            }
            &.u-cont-4 {
                margin: -348px 0 0 -415px;
            }
        }
    }
}
</style>
