<template>
    <div class="m-rank-container p-rank-default-layout">
        <CommonHeader></CommonHeader>
        <div class="m-rank-primary">
            <div class="m-rank-header">
                <img class="m-rank-index__logo" :src="LOGO" />
            </div>
            <div class="m-rank-content">
                <slot></slot>
            </div>
        </div>
        <CommonFooter></CommonFooter>
    </div>
</template>

<script>
import PICS from "@/assets/js/pics.js";
export default {
    name: "RankDefaultLayout",
    props: [],
    data: function () {
        return {
            LOGO: PICS.LOGO,
        };
    },
    computed: {},
    methods: {},
    mounted: function () {},
    components: {},
};
</script>

<style lang="less">
.p-rank-default-layout {
    background: url("@{img}image/rank/common/bg_back.png?12") center top repeat-x;
    padding: 0 0 80px;
    position: relative;

    &::after {
        content: "";
        display: block;
        background-color: black;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
    }

    .m-rank-header{
        .x;
    }
    .m-rank-index__logo{
        margin:0 auto;
    }
}
</style>
