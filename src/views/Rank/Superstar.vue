<template>
    <!-- 天团榜 -->
    <div
        class="m-race-superstar"
        v-loading="loading"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.3)"
    >
        <div class="m-rank-vote-title">
            <img :src="superstar_title_img" />
        </div>
        <!-- <div class="m-rank-vote-header">队伍中所有队员除坦克与治疗外全部为相同门派时，即符合门派天团要求。</div> -->
        <div class="m-race-superstar-rank">
            <div class="m-rank-top100">
                <!-- A.列表不为空 -->
                <div class="m-rank-top100-list" v-if="data && data.length">
                    <div class="m-rank-top100-item" v-for="(item, i) in data" :key="i" :class="'is-No' + (i + 1)">
                        <!-- 排名 -->
                        <div class="u-ranking" :class="'is-Top' + (i + 1)">
                            <i class="u-pic">
                                <img loading="lazy" :src="getRankImg(i + 1)" v-if="i < 3" />
                            </i>
                            <span>{{ i + 1 }}</span>
                        </div>
                        <!-- 队徽 -->
                        <a class="u-logo" :href="teamLink(item.team_id)" target="_blank">
                            <el-image
                                v-if="item.team_logo"
                                :src="i < 3 ? teamLogo(item.team_logo, true) : teamLogo(item.team_logo, false)"
                                fit="fill"
                            ></el-image>
                            <div class="el-image" v-else>
                                <img loading="lazy" src="@/assets/img/rank/misc/null.png" />
                            </div>
                        </a>
                        <!-- 名称 -->
                        <div class="u-title">
                            <a class="u-teamname" :href="teamLink(item.team_id)" target="_blank">
                                <i class="el-icon-link"></i>
                                {{ item.team_name && item.team_name.slice(0, 6) }}
                            </a>
                            <span class="u-server">{{ item.team_server }}</span>
                            <!-- <span
                            class="u-verified el-icon-success"
                            v-if="item.verified"
                        ></span>
                        <span class="u-not-verified el-icon-warning" v-else>
                            公示期</span
                            >-->
                        </div>
                        <!-- 时间 -->
                        <div class="u-time">
                            <span class="u-time-finish">{{ showTime(item.created) }}</span>
                            <span class="u-time-fight">
                                用时 :
                                <b>{{ showTC(item.fight_time) }}</b>
                            </span>
                        </div>
                        <!-- 队长 -->
                        <div class="u-leader" v-if="item.leaders">
                            <span class="u-leader-label">团长 :</span>
                            <img loading="lazy" class="u-mount" :src="showLeaderMount(item.leaders[1])" />
                            <span class="u-username">
                                {{ showLeaderName(item.leaders[0]) }}
                            </span>
                        </div>
                        <!-- 队员 -->
                        <el-row class="u-teammates" :gutter="10">
                            <el-col class="u-member" :span="i < 3 ? 8 : 4" v-for="(member, j) in item.members" :key="j">
                                <div>
                                    <img loading="lazy" class="u-mount" :src="showMemberMount(member)" />
                                    <span class="u-username">{{ showMemberName(member) }}</span>
                                </div>
                            </el-col>
                        </el-row>
                        <div
                            class="u-battle-jcl"
                            :class="['is-btn-No' + (i + 1), i > 2 ? 'is_other' : '']"
                            v-if="item.jx3box_battle_id || item.jx3box_jcl_id"
                        >
                            <!-- JCL数据 -->
                            <a :href="jclLink(item.jx3box_jcl_id)" target="_blank" v-if="item.jx3box_jcl_id">
                                <img :src="imgurl + 'rank/rank_jcl_1.png'" v-if="i < 3" />
                                <img :src="imgurl + 'rank/rank_jcl.png'" v-else />
                            </a>
                            <!-- 战斗数据 -->
                            <a
                                :href="battleLink(item.jx3box_battle_id)"
                                target="_blank"
                                v-if="item.jx3box_battle_id"
                                class="u-battle-btn"
                            >
                                <img :src="imgurl + 'rank/rank_battle_1.png'" v-if="i < 3" />
                                <img :src="imgurl + 'rank/rank_battle.png'" v-else />
                            </a>
                        </div>
                    </div>
                </div>

                <!-- B.列表为空 -->
                <div class="m-rank-top100-null" v-else>
                    <img :src="`${imgPath}image/rank/common/null.png`" class="m-rank-null" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { getTop100 } from "@/service/rank/superstar.js";
import { getThumbnail, getLink } from "@jx3box/jx3box-common/js/utils";
import { default_avatar } from "@jx3box/jx3box-common/data/jx3box.json";
import { showTime } from "@jx3box/jx3box-common/js/moment";
export default {
    name: "Superstar",
    props: [],
    data: function () {
        return {
            imgurl: "https://img.jx3box.com/topic/menpaitiantuan/",
            superstar_title_img: __imgPath + "image/rank/common/superstar.png",
            loading: false,
            origin_data: [],
            imgPath: __imgPath,
        };
    },
    computed: {
        id: function () {
            return this.$store.state.id;
        },
        data: function () {
            // let data = (this.server ? this.local_data : this.origin_data) || [];
            let data = this.origin_data || [];
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
    },
    watch: {
        aid: {
            immediate: true,
            handler: function (val) {
                val && this.loadData();
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
        getRankImg: function (num) {
            return __imgPath + "image/rank/common/rank_" + num + ".png";
        },
        teamLogo: function (val, mode) {
            if (!val) return "";
            return mode ? getThumbnail(val, 120, true) : getThumbnail(val, 88, true);
        },
        loadData: function () {
            this.loading = true;
            getTop100(this.aid, this.id)
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
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/race_vote.less";
@import "~@/assets/css/rank/race_rank.less";
@import "~@/assets/css/rank/race_superstar.less";
</style>
