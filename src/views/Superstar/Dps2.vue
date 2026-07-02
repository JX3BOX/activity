<template>
    <div class="m-superstar-box">
        <div
            class="m-superstar-dps"
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.3)"
        >
            <SuperstarBoss :boss="bossList"></SuperstarBoss>
            <div class="m-superstar-dps-null" v-if="!origin_data || origin_data.length == 0">
                <i class="el-icon-warning-outline"></i> 暂时还没有任何记录
            </div>
            <div v-else>
                <!-- 顶部 -->
                <div class="u-top">
                    <img :src="imgurl + 'top.jpg'" />
                    <div class="u-title">
                        <img :src="imgurl + 'sjb.png'" width="86.5" />
                    </div>
                </div>
                <div class="u-center">
                    <div class="u-dps-item" v-for="(item, index) in origin_data" :key="index">
                        <div class="u-team-img">
                            <el-image v-if="item.team_logo" :src="teamLogo(item.team_logo)" fit="fill"></el-image>
                            <img loading="lazy" src="@/assets/img/rank/misc/null.png" width="100%" v-else />
                        </div>
                        <div class="u-team-name" :title="item.team_name">{{ item.team_name }}</div>
                        <div class="u-team-data">
                            <div class="u-battle" v-if="item.jx3box_battle_id || item.jx3box_jcl_id">
                                <!-- 战斗数据 -->
                                <a
                                    :href="battleLink(item.jx3box_battle_id)"
                                    target="_blank"
                                    v-if="item.jx3box_battle_id"
                                >
                                    {{ item.battleInfo?.title || "-" }}（战斗数据）
                                </a>
                                <!-- JCL数据 -->
                                <a :href="jclLink(item.jx3box_jcl_id)" target="_blank" v-if="item.jx3box_jcl_id">
                                    {{ item.jclInfo?.title || "-" }}（战斗分析JCL）
                                </a>
                            </div>
                            <div v-else>暂未上传数据</div>
                        </div>
                    </div>
                </div>
                <!-- 底部 -->
                <div class="u-bottom">
                    <img :src="imgurl + 'bottom.jpg'" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { __imgPath } from "@/utils/config";
import { getTop100, getBattleOrJcl } from "@/service/rank/superstar.js";
import { getThumbnail, getLink } from "@jx3box/jx3box-common/js/utils";
import SuperstarBoss from "@/components/rank/superstar_boss.vue";
export default {
    components: { SuperstarBoss },

    data() {
        return {
            imgurl: "https://img.jx3box.com/topic/menpaitiantuan/",
            loading: false,
            origin_data: [],
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
        bossID: function () {
            return this.$store.state.bossID;
        },
        bossList: function () {
            let dict = {};
            this.achieves.forEach((item) => {
                dict[item.achievement_id] = item.name;
            });
            return dict;
        },
        span: function () {
            return ~~(24 / Object.keys(this.bossList).length + 1);
        },
    },
    watch: {
        bossID: {
            immediate: true,
            handler: function (val) {
                val && this.loadData();
            },
        },
        "$route.query": {
            handler: function (val) {
                if (val.aid) {
                    this.$store.state.bossID = val.aid;
                }
            },
            immediate: true,
        },
        achieves: {
            immediate: true,
            handler: function () {
                if (!!~~this.$route.query.aid) {
                    this.$store.state.bossID = this.$route.query.aid;
                } else {
                    const keys = Object.keys(this.bossList);
                    this.$store.state.bossID = keys[0] || '';
                }
            },
        },
    }, 
    methods: {
        jclLink(id) {
            return `/jcl/view?id=${id}`;
        },
        battleLink(id) {
            return "/battle/#/combat/" + id;
        },
        teamLogo: function (val) {
            if (!val) return "";
            return getThumbnail(val, 36, true);
        },
        loadData: function () {
            if (!this.bossID) {
                return;
            }
            this.loading = true;
            getTop100(this.bossID, this.id)
                .then((res) => {
                    this.getBattleOrJcl(res.data.data || []);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        getBattleOrJcl: function (data) {
            let ids = [];

            data.forEach((item) => {
                if (item.jx3box_battle_id) ids.push(item.jx3box_battle_id);
                if (item.jx3box_jcl_id) ids.push(item.jx3box_jcl_id);
            });
            getBattleOrJcl({ ids: ids.toString() })
                .then((res) => {
                    let list = res.data.data.list || [];
                    data.forEach((item) => {
                        list.forEach((value) => {
                            if (item.jx3box_battle_id == value.id) item.battleInfo = value;
                            if (item.jx3box_jcl_id == value.id) item.jclInfo = value;
                        });
                    });
                    this.origin_data = data;
                })
                .finally(() => {});
        },
        teamLink: function (val) {
            return getLink("org", val);
        },
    },
};
</script>
