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
            return this.$store.state.id;
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
