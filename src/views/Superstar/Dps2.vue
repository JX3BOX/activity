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
                        <span
                            v-for="(tab, tabIdx) in options"
                            :key="tabIdx"
                            :class="['u-tab', { on: tab.value == item.active }]"
                            @click="item.active = tab.value"
                            >{{ tab.name }}</span
                        >
                    </div>
                    <div class="m-box-none" v-if="item.bg === 'none'">
                        <!-- <div class="u-team-box_item u-xf u-center-green">
                            <div class="u-team-rank_left">
                                <div
                                    class="u-team-rank_itemNo"
                                    v-for="(row, rowIdx) in item.data"
                                    :key="rowIdx + 'rank'"
                                >
                                    <div class="u-sort">{{ row.forceName }}</div>
                                    <div class="u-logo">
                                        <el-image :src="showMount(row.xfId)" fit="fill"></el-image>
                                    </div>
                                    <div class="u-line"></div>
                                    <div
                                        class="u-name"
                                        :style="{
                                            background: showXfMountColor(row.xfId),
                                            width: getXfBarWidth(row.dps),
                                        }"
                                    >
                                        {{ row.forceName }}
                                    </div>
                                    <div class="u-number">{{ row.dps || 0 }}</div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <div class="m-box" :class="`m-box-${item.bg}`" v-else>
                        <!-- 详细信息 -->
                        <div class="m-info">
                            <img class="u-img" :src="teamLogo(item.curItem.team_logo, 158)" @error="handleImgError" />
                            <div class="u-name">{{ item.curItem.team_name }}</div>
                            <div class="u-server">
                                @{{ item.curItem.team_server }} {{ showTime(item.curItem.created) }}
                            </div>
                            <div class="u-time">
                                <template v-if="!item.type"
                                    >战斗用时:<span>{{ showTC(item.curItem.fight_time) }}</span></template
                                >
                                <template v-else
                                    >{{ options[item.active]?.name || "-" }}:<span>{{
                                        item.curItem[options[item.active]?.key] || 0
                                    }}</span>
                                </template>
                            </div>
                            <!-- <div
                                class="u-team-btn"
                                :class="{ two: item.curItem.jx3box_jcl_id && item.curItem.jx3box_battle_id }"
                            >
                                <a
                                    :href="jclLink(item.curItem.jx3box_jcl_id)"
                                    target="_blank"
                                    class="u-jcl-battle-link"
                                    v-if="item.curItem.jx3box_jcl_id"
                                >
                                    <img :src="imgUrl + 'dps-jcl.png'" />
                                </a>
                                <a
                                    :href="battleLink(item.curItem.jx3box_battle_id)"
                                    target="_blank"
                                    class="u-jcl-battle-link"
                                    v-if="item.curItem.jx3box_battle_id"
                                >
                                    <img :src="imgUrl + 'dps-battle.png'" />
                                </a>
                            </div> -->
                        </div>
                        <!-- 列表 -->
                        <!-- <div class="u-team-info_bg u-team-info" v-else>
                            <div class="u-team-logo xf">
                                <el-image
                                    :src="showMountSvg(item.curItem.xfId)"
                                    fit="fill"
                                    v-if="item.curItem.xfId"
                                ></el-image>
                            </div>
                            <div class="u-team-member">
                                <div class="u-player-name">{{ item.curItem.playerName }}</div>
                                <div class="u-team-info_item">
                                    <span>所属团队：</span>
                                    <el-image
                                        v-if="item.curItem.team_logo"
                                        :src="teamLogo(item.curItem.team_logo, 24)"
                                        fit="fill"
                                    ></el-image>
                                    <img loading="lazy" src="@/assets/img/rank/misc/null.png" width="24" v-else />
                                    <span>&nbsp;&nbsp;{{ item.curItem.team_name }}</span>
                                </div>
                            </div>
                            <div class="u-team-server">
                                {{ item.curItem.team_server }} {{ showTime(item.curItem.created) }}
                            </div>
                            <div class="u-team-time">
                                {{ options[item.active]?.name || "-" }}&nbsp;:&nbsp;<span>{{
                                    item.curItem.dps || 0
                                }}</span>
                            </div>
                            <div
                                class="u-team-btn"
                                :class="{ two: item.curItem.jx3box_jcl_id && item.curItem.jx3box_battle_id }"
                            >
                                <a
                                    :href="jclLink(item.curItem.jx3box_jcl_id)"
                                    target="_blank"
                                    class="u-jcl-battle-link"
                                    v-if="item.curItem.jx3box_jcl_id"
                                >
                                    <img :src="imgUrl + 'dps-jcl.png'" />
                                </a>
                                <a
                                    :href="battleLink(item.curItem.jx3box_battle_id)"
                                    target="_blank"
                                    class="u-jcl-battle-link"
                                    v-if="item.curItem.jx3box_battle_id"
                                >
                                    <img :src="imgUrl + 'dps-battle.png'" />
                                </a>
                            </div>
                        </div> -->
                        <!-- 排行列表 -->
                        <div class="m-rank-list">
                            <div
                                class="u-rank-item"
                                :class="{
                                    active: item.activeId == (item.type === 'player' ? row.playerName : row.ID),
                                }"
                                v-for="(row, rowIdx) in item.data"
                                :key="rowIdx + 'rank'"
                                @click="onItemClick(item, row)"
                            >
                                <div class="u-sort">{{ rowIdx + 1 }}</div>
                                <div class="u-logo">
                                    <el-image
                                        v-if="item.key === 'player'"
                                        :src="showMount(row.xfId)"
                                        fit="fill"
                                    ></el-image>
                                    <img v-else :src="teamLogo(row.team_logo, 160)" @error="handleImgError" />
                                </div>
                                <div class="u-line"></div>
                                <div
                                    class="u-name"
                                    :style="{
                                        background: showMountColor(rowIdx, row, item),
                                        width: getBarWidth(row, rowIdx, item),
                                    }"
                                >
                                    <template v-if="item.key === 'player'">{{ row.playerName }}</template>
                                    <template v-else
                                        >{{ row.team_name }}<span>@{{ row.team_server }}</span></template
                                    >
                                </div>
                                <div class="u-number">
                                    <template v-if="!item.type">{{ showTC(row.fight_time) }}</template>
                                    <template v-else-if="item.key === 'player'">{{ row.dps || 0 }}</template>
                                    <template v-else>{{ row[options[item.active]?.key] || 0 }}</template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { __imgPath, __cdn } from "@/utils/config";
import { getTop100 } from "@/service/rank/superstar.js";
import { getEvents } from "@/service/rank/event.js";

import { showTime } from "@jx3box/jx3box-common/js/moment";
import { getThumbnail } from "@jx3box/jx3box-common/js/utils";
import PICS from "@/assets/js/pics.js";
import xf from "@jx3box/jx3box-data/data/xf/xf.json";
import colorData from "@jx3box/jx3box-data/data/xf/colors.json";
const { colors_by_mount_name } = colorData;
import { orderBy } from "lodash";
import xfmap from "@jx3box/jx3box-data/data/xf/xfid.json";
import SuperstarBoss from "@/components/rank/superstar_boss.vue";

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
            sortByTeam: [],
            sortByForce: [],
            sortByPlayer: [],
            showBossFixed: false,
            bossFixedTop: 0,
            dataList: [
                {
                    title: "团队通关速度",
                    type: false,
                    bg: "left",
                    data: [],
                    active: 0,
                    activeId: null,
                    curItem: {},
                    key: "clearSpeed",
                },
                // {
                //     title: "四维数据统计（团队）",
                //     type: true,
                //     bg: "right",
                //     data: [],
                //     active: 0,
                //     activeId: null,
                //     curItem: {},
                //     key: "team",
                // },
                // {
                //     title: "四维数据统计（心法·平均）",
                //     type: true,
                //     bg: "none",
                //     data: [],
                //     active: 0,
                //     activeId: null,
                //     curItem: {},
                //     key: "xf",
                // },
                // {
                //     title: "四维数据统计（个人）",
                //     type: true,
                //     bg: "left",
                //     data: [],
                //     active: 0,
                //     activeId: null,
                //     curItem: {},
                //     key: "player",
                // },
            ],
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
                    this.achieve_id = Object.keys(this.bossList)[0] || "";
                }
            },
        },
    },
    created() {
        window.addEventListener("scroll", this.handleScroll);
    },
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
            if (!this.achieve_id) return;
            this.loading = true;
            getTop100(this.achieve_id, this.id)
                .then((res) => {
                    this.origin_data = res.data.data || [];
                    this.dataList.forEach((item, i) => {
                        this.initItem(item);
                    });
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // 根据 key 初始化对应区块数据
        initItem(listItem) {
            let arr = [];
            if (listItem.key === "clearSpeed") {
                arr = orderBy(this.origin_data, ["fight_time"], ["aes"]);
                console.log(arr);
            } else if (listItem.key === "team") {
                if (!this.sortByTeam.length) return;
                let raw = this.sortByTeam[listItem.active] || [];
                let key = this.options[listItem.active].key;
                raw.forEach((item) => {
                    arr.push(
                        Object.assign(
                            {
                                team_name: item.team,
                                team_server: item.server,
                                fight_time: item.timeDuring * 1000,
                                created: item.timeBegin,
                                ID: item.team_id,
                            },
                            item
                        )
                    );
                });
                arr = orderBy(arr, [key], ["desc"]);
            } else if (listItem.key === "xf") {
                if (!this.sortByForce.length) return;
                let raw = this.sortByForce[listItem.active];
                if (!raw) return;
                raw.forEach((item) => {
                    for (let k in xf) {
                        if (xf[k].force == item.forceId) {
                            item.xfId = xf[k].id;
                            break;
                        }
                    }
                });
                arr = orderBy(raw, ["dps"], ["desc"]);
            } else if (listItem.key === "player") {
                if (!this.sortByPlayer.length) return;
                let raw = this.sortByPlayer[listItem.active] || [];
                raw.forEach((item) => {
                    let xfid = 0;
                    for (let k in xf) {
                        if (xf[k].force == item.forceId) {
                            xfid = xf[k].id;
                            break;
                        }
                    }
                    arr.push(
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
                arr = orderBy(arr, ["dps"], ["desc"]);
            }
            listItem.data = arr;
            listItem.curItem = arr[0] || {};
            listItem.activeId = listItem.key === "player" ? arr[0]?.playerName || null : arr[0]?.ID || null;
            console.log(listItem);
        },
        // 点击排行项
        onItemClick(listItem, row) {
            listItem.curItem = row;
            listItem.activeId = listItem.key === "player" ? row.playerName : row.ID;
        },
        // === 从 item.vue 合并的方法 ===
        jclLink(id) {
            return `/jcl/view?id=${id}`;
        },
        battleLink(id) {
            return "/battle/#/combat/" + id;
        },
        teamLogo(val, size = 40) {
            if (!val) return "";
            return getThumbnail(val, size, true);
        },
        showMount(mount) {
            return __imgPath + "image/xf/" + mount + ".png";
        },
        showMountSvg(mount) {
            return __cdn + "design/vector/mount/" + mount + ".svg";
        },
        showMountColor(index, row, listItem) {
            // listItem.type === 'player' → 心法颜色
            if (listItem.type === "player") {
                let xfname = xfmap[row.xfId] || "通用";
                return colors_by_mount_name[xfname] || "#fff";
            }
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
                return colors[(index + 1) % colors.length];
            }
            return colors[index];
        },
        // xfItem 专用：心法颜色
        showXfMountColor(val) {
            let xfname = xfmap[val] || "通用";
            return colors_by_mount_name[xfname] || "#fff";
        },
        // xfItem 专用：柱状图宽度
        getXfBarWidth(dps) {
            let xfItem = this.dataList.find((item) => item.key === "xf");
            let xfData = xfItem?.data || [];
            let max = xfData[0]?.dps || 0;
            if (max == 0) return "0px";
            return (dps / max).toFixed(4) * 750 + "px";
        },
        getBarWidth(row, i, listItem) {
            let data = listItem.data;
            let max = 0;
            if (listItem.type === "player") {
                max = data[0]?.dps || 0;
            } else if (listItem.type) {
                max = data[0]?.[this.options[listItem.active]?.key] || 0;
            } else {
                // 团队通关速度 - fight_time 越小越好，取最小值作为最大宽度基准
                max = data[0]?.fight_time || 0;
            }
            if (max == 0) {
                let num = 368 / data.length;
                return 198 + i * num + "px";
            }
            let val =
                listItem.type === "player"
                    ? row.dps
                    : listItem.type
                    ? row[this.options[listItem.active]?.key]
                    : row.fight_time;
            return (val / max).toFixed(4) * 580 + "px";
        },
        showTime(val) {
            return showTime(new Date(val * 1000));
        },
        showTC(val) {
            let s = val / 1000;
            return ~~(s / 60) + "分" + ~~(s % 60) + "秒";
        },
        handleImgError(e) {
            e.target.src = require("@/assets/img/rank/misc/null.png");
        },
    },
};
</script>
