<template>
    <div class="m-superstar-info">
        <div class="m-superstar-kv-title">
            <router-link class="u-back" :to="{ name: 'nav' }"><img :src="imgurl + 'history.png'" /></router-link>
            <img class="u-title" :src="imgurl + 'title.png'" />
            <img class="u-lr u-character" :src="imgurl + 'lr.png'" />
            <img class="u-rl u-character" :src="imgurl + 'rl.png'" />
        </div>
        <!-- 活动主体部分 -->
        <div class="m-superstar-main">
            <div class="u-menu">
                <router-link
                    v-for="(item, index) in menu"
                    :key="item.key"
                    :to="link(item.key)"
                    class="u-menu-item"
                    :class="{ active: index == menuActive, 'no-enable': item.noEnable }"
                    @click="menuClick(item, index)"
                >
                    {{ item.name }}
                </router-link>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import jx3boxData from "@jx3box/jx3box-common/data/jx3box.json";
const { __cdn } = jx3boxData;
import { getEvent, getIdFromSlug } from "@/service/rank/event.js";
import { getMenu } from "@jx3box/jx3box-common/js/system";
import { isNumber } from "lodash";
export default {
    name: "SuperstarInfo",
    components: {},
    data: function () {
        return {
            imgurl: __cdn + "design/event/superstar/",
            menu: [
                { name: "活动介绍", key: "introduce", noEnable: false },
                { name: "报名", key: "join", noEnable: false },
                { name: "天团榜", key: "list", noEnable: false },
                { name: "数据榜", key: "dps", noEnable: false },
                { name: "视频集锦", key: "video", noEnable: false },
            ],
            menuActive: 0,
            id: "",
        };
    },
    watch: {
        $route: {
            deep: true,
            immediate: true,
            async handler(val) {
                const id = Number(val.params.id);
                if (!isNaN(id) && isNumber(id)) {
                    this.id = id;
                    this.$store.state.id = this.id || 0;
                    this.init();
                } else {
                    const res = await getIdFromSlug(val.params.id);
                    this.id = res.data.data.id;
                    this.$store.state.id = this.id || 0;
                    this.init();
                }
            },
        },
    },
    created() {
        let i = this.menu.findIndex((item) => item.key == this.$route.name);
        this.menuActive = i;
    },
    methods: {
        link: function (val) {
            return "/" + this.id + "/" + val;
        },
        menuClick(item, index) {
            if (item.noEnable) return;
            this.menuActive = index;
        },
        init() {
            getEvent(this.id).then(async (res) => {
                this.data = res.data.data;
                const RANK_MAP = await this.getBossMap();
                this.$store.state.achieves = RANK_MAP[this.id] || [];
                console.log(RANK_MAP[this.id], this.id, this.$store.state.achieves);
                this.$store.state.race = res.data.data;
            });
        },
        async getBossMap() {
            const res = await getMenu("superstar_boss_list");
            const bossMap = res.reduce((acc, cur) => {
                const bosses = cur.boss.split(",");
                const names = cur.boss_name.split(",");
                acc[cur.event_id] = [];
                bosses.forEach((bossId, index) => {
                    acc[cur.event_id].push({ name: names[index], achievement_id: ~~bossId, event_id: this.id });
                });
                return acc;
            }, {});
            return bossMap;
        },
    },
};
</script>
<style lang="less">
@import "~@/assets/css/rank/superstar/index2.less";
</style>
