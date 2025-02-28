<template>
    <div class="m-title">
        <img class="u-no" :src="titleImgUrl" alt="01" />
        <img class="u-text" :src="subtitleImgUrl" alt="资料片预览" />
    </div>
</template>

<script>
export default {
    name: "Title",
    inject: ["__imgRoot"],
    props: {
        order: {
            type: Number,
            default: 0,
        },
    },
    components: {},
    data: function () {
        return {};
    },
    computed: {
        titleImgUrl() {
            return this.__imgRoot + "title/" + this.order + ".png";
        },
        subtitleImgUrl() {
            return this.__imgRoot + "subtitle/" + this.order + ".png";
        },
    },
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {},
};
</script>


<style lang="less">
.m-title{
    display: flex;
    align-items: center;
    justify-content: center;
    .u-no{
        margin-right: 20px;
    }
}
</style>
