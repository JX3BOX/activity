<template>
    <div class="m-site-left">
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
            <div :class="'u-top-' + color"></div>
            <div class="u-team-box_item u-xf" :class="'u-center-' + color">
                <!-- 排行 -->
                <div class="u-team-rank_left">
                    <div class="u-team-rank_itemNo" v-for="(item, i) in data" :key="i + 'rank'">
                        <div class="u-sort">{{ item.forceName }}</div>
                        <div class="u-logo">
                            <el-image :src="showMount(item.xfId)" fit="fill"></el-image>
                        </div>
                        <div class="u-line"></div>
                        <div
                            class="u-name"
                            :style="{ background: showMountColor(item.xfId), width: getBarWidth(item.dps) }"
                        >
                            {{ item.forceName }}
                        </div>
                        <div class="u-number">{{ item.dps || 0 }}</div>
                    </div>
                </div>
            </div>
            <div :class="'u-bottom-' + color"></div>
        </div>
    </div>
</template>

<script>
import { __imgPath, __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
import xf from "@jx3box/jx3box-data/data/xf/xf.json";
import { showTime } from "@jx3box/jx3box-common/js/moment";
import { getThumbnail, getLink, showMountIcon } from "@jx3box/jx3box-common/js/utils";
import { orderBy } from "lodash";
import { colors_by_mount_name } from "@jx3box/jx3box-data/data/xf/colors.json";
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
    },
    data() {
        return {
            imgurl: __imgPath + "topic/menpaitiantuan/",
            active: 0,
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
        init() {
            let res = this.origin_data[this.active];
            res.forEach((item) => {
                for (let key in xf) {
                    if (xf[key].force == item.forceId) {
                        item.xfId = xf[key].id;
                        break;
                    }
                }
            });
            this.data = orderBy(res, ["dps"], ["desc"]);
        },
        jclLink(id) {
            return `/jcl/view?id=${id}`;
        },
        battleLink(id) {
            return "/battle/#/combat/" + id;
        },
        showMount: function (mount) {
            let mountIcon = __imgPath + "image/xf/" + mount + ".png";
            return mountIcon;
        },
        showMountSvg: function (mount) {
            let mountIcon = __cdn + "design/vector/mount/" + mount + ".svg";
            return mountIcon;
        },
        showMountColor: function (val) {
            let xfname = xfmap[val] || "通用";
            return colors_by_mount_name[xfname] || "#fff";
        },
        getBarWidth(dps) {
            let max = this.data[0].dps;
            return (dps / max).toFixed(4) * 750 + "px";
        },
        teamLogo: function (val, size = 40) {
            if (!val) return "";
            return getThumbnail(val, size, true);
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
