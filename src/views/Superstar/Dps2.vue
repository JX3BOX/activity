<template>
    <div class="m-superstar-dps" v-loading.fullscreen="loading">
        <SuperstarBoss :boss="bossList"></SuperstarBoss>
        <!-- 侧栏固定boss -->
        <transition name="fade">
            <div class="m-boss-fixed" v-show="showBossFixed" :style="{ top: bossFixedTop + 'px' }">
                <div
                    class="u-boss-item"
                    v-for="(label, aid) of bossList"
                    :key="aid"
                    @click="changeBoss(aid)"
                    :class="{ on: aid == achieve_id }"
                >
                    <img class="u-boss-icon" :src="bossIcon(aid)" />
                </div>
            </div>
        </transition>
        <div class="m-null" v-if="!origin_data || origin_data.length == 0">
            <img :src="imgUrl + 'null.png'" />
        </div>
        <div class="m-dps-content" v-else ref="main">
            <template v-for="(item, index) in dataList" :key="index">
                <h2>
                    <span class="u-title">
                        <img class="u-flower" :src="imgUrl + 'flower.png'" />
                        {{ item.title }}
                        <img class="u-flower" :src="imgUrl + 'flower.png'" />
                    </span>
                </h2>
                <div class="m-dps-box">
                    <div class="m-tab" v-if="item.type">
                        <span v-for="(tab, index) in options" :key="index" :class="['u-tab', { on: index == 0 }]">{{
                            tab.name
                        }}</span>
                    </div>
                    <div class="m-box" :class="`m-box-${item.bg}`" v-if="item.bg !== 'none'"></div>
                    <div class="m-box-none" v-else></div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { __imgPath, __cdn } from "@/utils/config";
import { getTop100, getDps } from "@/service/rank/superstar.js";
import { getEvents } from "@/service/rank/event.js";
import SuperstarBoss from "@/components/rank/superstar_boss.vue";
import PICS from "@/assets/js/pics.js";
export default {
    components: { SuperstarBoss },

    data() {
        return {
            imgUrl: __cdn + "design/event/superstar/",
            loading: false,
            achieve_id: "", //boss成就ID
            origin_data: [],
            options: [
                { name: "输出", icon: "", value: 0, key: "damage" },
                { name: "治疗", icon: "", value: 1, key: "heal" },
                { name: "承伤", icon: "", value: 2, key: "beDamage" },
                { name: "承疗", icon: "", value: 3, key: "beHeal" },
            ],
            dataBak: {},
            death: [],
            sortByTeam: [],
            sortByForce: [],
            sortByPlayer: [],
            showBossFixed: false,
            bossFixedTop: 0,
        };
    },
    computed: {
        id() {
            return this.$store.state.id;
        },
        aid() {
            return this.$store.state.race.superstar;
        },
        achieves() {
            return this.$store.state.achieves || [];
        },
        bossList() {
            let dict = {};
            this.achieves.forEach((item) => {
                dict[item.achievement_id] = item.name;
            });
            return dict;
        },
        dataList() {
            const _list = [
                { title: "团队通关速度", type: false, data: [], bg: "left" },
                { title: "四维数据统计（团队）", type: true, data: [], bg: "right" },
                { title: "四维数据统计（心法·平均）", type: true, data: [], bg: "none" },
                { title: "四维数据统计（个人）", type: true, data: [], bg: "left" },
            ];
            return _list;
        },
    },
    watch: {
        achieve_id: {
            immediate: true,
            handler(val) {
                val && this.loadData();
            },
        },
        "$route.query": {
            handler(val) {
                if (val.aid) {
                    this.achieve_id = val.aid;
                }
            },
            immediate: true,
        },
        achieves: {
            immediate: true,
            handler() {
                if (!!~~this.$route.query.aid) {
                    this.achieve_id = this.$route.query.aid;
                } else {
                    this.achieve_id = _.first(Object.keys(this.bossList));
                }
            },
        },
    },
    created() {
        window.addEventListener("scroll", this.handleScroll);
    },
    mounted() {},
    methods: {
        handleScroll() {
            this.$nextTick(() => {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

                if (scrollTop > 1100) {
                    this.showBossFixed = true;
                    this.bossFixedTop = scrollTop - (Object.keys(this.bossList).length * 90 + 200);
                } else {
                    this.showBossFixed = false;
                }
            });
        },
        bossIcon(val) {
            return PICS.bossIcon(val);
        },
        changeBoss(val) {
            this.achieve_id = val;
            this.$router.push({
                query: {
                    aid: val,
                },
            });
        },

        loadData() {
            if (!this.achieve_id) return;
            this.loading = true;
            getTop100(this.achieve_id, this.id)
                .then((res) => {
                    this.origin_data = res.data.data || [];
                    console.log(this.origin_data, "???");
                    this.getData();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        getData() {
            // getEvents(this.params).then((res) => {
            //     let arr = [],
            //         data = res.data.data.list;
            //     data.forEach((item) => {
            //         if (item.superstar != 0) arr.push(item);
            //     });
            //     let id = this.id;
            //     let index = arr.reverse().findIndex((item) => {
            //         return item.ID == id;
            //     });
            //     getDps(index + 1).then((data) => {
            //         let res = data.data;
            //         this.dataBak = res;
            //         this.dataInit();
            //     });
            // });
        },
        //json数据初始化
        dataInit() {
            let data = this.dataBak;
            let key = this.bossList[this.achieve_id];
            let res = data[key.indexOf("&") == -1 ? key : key.split("&")[0]];
            this.death = res?.death?.sortByTeam || [];
            let sortByTeam = [],
                sortByForce = [],
                sortByPlayer = [];
            this.options.forEach((item) => {
                sortByTeam.push(res[item.key]?.sortByTeam || []);
                sortByForce.push(res[item.key]?.sortByForce || []);
                sortByPlayer.push(res[item.key]?.sortByPlayer || []);
            });
            this.sortByTeam = sortByTeam;
            this.sortByForce = sortByForce;
            this.sortByPlayer = sortByPlayer;
        },
    },
};
</script>
