<template>
    <div class="m-superstar-box">
        <!-- 侧栏固定boss -->
        <transition name="fade">
            <div class="m-superstar-boss-fixed" v-show="showBossFixed" :style="{ top: bossFixedTop + 'px' }">
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
        <div
            class="m-superstar-dps"
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.3)"
        >
            <div class="m-superstar-boss">
                <div
                    class="u-boss-item"
                    v-for="(label, aid) of bossList"
                    :key="aid"
                    @click="changeBoss(aid)"
                    :class="{ on: aid == achieve_id }"
                >
                    <img class="u-boss-icon" :src="bossIcon(aid)" />
                    <div class="u-boss-name" v-html="label?.replace(/&/g, '<br/>') || '-'"></div>
                </div>
            </div>
            <div class="m-superstar-dps-null" v-if="!origin_data || origin_data.length == 0">
                <i class="el-icon-warning-outline"></i> 暂时还没有任何记录
            </div>
            <div v-else ref="main">
                <item :origin_data="origin_data" title="团队通关速度"></item>

                <die :data="death"></die>
                <item
                    :origin_data="sortByTeam"
                    title="四维数据统计（团队）"
                    color="white"
                    site="right"
                    :options="options"
                    :type="1"
                ></item>
                <xfItem :origin_data="sortByForce" title="四维数据统计（心法·平均）" :options="options"></xfItem>
                <item
                    :origin_data="sortByPlayer"
                    title="四维数据统计（个人）"
                    color="white"
                    :options="options"
                    :type="2"
                ></item>
            </div>
        </div>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { getTop100, getDps } from "@/service/rank/superstar.js";
import { getEvents } from "@/service/rank/event.js";
import PICS from "@/assets/js/pics.js";
import item from "./dps/item.vue";
import xfItem from "./dps/xfItem.vue";
import die from "./dps/die.vue";
export default {
    components: { item, die, xfItem },

    data() {
        return {
            imgurl: __imgPath + "topic/menpaitiantuan/",
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
        id: function () {
            return this.$store.state.id;
        },
        aid: function () {
            return this.$store.state.race.superstar;
        },
        achieves: function () {
            return this.$store.state.achieves || [];
        },
        bossList: function () {
            let dict = {};
            this.achieves.forEach((item) => {
                dict[item.achievement_id] = item.name;
            });
            return dict;
        },
    },
    watch: {
        achieve_id: {
            immediate: true,
            handler: function (val) {
                val && this.loadData();
            },
        },
        "$route.query": {
            handler: function (val) {
                if (val.aid) {
                    this.achieve_id = val.aid;
                }
            },
            immediate: true,
        },
        achieves: {
            immediate: true,
            handler: function () {
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
                // let top = this.$refs.main?.offsetTop || 0;
                // let height = document.body.clientHeight;
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

                if (scrollTop > 1100) {
                    this.showBossFixed = true;
                    this.bossFixedTop = scrollTop - (Object.keys(this.bossList).length * 90 + 200);
                } else {
                    this.showBossFixed = false;
                }
            });
        },
        bossIcon: function (val) {
            return PICS.bossIcon(val);
        },
        changeBoss: function (val) {
            this.achieve_id = val;
            this.$router.push({
                query: {
                    aid: val,
                },
            });
        },

        loadData: function () {
            if (!this.achieve_id) {
                return;
            }
            this.loading = true;
            getTop100(this.achieve_id, this.id)
                .then((res) => {
                    this.origin_data = res.data.data || [];
                    this.getData();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        getData() {
            getEvents(this.params).then((res) => {
                let arr = [],
                    data = res.data.data.list;
                data.forEach((item) => {
                    if (item.superstar != 0) arr.push(item);
                });

                let id = this.id;
                let index = arr.reverse().findIndex((item) => {
                    return item.ID == id;
                });
                getDps(index + 1).then((data) => {
                    let res = data.data;
                    this.dataBak = res;
                    this.dataInit();
                });
            });
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
            // for (let i = 0; i < this.options.length; i++) {
            //     this.sortByTeam.push(res[this.options[i].key]?.sortByTeam || []);
            //     this.sortByForce.push(res[this.options[i].key]?.sortByForce || []);
            //     this.sortByPlayer.push(res[this.options[i].key]?.sortByPlayer || []);
            // }
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/superstar/dps_v2.less";
</style>
