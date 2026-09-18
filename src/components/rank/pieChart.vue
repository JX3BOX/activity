<template>
    <div class="c-chart" :class="{ 'is-app-chart': appMode }" :style="{ '--height': chartHeight }">
        <v-chart :option="pieOption" theme="jx3box-dark" ref="chart" />
        <slot></slot>
    </div>
</template>

<script>
import colorData from "@jx3box/jx3box-data/data/xf/colors.json";
const { colors_by_school_name, colors_by_mount_name } = colorData;
export default {
    name: "pieChart",
    components: {
        // HelloWorld
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        data: {
            type: Array,
            required: false,
        },
        desc: {
            type: String,
            required: false,
        },
        isCustomColor: {
            type: Boolean,
            default: true,
        },
        isSmall: {
            type: Boolean,
            default: false,
        },
        appMode: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        data(newVal, oldVal) {
            this.pieOption.series[0].data = newVal;
        },
    },
    data() {
        let data = [];

        for (let i = 0; i <= 360; i++) {
            let t = (i / 180) * Math.PI;
            let r = Math.sin(2 * t) * Math.cos(2 * t);
            data.push([r, i]);
        }

        return {
            pieOption: {
                backgroundColor: "transparent",
                title: {
                    text: `${this.title}统计图`,
                    left: "center",
                    top: this.appMode ? 14 : "auto",
                    textStyle: { fontSize: this.appMode ? 14 : 18 },
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                legend: {
                    type: this.appMode && this.data?.length > 8 ? "scroll" : "plain",
                    orient: "horizontal",
                    left: "center",
                    top: "bottom",
                    bottom: this.appMode ? 10 : "auto",
                    data: this.data?.map((item) => item["name"]),
                    icon: "circle",
                    itemGap: this.appMode ? 8 : 10,
                    textStyle: { fontSize: this.appMode ? 10 : 12 },
                },
                series: [
                    {
                        name: this.title,
                        type: "pie",
                        data: this.data,
                        radius: this.appMode ? (this.isSmall ? "56%" : "62%") : this.isSmall ? "67%" : "75%",
                        center: this.appMode ? ["50%", "50%"] : undefined,
                        label: this.appMode
                            ? {
                                  // 保留扇区文字，以较小字号并由 ECharts 自动避让重叠。
                                  show: true,
                                  fontSize: 9,
                                  formatter: "{b}\n{d}%",
                              }
                            : this.isSmall
                            ? {
                                  fontSize: 12,
                                  formatter: "{b}\n{d}%",
                              }
                            : {},
                        labelLine: this.appMode
                            ? {
                                  show: true,
                              }
                            : undefined,
                        labelLayout: this.appMode
                            ? {
                                  hideOverlap: true,
                              }
                            : undefined,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(255, 255, 255, 1)",
                            },
                        },
                        itemStyle: {
                            color: this.isCustomColor
                                ? (param) => {
                                      return colors_by_school_name[param.name] || colors_by_mount_name[param.name];
                                  }
                                : "",
                        },
                    },
                ],
            },
        };
    },
    computed: {
        chartHeight() {
            if (!this.appMode) return this.isSmall ? "600px" : "700px";
            // 给标题与底部图例预留固定区域，避免数据标签贴边。
            return this.isSmall ? "270px" : "320px";
        },
        isName() {
            return false;
        },
    },
    methods: {
        name() {},
    },
};
</script>

<style scoped lang="less">
.c-chart {
    .mt(100px);
}
.echarts {
    width: 100%;
    height: var(--height);
}
</style>
