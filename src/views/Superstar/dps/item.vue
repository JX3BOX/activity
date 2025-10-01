<template>
    <div :class="'m-site-' + site">
        <div class="m-superstar-title">
            {{ title }}
        </div>

        <!-- 此处显示切换options -->
        <div class="m-superstar-options" v-if="options.length > 0">
            <div
                class="u-options-item"
                v-for="(item, i) in options"
                :key="i"
                :class="{ active: item.value == active }"
                @click="active = item.value"
            >
                {{ item.name }}
            </div>
        </div>

        <div class="m-team-box" :class="' u-superstar-' + color">
            <div :class="'u-top-' + color"><div class="u-team-info_bg"></div></div>
            <div class="u-team-box_item" :class="'u-center-' + color">
                <!-- :style="{ 'min-height': data.length > 9 ? 9 : data.length * 52 + 'px' }" -->
                <div class="u-team-info_bg u-team-info">
                    <div class="u-team-logo xf" v-if="type == 2">
                        <el-image
                            :src="showMountSvg(clearanceSpeedItem.xfId)"
                            fit="fill"
                            v-if="clearanceSpeedItem.xfId"
                        ></el-image>
                    </div>
                    <div class="u-team-logo" v-else>
                        <el-image
                            v-if="clearanceSpeedItem.team_logo"
                            :src="teamLogo(clearanceSpeedItem.team_logo, 160)"
                            fit="fill"
                        ></el-image>
                        <img loading="lazy" src="@/assets/img/rank/misc/null.png" width="100%" v-else />
                    </div>
                    <div class="u-team-member" v-if="type == 2">
                        <div class="u-player-name">{{ clearanceSpeedItem.playerName }}</div>
                        <div class="u-team-info_item">
                            <span>所属团队：</span>
                            <el-image
                                v-if="clearanceSpeedItem.team_logo"
                                :src="teamLogo(clearanceSpeedItem.team_logo, 24)"
                                fit="fill"
                            ></el-image>
                            <img loading="lazy" src="@/assets/img/rank/misc/null.png" width="24" v-else />
                            <span>&nbsp;&nbsp;{{ clearanceSpeedItem.team_name }}</span>
                        </div>
                    </div>
                    <div class="u-team-name" v-else>{{ clearanceSpeedItem.team_name }}</div>
                    <div class="u-team-server">
                        {{ clearanceSpeedItem.team_server }} {{ showTime(clearanceSpeedItem.created) }}
                    </div>
                    <div class="u-team-time" v-if="type">
                        {{ options[active]?.name || "-" }}&nbsp;:&nbsp;<span>{{
                            type == 2 ? clearanceSpeedItem.dps : clearanceSpeedItem[options[active]?.key] || 0
                        }}</span>
                    </div>
                    <div class="u-team-time" v-else>
                        战斗用时&nbsp;:&nbsp;<span>{{ showTC(clearanceSpeedItem.fight_time) }}</span>
                    </div>
                    <div
                        class="u-team-btn"
                        :class="{ two: clearanceSpeedItem.jx3box_jcl_id && clearanceSpeedItem.jx3box_battle_id }"
                    >
                        <a
                            :href="jclLink(clearanceSpeedItem.jx3box_jcl_id)"
                            target="_blank"
                            class="u-jcl-battle-link"
                            v-if="clearanceSpeedItem.jx3box_jcl_id"
                        >
                            <img :src="imgurl + 'JCL_3.jpg'" />
                        </a>
                        <a
                            :href="battleLink(clearanceSpeedItem.jx3box_battle_id)"
                            target="_blank"
                            class="u-jcl-battle-link"
                            v-if="clearanceSpeedItem.jx3box_battle_id"
                        >
                            <img :src="imgurl + 'BATTLE_3.jpg'" />
                        </a>
                    </div>
                </div>
                <!-- 排行 -->
                <div
                    :class="{
                        scroll: data.length > 8,
                        'u-team-rank_left': site == 'left',
                        'u-team-rank_right': site == 'right',
                    }"
                >
                    <div v-if="type == 2">
                        <div
                            class="u-team-rank_item"
                            :class="{ active: clearanceSpeedActive == item.playerName }"
                            v-for="(item, i) in data"
                            :key="i + 'rank'"
                            @click="
                                clearanceSpeedActive = item.xfId;
                                clearanceSpeedItem = item;
                            "
                        >
                            <div class="u-sort">{{ i + 1 }}</div>
                            <div class="u-logo">
                                <el-image :src="showMount(item.xfId)" fit="fill"></el-image>
                            </div>
                            <div class="u-line"></div>
                            <div
                                class="u-name"
                                :style="{ background: showMountColor(i, item), width: getBarWidth(item.dps) }"
                            >
                                {{ item.playerName }}
                            </div>
                            <div class="u-number">{{ item.dps || 0 }}</div>
                        </div>
                    </div>
                    <div v-else>
                        <div
                            class="u-team-rank_item"
                            :class="{ active: clearanceSpeedActive == item.ID }"
                            v-for="(item, i) in data"
                            :key="i + 'rank'"
                            @click="
                                clearanceSpeedActive = item.ID;
                                clearanceSpeedItem = item;
                            "
                        >
                            <div class="u-sort">{{ i + 1 }}</div>
                            <div class="u-logo">
                                <el-image v-if="item.team_logo" :src="teamLogo(item.team_logo)" fit="fill"></el-image>
                                <img loading="lazy" src="@/assets/img/rank/misc/null.png" width="100%" v-else />
                            </div>
                            <div class="u-line"></div>
                            <div
                                class="u-name"
                                :style="{
                                    background: showMountColor(i, item),
                                    width: getBarWidth(item[options[active]?.key], i),
                                }"
                            >
                                {{ item.team_name }}<span>@{{ item.team_server }}</span>
                            </div>
                            <div class="u-number">{{ item[options[active]?.key] || showTC(item.fight_time) }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="'u-bottom-' + color"><div class="u-team-info_bg"></div></div>
        </div>
    </div>
</template>

<script>
import { __imgPath, __cdn } from "@/utils/config";
import xf from "@jx3box/jx3box-data/data/xf/xf.json";
import { showTime } from "@jx3box/jx3box-common/js/moment";
import { getThumbnail, getLink } from "@jx3box/jx3box-common/js/utils";
import { colors_by_mount_name } from "@jx3box/jx3box-data/data/xf/colors.json";
import { orderBy, cloneDeep } from "lodash";
import xfmap from "@jx3box/jx3box-data/data/xf/xfid.json";
export default {
    components: {},
    props: {
        origin_data: {
            type: Array,
            default: () => [],
        },
        options: {
            type: Array,
            default: () => [],
        },
        color: {
            type: String,
            default: () => "green",
        },
        title: {
            type: String,
            default: () => "",
        },
        //团队信息默认位置
        site: {
            type: String,
            default: () => "left",
        },
        //数据类型
        type: {
            type: Number,
            default: () => 0,
        },
    },
    data() {
        return {
            imgurl: __imgPath + "topic/menpaitiantuan/",
            active: 0,
            clearanceSpeedItem: {},
            clearanceSpeedActive: null,
            data: [],
        };
    },
    watch: {
        origin_data: {
            handler(val) {
                if (val.length > 0) {
                    this.init();
                }
            },
            immediate: true,
            deep: true,
        },
        active: {
            handler(val) {
                this.init();
            },
        },
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        //初始化统计数据
        init() {
            if (this.type == 1 || this.type == 2) {
                //团队数据
                let filterArr = [];
                this.origin_data[this.active].forEach((item) => {
                    let xfid = 0;
                    if (this.type == 2) {
                        for (let key in xf) {
                            if (xf[key].force == item.forceId) {
                                xfid = xf[key].id;
                                break;
                            }
                        }
                    }

                    filterArr.push(
                        Object.assign(
                            {
                                team_name: item.team,
                                team_server: item.server,
                                fight_time: item.timeDuring * 1000,
                                created: item.timeBegin,
                                ID: item.team_id,
                                xfId: xfid,
                            },
                            item
                        )
                    );
                });
                let arr = [];
                if (this.type == 2) {
                    arr = orderBy(filterArr, ["dps"], ["desc"]);
                } else {
                    let key = this.options[this.active].key;
                    arr = orderBy(filterArr, [key], ["desc"]);
                }

                this.clearanceSpeedItem = arr[0];
                this.clearanceSpeedActive = this.type == 2 ? arr[0].playerName : arr[0].ID;
                this.data = arr;
            } else {
                let arr = orderBy(this.origin_data, ["fight_time"], ["aes"]);
                this.clearanceSpeedItem = arr[0];
                this.clearanceSpeedActive = arr[0].ID;
                this.data = arr;
            }
        },
        jclLink(id) {
            return `/jcl/view?id=${id}`;
        },
        battleLink(id) {
            return "/battle/#/combat/" + id;
        },

        teamLogo: function (val, size = 40) {
            if (!val) return "";
            return getThumbnail(val, size, true);
        },
        showMount: function (mount) {
            let mountIcon = __imgPath + "image/xf/" + mount + ".png";
            return mountIcon;
        },
        showMountSvg: function (mount) {
            let mountIcon = __cdn + "design/vector/mount/" + mount + ".svg";
            return mountIcon;
        },
        showMountColor: function (index, item) {
            if (this.type != 2) {
                let colors = [
                    "#c3c5c1",
                    "#FF7DAD",
                    "#ffadcb",
                    "#BA9BE4",
                    "#d8c4ff",
                    "#4B9BFB",
                    "#7db8ff",
                    "#6DDFE2",
                    "#78f0f3",
                    "#EC4B2C",
                    "#d43618",
                    "#E6BC31",
                    "#b58f12",
                    "#f16040",
                    "#c55036",
                    "#6568ad",
                    "#4f5186",
                    "#37C0E2",
                    "#48d6f9",
                    "#90CC50",
                    "#a2e05f",
                    "#FDDD70",
                    "#FDDD70",
                    "#D6A16F",
                    "#8D90D8",
                    "#94C7DC",
                    "#872F37",
                    "#b9c1ff",
                    "#16708a",
                    "#39bf9b",
                    "#6bb7f2",
                    "#ffde7b",
                ];
                if (index > colors.length) {
                    // 获取下一个颜色的索引，如果超出数组长度，则从头开始
                    const nextIndex = (index + 1) % colors.length;
                    return colors[nextIndex];
                } else {
                    return colors[index];
                }
            } else {
                let xfname = xfmap[item.xfId] || "通用";
                return colors_by_mount_name[xfname] || "#fff";
            }
        },
        getBarWidth(dps, i) {

            let max = this.type ? (this.type == 2 ? this.data[0].dps : this.data[0][this.options[this.active].key]) : 0;
            if (max == 0) {
                let num=368 / this.data.length;
                return 198 + i * num + "px";
            }
            return (dps / max).toFixed(4) * 580 + "px";
        },
        showTime: function (val) {
            return showTime(new Date(val * 1000));
        },
        showTC: function (val) {
            let s = val / 1000;
            return ~~(s / 60) + "分" + ~~(s % 60) + "秒";
        },
        teamLink: function (val) {
            return getLink("org", val);
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/superstar/dps_v2.less";
</style>
