<!--
 * @Author: zhusha
 * @Date: 2024-08-10 00:33:37
 * @LastEditors: zhusha
 * @LastEditTime: 2024-08-20 16:54:46
 * @Description: 活动介绍
 *
 * Copyright (c) 2024 by zhusha, email: no email, All Rights Reserved.
-->
<template>
    <div class="c-midAutumn-introduce">
        <div class="u-content" v-html="data">
            <!-- <div v-for="item in data" :key="item.id" v-html="item.desc"></div> -->
        </div>
        <div class="u-tips">介<br />绍</div>
    </div>
</template>

<script>
import { getArticle } from "@jx3box/jx3box-common/js/api_misc";
export default {
    // props: {
    //     data: {
    //         type: Array,
    //         default: () => [],
    //     },
    // },
    components: {},
    data() {
        return {
            data : ''
        };
    },
    created() {},
    mounted() {
        getArticle(85620).then((data) => {
            this.data = data;
        });
    },
    methods: {},
};
</script>

<style lang="less">
@import "~@/assets/css/event/midautumn/v2/introduce.less";
</style>
