<template>
    <div class="m-rank-container p-rank-default-layout" :class="routeClass">
        <CommonHeader></CommonHeader>
        <div class="m-rank-main">
            <a class="m-rank-header" href="/rank">
                <img class="m-rank-logo" :src="LOGO" />
            </a>
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
    computed: {
        routeClass: function () {
            return "p-rank-" + this.$route.name;
        },
    },
    methods: {},
    mounted: function () {},
    components: {},
};
</script>

<style lang="less">
.p-rank-default-layout {
    background: url("@{img}image/rank/common/bg_back.png?12") center top repeat-x;
    padding: 0;
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

    .m-rank-header {
        .x;
    }
    .m-rank-logo {
        margin: 0 auto;
        display: block;
        margin-top: 40px;
        max-width: min(100%, 520px);
    }
}
@media screen and (max-width: @phone) {
    .m-rank-logo {
        margin-top: 24px;
        max-width: min(100%, 320px);
    }
}

.v-miniprogram{
    .m-rank-logo{
        .none;
    }
}
</style>
