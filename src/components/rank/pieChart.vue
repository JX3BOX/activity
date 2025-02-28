<template>
    <div class="c-chart" :style="{'--height': isSmall ? '600px' : '700px'}">
        <v-chart :options="pieOption" theme="jx3box-dark" ref="chart" />
        <slot></slot>
    </div>
</template>

<script>
import { colors_by_school_name, colors_by_mount_name } from "@jx3box/jx3box-data/data/xf/colors.json";
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
                backgroundColor: 'transparent',
                title: {
                    text: `${this.title}统计图`,
                    left: "center",
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                legend: {
                    type: "plain",
                    orient: "horizontal",
                    left: "center",
                    top: "bottom",
                    data: this.data?.map((item) => item["name"]),
                    icon: "circle",
                },
                series: [
                    {
                        name: this.title,
                        type: "pie",
                        data: this.data,
                        radius: this.isSmall ? "67%" : "75%",
                        label: this.isSmall
                            ? {
                                  fontSize: 12,
                                  formatter: "{b}\n{d}%"
                              }
                            : {},
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
                                        return colors_by_school_name[param.name] || colors_by_mount_name[param.name]
                                  }
                                : "",
                        },
                    },
                ],
            },
        };
    },
    computed: {
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
