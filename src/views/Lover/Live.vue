<template>
    <div class="m-lover-page m-lover-live wp">
        <div class="u-page-title">
            <img class="u-img" :src="`${__imgRoot}live-title.png`" />
        </div>
        <div class="m-line-box">
            <div class="m-box">正在比赛队伍：</div>
        </div>
        <div class="m-line-box m-live-box">
            <div class="m-box">
                <iframe :src="live_url" frameborder="0"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoverLive",
    inject: ["__imgRoot"],
    data: function () {
        return {
            live_url: "",
        };
    },
    computed: {
        id: function () {
            return this.$store.state.loverId || 1;
        },
    },
    methods: {},
};
</script>
<style lang="less">
.m-lover-live {
    .w(1240px);
    .auto(x);
    .m-line-box .m-box {
        .fz(16px,2);
        color: #fff;
    }
    .m-live-box {
        .m-box {
            min-height: 500px;
        }
    }
}
</style>
