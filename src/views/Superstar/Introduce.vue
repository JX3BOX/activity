<!--
 * @Author: zhusha
 * @Date: 2024-06-23 14:37:08
 * @LastEditors: zhusha
 * @LastEditTime: 2024-07-10 10:10:23
 * @Description: 活动介绍
 * @FilePath: \JX3box\rank\src\views\Superstar\Introduce.vue
 *
 * Copyright (c) 2024 by zhusha, email: no email, All Rights Reserved.
-->
<template>
    <div class="m-introduce">
        <div class="u-shadow">
            <!-- 顶部 -->
            <div class="u-top">
                <img :src="imgurl + 'top.jpg'" />
                <div class="u-title">
                    <img :src="imgurl + 'huodonguize/hdgz.png'" width="185.5" />
                </div>
            </div>
            <!-- 中间部 -->
            <div class="u-center">
                <div class="m-superstar-introduce-info" v-html="superstar_desc"></div>
                <!-- <div class="u-events-bg">
                    <img :src="imgurl + 'huodongjieshao/hd-bg-1.png'" width="99.5" />
                </div>
                <div class="u-text">
                    为了给玩家们更多的展示平台，魔盒将在每年的夏季进行门派天团活动，用于展示玩家们更强的技艺。
                </div>
                <div class="u-text">
                    恰逢无界移动端的开启与120等级的末尾，不仅是让玩家们展示门派天团的风采，更时纳新的好时机。
                </div>
                <div class="u-events-aim">
                    <img :src="imgurl + 'huodongjieshao/md-yy.png'" width="99.5" />
                </div>
                <div class="u-text">1，给玩家们一个可以同台竞技的舞台</div>
                <div class="u-text">2，在等级末期给玩家获取装备的动力，用以提高活跃度</div>
                <div class="u-text">3，提高各心法门派玩家的凝聚力</div> -->
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
        superstar_desc: function () {
            return this.$store.state.race.superstar_desc;
        },
    },
    created() {},
    mounted() {},
    methods: {},
};
</script>

<style lang="less">
@import "~@/assets/css/rank/superstar/introduce.less";
@import "~@/assets/css/rank/superstar/text.less";
</style>
