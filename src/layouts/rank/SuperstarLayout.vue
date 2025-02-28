<template>
    <div class="m-superstar-info">
        <div class="m-superstar-kv-title"><img :src="imgurl + 'kv/kv-title.png'" /></div>
        <!-- 活动主体部分 -->
        <div class="m-superstar-main">
            <div class="u-menu">
                <div
                    v-for="(item, index) in menu"
                    :key="item.key"
                    class="u-menu-item"
                    :class="[item.noEnable ? 'no-enable' : '', index == menuActive ? 'actived' : '']"
                    @click="menuClick(item, index)"
                >
                    <router-link :to="link(item.key)" v-if="!item.noEnable">
                        <img :src="imgurl + (index == menuActive ? item.active : item.img)"
                    /></router-link>
                    <img :src="imgurl + (index == menuActive ? item.active : item.img)" v-else />
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { getEvent } from "@/service/rank/event.js";
export default {
    name: "SuperstarInfo",
    components: {},
    data: function () {
        return {
            imgurl: "https://img.jx3box.com/topic/menpaitiantuan/",
            menu: [
                {
                    name: "活动介绍",
                    img: "biaoqianye/hdjs.png",
                    active: "biaoqianye/hdjs-active.png",
                    key: "introduce",
                },
                { name: "报名", img: "biaoqianye/bm.jpg", active: "biaoqianye/bm-active.jpg", key: "join" },
                { name: "天团榜", img: "biaoqianye/ttb.jpg", active: "biaoqianye/ttb-active.jpg", key: "list" },
                {
                    name: "数据榜",
                    img: "biaoqianye/sjb.jpg",
                    active: "biaoqianye/sjb-active.jpg",
                    key: "dps",
                },
                {
                    name: "视频集锦",
                    img: "biaoqianye/spjj.jpg",
                    active: "biaoqianye/spjj-active.jpg",
                    key: "video",
                },
            ],
            menuActive: 0,
        };
    },
    computed: {
        id: function () {
            return this.$route.params.id || 0;
        },
    },
    created() {
        let i = this.menu.findIndex((item) => item.key == this.$route.name);
        this.menuActive = i;
        this.$store.state.id = this.id || 0;
        this.init();
    },
    methods: {
        link: function (val) {
            return "/" + this.id + "/" + val;
        },
        menuClick(item, index) {
            if (item.noEnable) return;
            this.menuActive = index;
        },
        init: function () {
            getEvent(this.id).then((res) => {
                this.data = res.data.data;
                this.$store.state.achieves = res.data.data.boss_map;
                this.$store.state.race = res.data.data;
            });
        },
    },
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/rank/superstar/index.less";
</style>
