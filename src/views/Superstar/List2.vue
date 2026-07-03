<template>
    <div v-loading.fullscreen="loading">
        <superstar-boss :boss="bossList"></superstar-boss>
        <div class="m-null" v-if="!origin_data || origin_data.length == 0">
            <img :src="imgUrl + 'null.png'" />
        </div>
        <div class="m-super-list" v-else>
            <!-- 前三排名 -->
            <div class="u-sort-box">
                <div
                    class="u-sort-item"
                    :class="'u-sort-item-' + (i + 1)"
                    v-for="(item, i) in threeData || []"
                    :key="i"
                >
                    <div class="u-sort-number">
                        <img :src="imgUrl + (i + 1) + '.png'" />
                    </div>
                    <!-- 团队信息 -->
                    <a class="u-team-info" :href="teamLink(item.team_id)" target="_blank">
                        <div class="u-team-icon">
                            <el-image v-if="item.team_logo" :src="teamLogo(item.team_logo)" fit="fill"></el-image>
                            <img loading="lazy" src="@/assets/img/rank/misc/null.png" width="100%" v-else />
                        </div>
                        <div class="u-team-name">{{ item.team_name && item.team_name.slice(0, 6) }}</div>
                        <div class="u-team-serve">{{ item.team_server }}</div>
                        <div class="u-team-update">{{ showTime(item.created) }}</div>
                        <div class="u-team-time">
                            战斗用时&nbsp;:&nbsp;<span>{{ showTC(item.fight_time) }}</span>
                        </div>
                    </a>

                    <!-- 团长+团员部分 -->
                    <div class="u-team-list">
                        <div class="u-team-leader">
                            团长:&nbsp;
                            <!-- TODO心法图标,后续替换 -->
                            <img loading="lazy" width="24" :src="showLeaderMount(item.leaders[1])" />&nbsp;{{
                                showLeaderName(item.leaders[0])
                            }}
                        </div>
                        <!-- 团员list -->
                        <div class="u-team-member">
                            <div class="u-team-member-item" v-for="(member, j) in item.members" :key="j">
                                <img loading="lazy" width="18" :src="showMemberMount(member)" />&nbsp;
                                <span>{{ showMemberName(member) }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 链接按钮 -->
                    <div class="u-battle">
                        <div class="u-two-link" v-if="item.jx3box_battle_id && item.jx3box_jcl_id">
                            <a :href="jclLink(item.jx3box_jcl_id)" target="_blank"> </a>
                            <a :href="battleLink(item.jx3box_battle_id)" target="_blank"> </a>
                        </div>
                        <div v-else>
                            <a :href="jclLink(item.jx3box_jcl_id)" target="_blank" v-if="item.jx3box_jcl_id"> </a>
                            <a :href="battleLink(item.jx3box_battle_id)" target="_blank" v-if="item.jx3box_battle_id">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 后续排名部分展示 -->
            <div class="u-sort-other-item" v-for="(item, i) in data || []" :key="i">
                <!-- 排序 -->
                <div class="u-sort-number">{{ i + 4 }}</div>
                <!-- 团队 -->
                <div class="u-team-list">
                    <!-- 左右两块布局 -->
                    <a class="u-team-info" :href="teamLink(item.team_id)" target="_blank">
                        <img
                            class="u-team-img"
                            object-fit="fill"
                            :src="teamLogo(item.team_logo)"
                            @error="handleImgError"
                        />
                        <span class="u-team-name">{{ item.team_name && item.team_name.slice(0, 6) }}</span>
                        <div class="u-team-serve">@{{ item.team_server }}</div>
                    </a>

                    <!--团长+ 团员list -->
                    <div class="u-team-people">
                        <div class="u-team-leader">
                            团长:
                            <img width="24" :src="showLeaderMount(item.leaders[1])" />{{
                                showLeaderName(item.leaders[0])
                            }}
                        </div>
                        <div class="u-team-member">
                            <div class="u-team-member-item" v-for="(member, j) in item.members" :key="j">
                                <img loading="lazy" width="18" :src="showMemberMount(member)" />
                                <span>{{ showMemberName(member) }}</span>
                            </div>
                        </div>
                        <div class="u-team-time-box">
                            <a
                                :href="jclLink(item.jx3box_jcl_id)"
                                target="_blank"
                                class="u-jcl u-tag"
                                v-if="item.jx3box_jcl_id"
                            >
                                <img :src="imgUrl + 'jcl-2.png'" />
                            </a>
                            <a
                                :href="battleLink(item.jx3box_battle_id)"
                                target="_blank"
                                class="u-battle u-tag"
                                v-if="item.jx3box_battle_id"
                            >
                                <img :src="imgUrl + 'battle-2.png'" />
                            </a>
                            <div class="u-team-time">
                                <div>
                                    战斗用时:<b>{{ showTC(item.fight_time) }}</b>
                                </div>
                                <div class="u-time">{{ showTime(item.created) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { __cdn, __imgPath } from "@/utils/config";
import { cloneDeep } from "lodash";
import { getTop100 } from "@/service/rank/superstar.js";
import { showTime } from "@jx3box/jx3box-common/js/moment";
import { getThumbnail, getLink } from "@jx3box/jx3box-common/js/utils";
import SuperstarBoss from "@/components/rank/superstar_boss.vue";
import PICS from "@/assets/js/pics.js";
export default {
    components: { SuperstarBoss },
    data() {
        return {
            imgUrl: __cdn + "design/event/superstar/",
            loading: false,
            origin_data: [],
        };
    },
    computed: {
        id() {
            return this.$store.state.id;
        },
        threeData() {
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
        data() {
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
        aid() {
            return this.$store.state.race.superstar;
        },
        achieves() {
            return this.$store.state.achieves || [];
        },
        bossID() {
            return this.$store.state.bossID;
        },
        bossList() {
            let dict = {};
            this.achieves.forEach((item) => {
                dict[item.achievement_id] = item.name;
            });
            return dict;
        },
        span() {
            return ~~(24 / Object.keys(this.bossList).length + 1);
        },
    },
    watch: {
        bossID: {
            immediate: true,
            handler(val) {
                val && this.loadData();
            },
        },
        "$route.query": {
            handler(val) {
                if (val.aid) {
                    this.$store.state.bossID = val.aid;
                }
            },
            immediate: true,
        },
        achieves: {
            immediate: true,
            handler() {
                if (!!~~this.$route.query.aid) {
                    this.$store.state.bossID = this.$route.query.aid;
                } else {
                    const keys = Object.keys(this.bossList);
                    this.$store.state.bossID = keys[0] || "";
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
        getRankImg(num) {
            return __imgPath + "image/rank/common/rank_" + num + ".png";
        },
        teamLogo(val) {
            if (!val) return "";
            return getThumbnail(val, 120, true);
        },
        loadData() {
            if (!this.bossID) {
                return;
            }
            this.loading = true;
            getTop100(this.bossID, this.id)
                .then((res) => {
                    this.origin_data = res.data.data || [];
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        teamLink(val) {
            return getLink("org", val);
        },
        showTime(val) {
            return showTime(new Date(val * 1000));
        },
        showTC(val) {
            let s = val / 1000;
            return ~~(s / 60) + "分" + ~~(s % 60) + "秒";
        },
        showMemberMount(member) {
            let mount = (member && member[1]) || 0;
            let mountIcon = __imgPath + "image/xf/" + mount + ".png";
            return mountIcon;
        },
        showMemberName(member) {
            return (member && member[0].slice(0, 12)) || "未知";
        },
        showLeaderMount(mount) {
            let mountIcon = __imgPath + "image/xf/" + mount + ".png";
            return mountIcon;
        },
        showLeaderName(name) {
            return (name && name.slice(0, 12)) || "未知";
        },

        bossIcon(val) {
            return PICS.bossIcon(val);
        },
        handleImgError(e) {
            e.target.src = "@/assets/img/rank/misc/null.png";
        },
    },
};
</script>
