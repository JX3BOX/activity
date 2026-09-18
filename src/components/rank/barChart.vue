<template>
    <div class="c-chart" :class="{ 'is-app-chart': appMode }" :style="{ '--height': chartHeight }">
        <v-chart :option="barOption" theme="jx3box-dark" />
        <slot></slot>
    </div>
</template>

<script>
import colorData from "@jx3box/jx3box-data/data/xf/colors.json";
const { colors_by_school_name, colors_by_mount_name } = colorData;
const defaultBarColor = {
    type: "linear",
    x: 0,
    y: 0,
    x2: 0.4,
    y2: 0,
    colorStops: [
        {
            offset: 0,
            color: "#dd6b6648",
        },
        {
            offset: 1,
            color: "#dd6b66",
        },
    ],
    globalCoord: true,
};
export default {
    name: "barChart",
    components: {
        // HelloWorld
    },
    props: {
        data: {
            type: Array,
            required: true,
        },
        desc: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: true,
        },
        height: {
            type: String,
            default: "800px",
        },
        isCustomColor: {
            type: Boolean,
            default: true,
        },
        seriesName: {
            type: String,
            default: "团队数量",
        },
        appMode: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        data(newVal, oldVal) {
            this.barOption.series[0].data = newVal;
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
            barOption: {
                backgroundColor: "transparent",
                title: {
                    show: true,
                    text: `${this.title}统计图`,
                    textStyle: { fontSize: this.appMode ? 14 : 18 },
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },
                grid: {
                    left: "3%",
                    // App 保持完整绘图区，不能为数值标签预留过大的右侧空白。
                    right: this.appMode ? "0%" : "4%",
                    bottom: this.appMode ? "6%" : "3%",
                    top: this.appMode ? "14%" : undefined,
                    containLabel: true,
                },
                xAxis: {
                    type: "value",
                    boundaryGap: [0, 0.01],
                    position: "top",
                    minInterval: 1,
                    splitNumber: this.appMode ? 4 : undefined,
                    axisLabel: { fontSize: this.appMode ? 10 : 12 },
                },
                yAxis: {
                    type: "category",
                    axisLabel: { fontSize: this.appMode ? 10 : 12 },
                },
                series: [
                    {
                        name: this.seriesName,
                        type: "bar",
                        data: this.data,
                        barMaxWidth: this.appMode ? 22 : undefined,
                        barCategoryGap: this.appMode ? "20%" : undefined,
                        label: this.appMode
                            ? {
                                  show: true,
                                  position: "insideRight",
                                  color: "#fff",
                                  fontSize: 11,
                                  formatter: (params) => {
                                      const value = Array.isArray(params.value) ? params.value[0] : params.value;
                                      return Number(value).toLocaleString();
                                  },
                              }
                            : undefined,
                        itemStyle: {
                            color: this.isCustomColor
                                ? (param) => {
                                      const name = Array.isArray(param.data) ? param.data[1] : param.name;
                                      return colors_by_school_name[name] || colors_by_mount_name[name] || defaultBarColor;
                                  }
                                : defaultBarColor,
                        },
                    },
                ],
            },
        };
    },
    computed: {
        chartHeight() {
            if (!this.appMode) return this.height;
            // 每条数据至少保留 20px 的纵向空间，保证柱体和内部数值清晰可读。
            return `${Math.max(300, (this.data?.length || 0) * 20 + 90)}px`;
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
    .mt(50px);
}
.echarts {
    width: 100%;
    height: var(--height);
}
</style>
