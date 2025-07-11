<template>
    <div class="p-lover">
        <Header></Header>
        <div class="m-lover-kv">
            <div class="m-menus wp">
                <template v-for="item in 2">
                    <div class="m-menu" :key="item">
                        <router-link
                            :class="['u-menu', { active: item.key == page }]"
                            :to="{ name: item.key, params: { slug: slug } }"
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
        slug() {
            return this.$store.state.slug || this.$store.getters.defaultEventSlug || "?";
        },
    },
    methods: {
        group(i) {
            return this.menus.slice((i - 1) * 3, i * 3);
        },
    },
    watch: {
        "$route.params.slug": function (newSlug) {
            store.commit("SET_SLUG", newSlug);
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/lover/index.less";
</style>
