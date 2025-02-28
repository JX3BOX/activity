<template>
    <div
        v-loading="loading"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.3)"
    >
        <el-row class="m-rank-boss m-rank-filter" :gutter="20" type="flex">
            <el-col :span="span" v-for="(label, aid) of bossList" :key="aid">
                <li class="u-boss" @click="changeBoss(aid)" :class="{ on: aid == achieve_id }">
                    <img class="u-boss-icon" :src="bossIcon(aid)" />
                    <span class="u-boss-name">{{ label }}</span>
                </li>
            </el-col>
        </el-row>
        <div class="m-sort-null" v-if="!origin_data || origin_data.length == 0">
            <i class="el-icon-warning-outline"></i> 暂时还没有任何记录
        </div>
        <div v-else>
            <!-- 前三排名 -->
            <div class="u-sort-box">
                <div
                    class="u-sort-3-item"
                    :class="'u-sort-item-' + (i + 1)"
                    v-for="(item, i) in threeData || []"
                    :key="i"
                >
                    <div :class="'u-sort-' + (i + 1)">
                        <img :src="imgurl + (i + 1) + '.png'" />
                    </div>
                    <!-- 团队信息 -->
                    <div class="u-team-info">
                        <a :href="teamLink(item.team_id)" target="_blank">
                            <div class="u-team-icon">
                                <el-image v-if="item.team_logo" :src="teamLogo(item.team_logo)" fit="fill"></el-image>
                                <img loading="lazy" src="@/assets/img/rank/misc/null.png" width="100%" v-else />
                            </div>
                            <div class="u-team-name">{{ item.team_name && item.team_name.slice(0, 6) }}</div>
                            <div class="u-team-serve">{{ item.team_server }} {{ showTime(item.created) }}</div>
                            <div class="u-team-time">
                                战斗用时&nbsp;:&nbsp;<span>{{ showTC(item.fight_time) }}</span>
                            </div>
                        </a>
                    </div>
                    <!-- 团长+团员部分 -->
                    <div class="u-team-list">
                        <div class="u-team-leader">
                            团长:&nbsp;
                            <!-- TODO心法图标,后续替换 -->
                            <img loading="lazy" width="30" :src="showLeaderMount(item.leaders[1])" />&nbsp;{{
                                showLeaderName(item.leaders[0])
                            }}
                        </div>
                        <!-- 团员list -->
                        <div class="u-team-member">
                            <div class="u-team-member-item" v-for="(member, j) in item.members" :key="j">
                                <img loading="lazy" width="20" :src="showMemberMount(member)" />&nbsp;
                                <div>{{ showMemberName(member) }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 分割线 -->
                    <div class="u-team-line"></div>
                    <!-- 链接按钮 -->
                    <div class="u-battle-jcl">
                        <div class="u-two-link" v-if="item.jx3box_battle_id && item.jx3box_jcl_id">
                            <a :href="jclLink(item.jx3box_jcl_id)" target="_blank">
                                <img :src="imgurl + 'JCL_2.png'" />
                            </a>
                            <a :href="battleLink(item.jx3box_battle_id)" target="_blank">
                                <img :src="imgurl + 'BATTLE_2.png'" />
                            </a>
                        </div>
                        <div v-else>
                            <a :href="jclLink(item.jx3box_jcl_id)" target="_blank" v-if="item.jx3box_jcl_id">
                                <img :src="imgurl + 'JCL.png'" />
                            </a>
                            <a :href="battleLink(item.jx3box_battle_id)" target="_blank" v-if="item.jx3box_battle_id">
                                <img :src="imgurl + 'BATTLE.png'" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 后续排名部分展示 -->
            <div class="u-sort-other">
                <div class="u-sort-other-item" v-for="(item, i) in data || []" :key="i">
                    <!-- 排序 -->
                    <div class="u-sort-number">{{ i + 4 }}</div>
                    <!-- 团队 -->
                    <div class="u-team-list">
                        <!-- 左右两块布局 -->
                        <a :href="teamLink(item.team_id)" target="_blank">
                            <div class="u-team-info">
                                <div class="u-team-icon">
                                    <el-image
                                        v-if="item.team_logo"
                                        :src="teamLogo(item.team_logo)"
                                        fit="fill"
                                    ></el-image>
                                    <img loading="lazy" src="@/assets/img/rank/misc/null.png" width="100%" v-else />
                                </div>
                                <div class="u-team-name">{{ item.team_name && item.team_name.slice(0, 6) }}</div>
                                <div class="u-team-serve">{{ item.team_server }}</div>
                            </div>
                        </a>

                        <!--团长+ 团员list -->
                        <div class="u-team-people">
                            <div class="u-team-leader">
                                团长:&nbsp;
                                <!-- TODO心法图标,后续替换 -->
                                <img loading="lazy" width="30" :src="showLeaderMount(item.leaders[1])" />&nbsp;{{
                                    showLeaderName(item.leaders[0])
                                }}
                            </div>
                            <div class="u-team-member">
                                <div class="u-team-member-item" v-for="(member, j) in item.members" :key="j">
                                    <img loading="lazy" width="20" :src="showMemberMount(member)" />&nbsp;
                                    <div>{{ showMemberName(member) }}</div>
                                </div>
                            </div>
                        </div>
                        <!-- jcl-battle btn -->
                        <div class="u-team-other-btn">
                            <a
                                :href="jclLink(item.jx3box_jcl_id)"
                                target="_blank"
                                class="u-jcl-battle-link"
                                v-if="item.jx3box_jcl_id"
                            >
                                <img :src="imgurl + 'JCL_3.jpg'" />
                            </a>
                            <a
                                :href="battleLink(item.jx3box_battle_id)"
                                target="_blank"
                                class="u-jcl-battle-link"
                                v-if="item.jx3box_battle_id"
                            >
                                <img :src="imgurl + 'BATTLE_3.jpg'" />
                            </a>
                        </div>
                        <!-- 通关时间,飘在右侧顶部 -->
                        <div class="u-team-time-box">
                            <div class="u-team-time">
                                战斗用时&nbsp;:&nbsp;<span>{{ showTC(item.fight_time) }}</span>
                            </div>
                            <div class="u-serve">{{ item.team_server }} {{ showTime(item.created) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { cloneDeep } from "lodash";
import { getTop100 } from "@/service/rank/superstar.js";
import { showTime } from "@jx3box/jx3box-common/js/moment";
import { getThumbnail, getLink } from "@jx3box/jx3box-common/js/utils";
import PICS from "@/assets/js/pics.js";
export default {
    components: {},

    data() {
        return {
            imgurl: "https://img.jx3box.com/topic/menpaitiantuan/",
            loading: false,
            achieve_id: "", //boss成就ID
            origin_data: [],
        };
    },
    computed: {
        id: function () {
            return this.$store.state.id;
        },
        threeData: function () {
            let d = cloneDeep(this.origin_data || []),
                data = [];
            if (d.length > 3) {
                data = d.splice(0, 3);
            } else {
                data = d;
            }
            data.forEach((team, i) => {
                let leader_name = team.leader;
                let members = team.teammate.split(";");
                let arr = [];
                let leader = "";
                members.forEach((member, j) => {
                    let result = member.split(",");
                    if (result[0] != leader_name) {
                        arr.push(result);
                    } else {
                        leader = result;
                    }
                });
                data[i]["members"] = arr;
                data[i]["leaders"] = leader;
            });
            return data;
        },
        data: function () {
            let d = cloneDeep(this.origin_data || []),
                data = [];
            if (d.length > 3) data = d.splice(3, d.length);
            data.forEach((team, i) => {
                let leader_name = team.leader;
                let members = team.teammate.split(";");
                let arr = [];
                let leader = "";
                members.forEach((member, j) => {
                    let result = member.split(",");
                    if (result[0] != leader_name) {
                        arr.push(result);
                    } else {
                        leader = result;
                    }
                });
                data[i]["members"] = arr;
                data[i]["leaders"] = leader;
            });
            return data;
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
        span: function () {
            return ~~(24 / Object.keys(this.bossList).length + 1);
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
    created() {},
    mounted() {},
    methods: {
        changeBoss: function (val) {
            this.achieve_id = val;
            this.$router.push({
                query: {
                    aid: val,
                },
            });
        },
        jclLink(id) {
            return `/jcl/view?id=${id}`;
        },
        battleLink(id) {
            return "/battle/#/combat/" + id;
        },
        getRankImg: function (num) {
            return __imgPath + "image/rank/common/rank_" + num + ".png";
        },
        teamLogo: function (val) {
            if (!val) return "";
            return getThumbnail(val, 120, true);
        },
        loadData: function () {
            if (!this.achieve_id) {
                return;
            }
            this.loading = true;
            getTop100(this.achieve_id, this.id)
                .then((res) => {
                    this.origin_data = res.data.data || [];
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        teamLink: function (val) {
            return getLink("org", val);
        },
        showTime: function (val) {
            return showTime(new Date(val * 1000));
        },
        showTC: function (val) {
            let s = val / 1000;
            return ~~(s / 60) + "分" + ~~(s % 60) + "秒";
        },
        showMemberMount: function (member) {
            let mount = (member && member[1]) || 0;
            let mountIcon = __imgPath + "image/xf/" + mount + ".png";
            return mountIcon;
        },
        showMemberName: function (member) {
            return (member && member[0].slice(0, 12)) || "未知";
        },
        showLeaderMount: function (mount) {
            let mountIcon = __imgPath + "image/xf/" + mount + ".png";
            return mountIcon;
        },
        showLeaderName: function (name) {
            return (name && name.slice(0, 12)) || "未知";
        },

        bossIcon: function (val) {
            return PICS.bossIcon(val);
        },
    },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/rank/superstar/list.less";
</style>
