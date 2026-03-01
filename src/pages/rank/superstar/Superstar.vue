<template>
    <div class="p-superstar">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
import { isApp } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Superstar",
    data: function () {
        return {};
    },

    computed: {},
    methods: {},
    mounted() {
        isApp() && localStorage.setItem("__env", "app");
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/superstar/index.less";
</style>
