<template>
    <div class="m-btn" @click="$emit('click')">
        <img class="m-btn_backdrop" :src="getCdnLink('design/rank/seven/btn_backdrop.png')" />
        <slot></slot>
    </div>
</template>

<script>
import {getCdnLink} from "@/utils";
export default {
    name: "global_btn",
    props: [],
    data: function () {
        return {};
    },
    computed: {},
    methods: {
        getCdnLink,
    },
};
</script>
<style lang="less" scoped>
.m-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 168px;
    height: 82px;
    background: #2e2e2e;
    border: 1px solid #ffffff;
    font-family: "Microsoft YaHei";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    color: #ffffff;
    cursor: pointer;
    .m-btn_backdrop {
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0.1;
    }
}
</style>
