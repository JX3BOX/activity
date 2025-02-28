<template>
    <div class="p-superstar">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
// import store from "@/store/lover";
export default {
    name: "Superstar",
    data: function () {
        return {};
    },

    computed: {},
    methods: {},
    mounted() {},
};
</script>

<style lang="less">
@import "~@/assets/css/rank/superstar/index.less";
</style>
