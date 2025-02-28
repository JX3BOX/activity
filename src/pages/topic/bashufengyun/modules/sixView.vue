<template>
    <div class="m-six" :style="{ height }">
        <img class="u-txt p-animation fadeIn" :src="`${img}home_06_txt.png`" />
    </div>
</template>
<script>
export default {
    name: "sixView",
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
.m-six {
    .pr;
    background-image: url("@{kv_bashufengyun}home_06_bg.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    .u-txt {
        .pa;
        .lt(50%);
        margin: -164px 0 0 -450px;
    }
}
</style>
