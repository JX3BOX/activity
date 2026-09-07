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
        <div class="u-content" v-html="articleHtml"></div>
        <!-- <div class="u-tips">介<br />绍</div> -->
        <!-- <img class="u-qrcode" src="@/assets/img/event/mid_autumn_qrcode.png" alt="" /> -->
    </div>
</template>

<script>
import articleMixin from "../mixins/article";
export default {
    mixins: [articleMixin],
    props: {
        years: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        year() {
            return this.$route.params.year || new Date().getFullYear();
        },
        articleId() {
            return this.years.find((item) => item.year == this.year)?.intro_id || 0;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/midautumn/v2/introduce.less";
</style>
