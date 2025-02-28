<!--
 * @Author: zhusha
 * @Date: 2024-06-23 22:12:15
 * @LastEditors: zhusha
 * @LastEditTime: 2024-07-10 12:25:51
 * @Description: 报名
 * @FilePath: \JX3box\rank\src\views\Superstar\SignUp.vue
 *
 * Copyright (c) 2024 by zhusha, email: no email, All Rights Reserved.
-->
<template>
    <div class="m-sign-up">
        <div class="u-shadow">
            <!-- 顶部 -->
            <div class="u-top">
                <img :src="imgurl + 'top.jpg'" />
                <div class="u-title">
                    <img :src="imgurl + 'baoming/bm.png'" width="86.5" />
                </div>
            </div>
            <!-- 中间部 -->
            <div class="u-center">
                <!-- 报名按钮 -->/rank
                <!-- <div class="u-sign-up-btn">
                    <router-link :to="link('join')"><img :src="imgurl + 'baoming/bm-1.png'" width="191" /></router-link>
                </div> -->
            </div>
            <!-- 底部 -->
            <div class="u-bottom">
                <img :src="imgurl + 'bottom.jpg'" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            imgurl: "https://img.jx3box.com/topic/menpaitiantuan/",
        };
    },
    computed: {
        id: function () {
            return this.$route.params.id;
        },
        desc: function () {
            return this.$store.state.race.desc;
        },
    },
    created() {},
    mounted() {},
    methods: {
        link: function (val) {
            return "/" + this.id + "/" + val;
        },
    },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/rank/superstar/signup.less";
@import "~@/assets/css/rank/superstar/text.less";
</style>
