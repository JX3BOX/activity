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
                            @click="onTabChange(item, tab.value)"
                            >{{ tab.name }}</span
                        >
                    </div>
                    <div class="m-box-none" v-if="item.bg === 'none'">
                        <div class="m-xf-list">
                            <div class="u-xf-item" v-for="(row, rowIdx) in item.data" :key="rowIdx + 'rank'">
                                <div class="u-sort">{{ row.forceName || "未知" }}</div>
                                <div class="u-logo">
                                    <el-image :src="showMount(row.xfId)" fit="fill"></el-image>
                                </div>
                                <div class="u-line"></div>
                                <div
                                    class="u-name"
                                    :style="{
                                        background: showXfMountColor(row.xfId),
                                        width: getXfBarWidth(row.dps, row.forceName),
                                    }"
                                >
                                    {{ row.forceName || "未知" }}
                                </div>
                                <div class="u-number">{{ row.dps || 0 }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="m-box" :class="`m-box-${item.bg}`" v-else>
                        <!-- 详细信息 -->
                        <div class="m-info">
                            <img
                                class="u-img"
                                v-if="item.key === 'player'"
                                :src="showMount(item.curItem.xfId)"
                                @error="handleImgError"
                            />
                            <img
                                class="u-img"
                                v-else
                                :src="teamLogo(item.curItem.team_logo, 158)"
                                @error="handleImgError"
                            />
                            <div class="u-name" :class="item.key == 'player' ? 'player' : ''">
                                {{ item.key === "player" ? item.curItem.playerName : item.curItem.team_name }}
                            </div>
                            <div class="u-server">@{{ item.curItem.team_server }}</div>
                            <div class="u-time">
                                <template v-if="!item.type"
                                    >战斗用时:<span>{{ showTC(item.curItem.fight_time) }}</span></template
                                >
                                <template v-else-if="item.key === 'player'"
                                    >{{ options[item.active]?.name || "-" }}:<span>{{ item.curItem.dps || 0 }}</span>
                                </template>
                                <template v-else
                                    >{{ options[item.active]?.name || "-" }}:<span>{{
                                        item.curItem[options[item.active]?.key] || 0
                                    }}</span>
                                </template>
                            </div>
                            <div
                                class="u-team-btn"
                                :class="{ two: item.curItem.jx3box_jcl_id && item.curItem.jx3box_battle_id }"
                            >
                                <a
                                    :href="jclLink(item.curItem.jx3box_jcl_id)"
                                    target="_blank"
                                    class="u-icon"
                                    v-if="item.curItem.jx3box_jcl_id"
                                >
                                    <img :src="imgUrl + 'dps-jcl.png'" />
                                </a>
                                <a
                                    :href="battleLink(item.curItem.jx3box_battle_id)"
                                    target="_blank"
                                    class="u-icon"
                                    v-if="item.curItem.jx3box_battle_id"
                                >
                                    <img :src="imgUrl + 'dps-battle.png'" />
                                </a>
                            </div>
                        </div>
                        <!-- 排行列表 -->
                        <div class="m-rank-list">
                            <div
                                class="u-rank-item"
                                :class="{
                                    active: item.activeId == (item.key === 'player' ? row.playerName : row.ID),
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
                                <div
                                    class="u-name"
                                    :class="item.key == 'player' ? 'player' : ''"
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
import { __imgPath, __cdn, __Root } from "@/utils/config";
import { getTop100, getDps } from "@/service/rank/superstar.js";
import { getEvents } from "@/service/rank/event.js";
import { showTime } from "@jx3box/jx3box-common/js/moment";
import { getThumbnail } from "@jx3box/jx3box-common/js/utils";
import PICS from "@/assets/js/pics.js";
import colorData from "@jx3box/jx3box-data/data/xf/colors.json";
const { colors_by_mount_name } = colorData;
import { orderBy } from "lodash";
import xf from "@jx3box/jx3box-data/data/xf/xf.json";
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
            dataLoaded: false, // 标记 loadData 是否至少执行过一次
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
                {
                    title: "四维数据统计（团队）",
                    type: true,
                    bg: "right",
                    data: [],
                    active: 0,
                    activeId: null,
                    curItem: {},
                    key: "team",
                },
                {
                    title: "四维数据统计（心法·平均）",
                    type: true,
                    bg: "none",
                    data: [],
                    active: 0,
                    activeId: null,
                    curItem: {},
                    key: "xf",
                },
                {
                    title: "四维数据统计（个人）",
                    type: true,
                    bg: "left",
                    data: [],
                    active: 0,
                    activeId: null,
                    curItem: {},
                    key: "player",
                },
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
            console.log(this.achieves);
            this.achieves.forEach((item) => {
                dict[item.achievement_id] = item.name;
            });
            return dict;
        },
    },
    watch: {
        achieve_id: {
            handler: function (val) {
                // 同步 store 中的 bossID，确保 SuperstarBoss 组件 active 状态一致
                this.$store.state.bossID = val;
                if (val && Object.keys(this.bossList).length) {
                    this.dataLoaded = true;
                    this.loadData();
                }
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
        bossList: {
            handler: function (val) {
                if (this.achieve_id && Object.keys(val).length && !this.dataLoaded) {
                    this.dataLoaded = true;
                    this.loadData();
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
            this.$store.state.bossID = val;
            this.$router.push({
                query: {
                    aid: val,
                },
            });
        },

        loadData: function () {
            if (!this.achieve_id) return;
            this.loading = true;
            const p1 = getTop100(this.achieve_id, this.id)
                .then((res) => {
                    this.origin_data = res.data.data || [];
                })
                .then(() => {
                    // getTop100 完成后刷新依赖 origin_data 的 clearSpeed 区块
                    const clearItem = this.dataList.find((item) => item.key === "clearSpeed");
                    if (clearItem) this.initItem(clearItem);
                })
                .catch((err) => {
                    console.warn("getTop100 请求失败:", err);
                    this.origin_data = [];
                });
            const p2 = this.getDpsData();
            Promise.all([p1, p2]).finally(() => {
                this.loading = false;
            });
        },
        getDpsData() {
            return getDps(this.id)
                .then((data) => {
                    let res = data.data;
                    if (!res) {
                        console.warn("getDps 返回数据为空");
                        this.resetDataList();
                        return;
                    }
                    let key = this.bossList[this.achieve_id];
                    let bossData = res[key.indexOf("&") == -1 ? key : key.split("&")[0]];
                    if (!bossData) {
                        console.warn(`getDps 中未找到 key 为 ${key} 的boss数据`);
                        this.resetDataList();
                        return;
                    }
                    let sortByTeam = [],
                        sortByForce = [],
                        sortByPlayer = [];
                    this.options.forEach((item) => {
                        sortByTeam.push(bossData[item.key]?.sortByTeam || []);
                        sortByForce.push(bossData[item.key]?.sortByForce || []);
                        sortByPlayer.push(bossData[item.key]?.sortByPlayer || []);
                    });
                    this.sortByTeam = sortByTeam;
                    this.sortByForce = sortByForce;
                    this.sortByPlayer = sortByPlayer;
                    this.dataList.forEach((item) => {
                        this.initItem(item);
                    });
                })
                .catch((err) => {
                    console.warn("getDps 请求失败:", err);
                    this.resetDataList();
                });
        },
        // 当 getDps 数据不存在时，重置 dataList
        resetDataList() {
            this.sortByTeam = [];
            this.sortByForce = [];
            this.sortByPlayer = [];
            this.dataList.forEach((item) => {
                item.data = [];
                item.curItem = {};
                item.activeId = null;
            });
        },
        // 根据 key 初始化对应区块数据
        initItem(listItem) {
            let arr = [];
            if (listItem.key === "clearSpeed") {
                arr = orderBy(this.origin_data, ["fight_time"], ["aes"]);
                // 过滤掉 fight_time 为 0 的
                arr = arr.filter((item) => item.fight_time > 0);
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
                // 过滤掉当前维度值为 0 的
                arr = arr.filter((item) => item[key] > 0);
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
                // 过滤掉 dps 为 0 的
                arr = arr.filter((item) => item.dps > 0);
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
                    const playerName = item.playerName.split("·");
                    arr.push(
                        Object.assign(item, {
                            playerName: playerName[0],
                            team_name: item.team,
                            team_server: playerName[1] ? playerName[1] : item.server,
                            fight_time: item.timeDuring * 1000,
                            created: item.timeBegin,
                            ID: item.team_id,
                            xfId: xfid,
                        })
                    );
                });
                arr = orderBy(arr, ["dps"], ["desc"]);
                // 过滤掉 dps 为 0 的
                arr = arr.filter((item) => item.dps > 0);
            }
            listItem.data = arr;
            listItem.curItem = arr[0] || {};
            listItem.activeId = listItem.key === "player" ? arr[0]?.playerName || null : arr[0]?.ID || null;
        },
        // tab 切换
        onTabChange(listItem, value) {
            listItem.active = value;
            this.initItem(listItem);
        },
        // 点击排行项
        onItemClick(listItem, row) {
            listItem.curItem = row;
            listItem.activeId = listItem.key === "player" ? row.playerName : row.ID;
        },
        // === 从 item.vue 合并的方法 ===
        jclLink(id) {
            return __Root + `jcl/view?id=${id}`;
        },
        battleLink(id) {
            return __Root + "battle/combat/" + id;
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
            if (listItem.key === "player") {
                let xfname = xfmap[row.xfId] || "通用";
                let color = colors_by_mount_name[xfname] || "#fff";
                return `linear-gradient(to right, ${color}, ${color}80)`;
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
            let color = index > colors.length ? colors[(index + 1) % colors.length] : colors[index];
            return `linear-gradient(to right, ${color}, ${color}4d)`;
        },
        // xfItem 专用：心法颜色
        showXfMountColor(val) {
            let xfname = xfmap[val] || "通用";
            return colors_by_mount_name[xfname] || "#fff";
        },
        // xfItem 专用：柱状图宽度
        getXfBarWidth(dps, forceName) {
            let xfItem = this.dataList.find((item) => item.key === "xf");
            let xfData = xfItem?.data || [];
            let max = xfData[0]?.dps || 0;
            if (max == 0) return "0px";
            let width = (dps / max).toFixed(4) * 750;
            // 计算统一最小宽度，确保所有心法名称完整显示
            if (xfItem._xfMinW === undefined && xfData.length) {
                let maxTextLen = 0;
                xfData.forEach((r) => {
                    let len = this.getTextWidth(r.forceName || "未知");
                    if (len > maxTextLen) maxTextLen = len;
                });
                xfItem._xfMinW = maxTextLen + 40;
            }
            width = Math.max(width, xfItem._xfMinW || 0);
            return width + "px";
        },
        getBarWidth(row, i, listItem) {
            let data = listItem.data;
            let max = 0;
            if (listItem.key === "player") {
                max = data[0]?.dps || 0;
            } else if (listItem.type) {
                max = data[0]?.[this.options[listItem.active]?.key] || 0;
            } else {
                // 团队通关速度 - fight_time 越大越慢，最后一名值最大
                max = data[data.length - 1]?.fight_time || 0;
            }
            if (max == 0) {
                let num = 368 / data.length;
                return 198 + i * num + "px";
            }
            let val =
                listItem.key === "player"
                    ? row.dps
                    : listItem.type
                    ? row[this.options[listItem.active]?.key]
                    : row.fight_time;
            // 容器 840px - 序号(~30px) - logo(32px) - 数值(~100px) - gap*3(54px) - padding(56px) - 滚动条(15px) ≈ 553px 可用
            let width = (val / max).toFixed(4) * 550;
            // 计算统一最小宽度：取所有条目中最长文本的宽度，确保所有名字完整显示且不破坏排序
            let cacheKey = "_minW_" + listItem.key + (listItem.type ? "_" + listItem.active : "");
            if (listItem[cacheKey] === undefined) {
                let maxTextLen = 0;
                data.forEach((r) => {
                    let text = "";
                    if (listItem.key === "player") {
                        text = r.playerName || "";
                    } else if (!listItem.type) {
                        text = (r.team_name || "") + "@" + (r.team_server || "");
                    } else {
                        text = (r.team_name || "") + "@" + (r.team_server || "");
                    }
                    let len = this.getTextWidth(text);
                    if (len > maxTextLen) {
                        maxTextLen = len;
                    }
                });
                // padding 40px + 文本宽度
                listItem[cacheKey] = maxTextLen + 40;
            }
            width = Math.max(width, listItem[cacheKey]);
            return width + "px";
        },
        showTime(val) {
            return showTime(new Date(val * 1000));
        },
        // 估算文本像素宽度（中文约20px，英文/数字约10px）
        getTextWidth(text) {
            let width = 0;
            for (let i = 0; i < text.length; i++) {
                let code = text.charCodeAt(i);
                if (code > 127) {
                    width += 20; // 中文字符
                } else {
                    width += 10; // 英文/数字
                }
            }
            return width;
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
