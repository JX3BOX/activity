<template>
    <div class="p-lover">
        <Header></Header>
        <div class="m-lover-kv">
            <div class="m-menus wp">
                <template v-for="item in 2">
                    <div class="m-menu" :key="item">
                        <router-link
                            :class="['u-menu', { active: item.key == page }]"
                            :to="{ name: item.key }"
                            v-for="item in group(item)"
                            :key="item.key"
                        >
                            {{ item.name }}
                        </router-link>
                    </div>
                </template>
            </div>
        </div>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import store from "@/pages/rank/lover/store";
export default {
    name: "Lover",
    data: function () {
        return {
            menus: [
                { name: "活动介绍", key: "info" },
                { name: "报名参赛", key: "join" },
                { name: "支持投票", key: "vote" },
                { name: "直播平台", key: "live" },
                { name: "赛事进程", key: "process" },
                { name: "相关活动", key: "activity" },
            ],
        };
    },
    provide: {
        __imgRoot: __imgPath + `image/lover/`,
    },
    computed: {
        page() {
            return this.$route?.name;
        },
    },
    methods: {
        group(i) {
            const data = {
                1: this.menus.slice(0, 3),
                2: this.menus.slice(3),
            };
            return data[i];
        },
    },
    mounted() {
        store.dispatch("loadLoverId");
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/lover/index.less";
</style>
