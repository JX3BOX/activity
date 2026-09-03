<template>
    <div class="p-midautumn-detail_app" :style="{ backgroundImage: `url('${imgRoot}${year}/phone/bg2.jpg')` }">
        <div class="m-placeholder">活动介绍 · {{ year }} · {{ tab }}（待填充内容）</div>
    </div>
</template>

<script>
export default {
    name: "Info",
    props: {
        years: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        year() {
            return this.$route.query.year || "";
        },
        tab() {
            return this.$route.query.tab || "";
        },
    },
};
</script>

<style lang="less">
.p-midautumn-detail_app {
    background-size: cover;

    .m-placeholder {
        padding: 40vw 0;
        text-align: center;
        color: #fdf0cd;
        font-size: 4vw;
    }
}
</style>
