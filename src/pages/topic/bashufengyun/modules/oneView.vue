<template>
    <div class="m-one" :style="{ height }">
        <div class="u-item">
            <img class="u-fire p-animation fadeIn" :src="`${img}home_01_fire.png`" />
            <img class="u-txt p-animation fadeIn" :src="`${img}home_01_txt.png`" />
        </div>
    </div>
</template>
<script>
export default {
    name: "oneView",
    props: ["moduleData"],
    data: function () {
        return {};
    },
    computed: {
        img() {
            return this.moduleData?.img;
        },
        height() {
            return this.moduleData?.height;
        },
    },
};
</script>
<style lang="less">
.m-one {
    background-image: url("@{kv_bashufengyun}home_01_bg.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    .u-item {
        .pr;
        .full;
        .flex;
        align-items: center;
        justify-content: center;
        .u-fire {
            .pa;
            .rb(0);
        }
    }
}
</style>
