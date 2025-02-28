<template>
    <!-- 统计分析 -->
    <div
        class="m-rank-stat"
        v-loading="loading"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.3)"
    >
        <!-- Boss导航 -->
        <rank-boss :data="bossList" :aid="current_boss" @update="changeBoss" />
        <img
            :src="null_img_url"
            class="m-rank-null"
            v-if="
                stats['top10_achieve_team_count'] == undefined ||
                stats['top10_achieve_team_count'][current_boss] == undefined
            "
        />
        <template v-else>
            <template v-for="item of chartArr">
                <bar-chart
                    :key="item.title"
                    v-if="item.chartType == 'bar'"
                    :data="item.data"
                    :title="item.title"
                    :seriesName="item.seriesName"
                    :height="item.height"
                    :class="{
                        'chart-left': item.position === 'left',
                        'chart-right': item.position === 'right',
                    }"
                >
                </bar-chart>
                <pie-chart
                    :key="item.title"
                    v-if="item.chartType == 'pie'"
                    :data="item.data"
                    :title="item.title"
                    :isCustomColor="item.isCustomColor === undefined ? true : item.isCustomColor"
                    :isSmall="item.position !== undefined"
                    :class="{
                        'chart-left': item.position === 'left',
                        'chart-right': item.position === 'right',
                    }"
                ></pie-chart>
            </template>
        </template>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import schools from "@jx3box/jx3box-data/data/xf/school.json";
import xfids from "@jx3box/jx3box-data/data/xf/xfid.json";
import mount_group from "@jx3box/jx3box-data/data/xf/mount_group.json";
import { axios, realUrl } from "@/service/rank/api.js";
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";
import BarChart from "@/components/rank/barChart.vue";
import PieChart from "@/components/rank/pieChart.vue";
import rank_boss from "@/components/rank/rank_boss.vue";

export default {
    name: "Stat",
    components: {
        BarChart,
        PieChart,
        "rank-boss": rank_boss,
    },
    data: function () {
        return {
            null_img_url: __imgPath + "image/rank/common/null.png",
            loading: false,
            current_boss: "all",
            stats: {},
            chartName: [
                { name: "前十名区服分布", type: "bar" },
                { name: "区服入榜团队数量", type: "bar" },
                { name: "全门派出场率", type: "pie" },
                { name: "全心法出场率", type: "pie" },
                { name: "各团出场治疗心法数量", type: "pie" },
                { name: "各治疗心法出场率", type: "pie" },
                { name: "各团出场防御心法数量", type: "pie" },
                { name: "各防御心法出场率", type: "pie" },
                { name: "各输出心法出场率", type: "pie" },
                { name: "输出心法平均伤害量", type: "bar" },
                { name: "各输出心法平均DPS", type: "bar" },
                { name: "内外功出场比例", type: "pie" },
                { name: "内外功输出占比", type: "pie" },
                { name: "内功心法伤害DPS", type: "bar" },
                { name: "外功心法伤害DPS", type: "bar" },
                { name: "治疗心法平均治疗量", type: "bar" },
                { name: "治疗心法平均HPS", type: "bar" },
                { name: "团长职业类型分布", type: "pie" },
            ], //图表名称与图表数据内保持一致，用于排序
            chartArr: [],
        };
    },
    computed: {
        id: function () {
            return this.$store.state.id;
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
    mounted() {
        if (this.$route.query.aid) {
            this.current_boss = this.$route.query.aid;
        }
        this.getStats();
    },
    methods: {
        changeBoss: function (val) {
            this.current_boss = val;
            this.server = "";

            if (this.stats["top10_achieve_team_count"][this.current_boss] == undefined) {
                return false;
            }
            this.chartArr = [];
            for (let item = 1; item <= 15; ++item) {
                eval(`this.doAna${item}()`);
            }
            let arr = [],
                chartName = this.chartName;
            for (let i = 0; i < chartName.length; i++) {
                if (this.chartArr[chartName[i].name]) {
                    this.chartArr[chartName[i].name].chartType = chartName[i].type;
                    arr.push(this.chartArr[chartName[i].name]);
                }
            }
            this.$set(this, "chartArr", arr);
        },

        getschoolName(id) {
            for (let key in schools) {
                if (id == schools[key].force_id) {
                    return key;
                }
            }
            return "江湖";
        },
        getStats() {
            this.loading = true;
            return axios(realUrl(__Root, `data/analysis-dungeon-rank/output/event_${this.id}.json`), "GET", false)
                .then((res) => {
                    this.stats = res;
                    // this.stats = event_5;
                    this.changeBoss(this.current_boss);
                })
                .catch((err) => {
                    console.log(err);
                    // this.$message.error("加载统计文件失败");
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        doAna1() {
            // 1-区服-bar: 区服入榜团队数量,
            if (this.current_boss == "0") {
                return false;
            }
            if (!this.stats["server_rank_team_count"]) {
                return false;
            }
            let fullData = this.stats["server_rank_team_count"][this.current_boss];
            if (!fullData) {
                return;
            }
            let data = fullData.value;
            let exist_servers = fullData.item;
            let servers = exist_servers?.map((server, i) => {
                return [data[i], server];
            });
            this.chartArr["区服入榜团队数量"] = {
                data: servers.reverse(),
                title: "区服入榜团队数量",
            };
        },
        doAna2() {
            // 2-全门派出场率-pie
            if (this.current_boss == "0") {
                return false;
            }
            if (!this.stats["force_attendance_count"]) {
                return false;
            }
            let fullData = this.stats["force_attendance_count"][this.current_boss];
            if (!fullData) {
                return;
            }
            let data = fullData.value;
            let exist_servers = fullData.item;
            let _this = this;
            let servers = exist_servers?.map((server, i) => {
                return { value: data[i], name: _this.getschoolName(server) };
            });
            this.chartArr["全门派出场率"] = { data: servers, title: "全门派出场率" };
        },
        doAna3() {
            // 3-全心法出场率-pie
            if (this.current_boss == "0") {
                // this.ana[3] = undefined;
                return false;
            }
            if (!this.stats["mount_attendance_count"]) {
                // this.ana[3] = undefined;
                return false;
            }
            let fullData = this.stats["mount_attendance_count"][this.current_boss];
            if (!fullData) {
                return;
            }
            let data = fullData.value;
            let exist_servers = fullData.item;
            let servers = exist_servers?.map((server, i) => {
                return { value: data[i], name: xfids[server] };
            });
            this.chartArr["全心法出场率"] = { data: servers, title: "全心法出场率" };
        },
        doAna4() {
            // 4-Boss奶妈数量-pie
            if (this.current_boss == "0") {
                return false;
            }
            if (!this.stats["hps_count"]) {
                return false;
            }
            let fullData = this.stats["hps_count"][this.current_boss];
            if (!fullData) {
                return;
            }
            let data = fullData.value;
            let item = fullData.item;
            let _this = this;
            let servers = item?.map((name, i) => {
                return { value: data[i], name: name + "个" };
            });
            this.chartArr["各团出场治疗心法数量"] = {
                data: servers,
                title: "各团出场治疗心法数量",
                isCustomColor: false,
                position: "left",
            };
        },
        doAna5() {
            // 5-Boss奶妈各心法比例-pie 各治疗心法出场率
            if (this.current_boss == "0") {
                return false;
            }
            if (!this.stats["hps_attendance_count"]) {
                return false;
            }
            let fullData = this.stats["hps_attendance_count"][this.current_boss];
            if (!fullData) {
                return;
            }
            let data = fullData.value;
            let exist_servers = fullData.item;
            let servers = exist_servers?.map((server, i) => {
                return { value: data[i], name: xfids[server] };
            });
            this.chartArr["各治疗心法出场率"] = {
                data: servers,
                title: "各治疗心法出场率",
                position: "right",
            };
        },
        doAna6() {
            // 6-BossT数量-pie 各团出场防御心法数量
            if (this.current_boss == "0") {
                // this.ana[6] = undefined;
                return false;
            }
            if (!this.stats["tank_count"]) {
                // this.ana[6] = undefined;
                return false;
            }
            let fullData = this.stats["tank_count"][this.current_boss];
            if (!fullData) {
                return;
            }
            let data = fullData.value;
            let item = fullData.item;
            let _this = this;
            let servers = item?.map((name, i) => {
                return { value: data[i], name: name + "个" };
            });
            this.chartArr["各团出场防御心法数量"] = {
                data: servers,
                title: "各团出场防御心法数量",
                isCustomColor: false,
                position: "left",
            };
        },
        doAna7() {
            // 7-BossT各心法比例-pie
            if (this.current_boss == "0") {
                // this.ana[7] = undefined;
                return false;
            }
            if (!this.stats["tank_attendance_count"]) {
                // this.ana[7] = undefined;
                return false;
            }
            let fullData = this.stats["tank_attendance_count"][this.current_boss];
            if (!fullData) {
                return;
            }
            let data = fullData.value;
            let exist_servers = fullData.item;
            let servers = exist_servers?.map((server, i) => {
                return { value: data[i], name: xfids[server] };
            });
            this.chartArr["各防御心法出场率"] = {
                data: servers,
                title: "各防御心法出场率",
                position: "right",
            };
        },
        doAna8() {
            // 8-BossDPS各心法比例-pie
            if (this.current_boss == "0") {
                // this.ana[8] = undefined;
                return false;
            }
            if (!this.stats["dps_count"]) {
                // this.ana[8] = undefined;
                return false;
            }
            let fullData = this.stats["dps_count"][this.current_boss];
            if (!fullData) {
                return;
            }
            let data = fullData.value;
            let exist_servers = fullData.item;
            let servers = exist_servers?.map((server, i) => {
                return { value: data[i], name: xfids[server] };
            });

            this.chartArr["各输出心法出场率"] = {
                data: servers,
                title: "各输出心法出场率",
            };
        },
        doAna9() {
            // 9-Boss外功内功比例-pie 内外功出场比例
            if (this.current_boss == "0") {
                // this.ana[10] = undefined;
                return false;
            }
            if (!this.stats["mount_type_attendance_count"]) {
                // this.ana[10] = undefined;
                return false;
            }
            let fullData = this.stats["mount_type_attendance_count"][this.current_boss];
            if (!fullData) {
                return;
            }
            let data = fullData.value;
            let item = fullData.item;
            let servers = item?.map((name, i) => {
                if (name == "外攻") {
                    return { value: data[i], name: name, itemStyle: { color: "rgb(255,255,2)" } };
                } else {
                    return { value: data[i], name: name, itemStyle: { color: "rgb(0,204,255)" } };
                }
            });
            this.chartArr["内外功出场比例"] = {
                data: servers,
                title: "内外功出场比例",
                isCustomColor: false,
            };
        },
        doAna10() {
            // 10-团长职业类型分布-pie
            if (this.current_boss == "0") {
                // this.ana[11] = undefined;
                return false;
            }
            if (!this.stats["leader_mount_type_count"]) {
                // this.ana[11] = undefined;
                return false;
            }
            let fullData = this.stats["leader_mount_type_count"][this.current_boss];
            if (!fullData) {
                return;
            }
            let data = fullData.value;
            let item = fullData.item;
            let servers = item?.map((name, i) => {
                return { value: data[i], name: name };
            });
            this.chartArr["团长职业类型分布"] = {
                data: servers,
                title: "团长职业类型分布",
                isCustomColor: false,
            };
        },
        doAna11() {
            // 11-前十区服分布
            if (this.current_boss == "0") {
                // this.ana[12] = undefined;
                return false;
            }
            if (!this.stats["top10_achieve_team_count"]) {
                // this.ana[12] = undefined;
                return false;
            }
            let fullData = this.stats["top10_achieve_team_count"][this.current_boss];
            if (!fullData) {
                return;
            }
            let data = fullData.value;
            let exist_servers = fullData.item;
            let servers = exist_servers?.map((server, i) => {
                return [data[i], server];
            });
            this.chartArr["前十名区服分布"] = {
                data: servers.reverse(),
                title: "前十名区服分布",
                height: "450px",
            };
        },
        doAna12() {
            // 12-全心法伤害综合DPS
            if (this.current_boss == "0") {
                // this.ana[13] = undefined;
                return false;
            }
            if (!this.stats["rank_mount_dps"]) {
                // this.ana[13] = undefined;
                return false;
            }
            let fullData = this.stats["rank_mount_dps"][this.current_boss];
            if (!fullData) {
                return;
            }
            let data = fullData.value;
            let item = fullData.item;
            let servers = item?.map((server, i) => {
                // return [data[i], server];
                return [parseInt(data[i]), xfids[server]];
            });
            this.chartArr["各输出心法平均DPS"] = {
                data: servers.reverse(),
                title: "各输出心法平均DPS",
                seriesName: "DPS",
            };
            // let dpsRatio=item?.map((name,i)=>{
            //     return {value:parseInt(data[i]), name:xfids[name]};
            // });
            //
            // this.chartArr['各输出心法DPS占比']={
            //     data: dpsRatio.reverse(),
            //     title: "各输出心法DPS占比",
            //     seriesName:'DPS'
            // };
            //筛选内外功分别统计
            let nei = [],
                wai = [],
                neiArr = mount_group.mount_types["内功"],
                waiArr = mount_group.mount_types["外功"],
                nei_dps = 0,
                wai_dps = 0;
            for (let i = 0; i < item.length; i++) {
                if (neiArr.includes(item[i])) {
                    // nei_dps=nei_dps+data[i]
                    nei.push([parseInt(data[i]), xfids[item[i]]]);
                }
                if (waiArr.includes(item[i])) {
                    // wai_dps=wai_dps+data[i]
                    wai.push([parseInt(data[i]), xfids[item[i]]]);
                }
            }

            this.chartArr["内功心法伤害DPS"] = {
                data: nei.reverse(),
                title: "内功心法伤害DPS",
                seriesName: "DPS",
                // position:'left'
            };

            this.chartArr["外功心法伤害DPS"] = {
                data: wai.reverse(),
                title: "外功心法伤害DPS",
                seriesName: "DPS",
                // position:'right'
            };
        },
        doAna13() {
            if (this.current_boss == "0") {
                // this.ana[17] = undefined;
                return false;
            }
            if (!this.stats["rank_mount_hps"]) {
                // this.ana[17] = undefined;
                return false;
            }
            let fullData = this.stats["rank_mount_hps"][this.current_boss];
            if (!fullData) {
                return;
            }
            let data = fullData.value;
            let item = fullData.item;
            let servers = item?.map((server, i) => {
                // return [data[i], server];
                return [parseInt(data[i]), xfids[server]];
            });
            this.chartArr["治疗心法平均HPS"] = {
                data: servers.reverse(),
                title: "治疗心法平均HPS",
                seriesName: "HPS",
                height: "450px",
            };
        },
        doAna14() {
            if (this.current_boss == "0") {
                // this.ana[17] = undefined;
                return false;
            }
            if (!this.stats["rank_mount_therapy"]) {
                // this.ana[17] = undefined;
                return false;
            }
            let fullData = this.stats["rank_mount_therapy"][this.current_boss];
            if (!fullData) {
                return;
            }
            let data = fullData.value;
            let item = fullData.item;
            let servers = item?.map((server, i) => {
                // return [data[i], server];
                return [parseInt(data[i]), xfids[server]];
            });
            this.chartArr["治疗心法平均治疗量"] = {
                data: servers.reverse(),
                title: "治疗心法平均治疗量",
                seriesName: "治疗量",
                height: "450px",
            };
        },
        doAna15() {
            if (this.current_boss == "0") {
                // this.ana[17] = undefined;
                return false;
            }
            if (!this.stats["rank_mount_damage"]) {
                // this.ana[17] = undefined;
                return false;
            }
            let fullData = this.stats["rank_mount_damage"][this.current_boss];
            if (!fullData) {
                return;
            }
            let data = fullData.value;
            let item = fullData.item;
            let servers = item?.map((server, i) => {
                // return [data[i], server];
                return [parseInt(data[i]), xfids[server]];
            });
            this.chartArr["输出心法平均伤害量"] = {
                data: servers.reverse(),
                title: "输出心法平均伤害量",
                seriesName: "伤害量",
            };
        },
    },
    filters: {},
};
</script>

<style lang="less">
@import "~@/assets/css/rank/race_stat.less";
</style>
