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
        <div class="u-content" v-html="data"></div>
        <!-- <div class="u-tips">介<br />绍</div> -->
        <!-- <img class="u-qrcode" src="@/assets/img/event/mid_autumn_qrcode.png" alt="" /> -->
    </div>
</template>

<script>
import { getArticle } from "@jx3box/jx3box-common/js/api_misc";
export default {
    components: {},
    props: {
        years: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            data : ''
        };
    },
    computed: {
        year() {
            return this.$route.params.year || new Date().getFullYear();
        }
    },
    watch: {
        year: {
            handler: function (val) {
                const id = this.years.find((item) => item.year == this.year)?.intro_id || 0;
                if (!id) {
                    return;
                }
                getArticle(id).then((data) => {
                    this.data = data;
                });
            },
            immediate: true,
        }
    }
};
</script>

<style lang="less">
@import "~@/assets/css/event/midautumn/v2/introduce.less";
</style>
