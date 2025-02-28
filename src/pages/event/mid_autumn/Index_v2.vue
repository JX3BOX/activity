<!--
 * @Author: zhusha
 * @Date: 2024-08-14 20:17:51
 * @LastEditors: zhusha
 * @LastEditTime: 2024-08-20 20:41:44
 * @Description: 中秋诗词专题PAGE4设计稿
 *
 * Copyright (c) 2024 by zhusha, email: no email, All Rights Reserved.
-->
<template>
    <div class="p-event-midAutumn" @click="goToDetail">
        <!-- 首页展示 -->
        <div class="m-box">
            <video
                class="u-video"
                src="https://cdn.jx3box.com/design/miniprogram/midautumn/zhongqiu2024.mp4"
                :poster="`${__imgRoot}tittle.png`"
                autoplay
                loop
                muted="false"
                object-fit="cover"
            ></video>

            <img class="u-title" :src="`${__imgRoot}tittle.png`" alt=""/>
        </div>
    </div>
</template>

<script>
export default {
    name: "Index",
    inject: ["__imgRoot"],
    components: {},
    data: function () {
        return {};
    },
    computed: {},

    methods: {
        goToDetail() {
            // this.$router.push({
            //     query: {
            //         a: 1,
            //     },
            // });
            this.$router.push({
                path: "detail",
                query: {
                    a: 2,
                },
            });
        },
    },
    mounted() {},
};
</script>

<style lang="less">
@import "~@/assets/css/event/midautumn/v2/index.less";
</style>
