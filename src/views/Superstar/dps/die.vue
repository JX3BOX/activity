<!--
 * @Author: zhusha 
 * @Date: 2024-07-22 02:43:39
 * @LastEditors: zhusha
 * @LastEditTime: 2024-07-29 10:41:17
 * @Description: 死亡数据统计
 * 
 * Copyright (c) 2024 by zhusha, email: no email, All Rights Reserved. 
-->
<template>
    <div class="m-superstar-die">
        <div class="m-superstar-title">死亡数据统计</div>
        <div class="u-data-box">
            <div class="u-data-left">
                <div class="u-die-pie">
                    <v-chart :options="pieOption" ref="chart" />
                </div>
            </div>
            <div class="u-date-right">
                <div class="u-die-box">
                    <div class="u-die-item" v-for="(item, i) in data" :key="i">
                        <div class="u-die-log"><img :src="item.team_logo" /></div>
                        <div class="u-die-number">{{ item.death }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    components: {},
    data() {
        return {
            pieOption: {},
        };
    },
    watch: {
        data: {
            immediate: true,
            handler: function (val) {
                val && this.setPie();
            },
        },
    },
    created() {},
    mounted() {},
    methods: {
        setPie() {
            let arr = [],
                legend = [];

            this.data.forEach((item) => {
                arr.push({
                    name: item.team,
                    value: item.death,
                });
                legend.push(item.team);
            });
            let options = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}",
                },

                // legend: {
                //     type: "plain",
                //     orient: "horizontal",
                //     data: legend,
                //     icon: "circle",
                // },

                series: [
                    {
                        name: "死亡数",
                        type: "pie",
                        data: arr,
                        radius: "80%",
                        label: {
                            normal: {
                                position: "inner", // 文本位置
                                show: true,
                                formatter: "{b}: {c}",
                                minShowLabelPercent: 1, // 最小显示的百分比为1%
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false,
                            },
                        },
                    },
                ],
            };
            this.$nextTick(() => {
                this.pieOption = options;
            });
        },
    },
};
</script>

<style></style>
