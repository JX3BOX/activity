<template>
    <div class="m-content m-info">
        <!-- 宣言 -->
        <div class="m-preface"><div class="u-info" v-html="preface"></div></div>
        <!-- 活动时间 -->
        <div class="wp">
            <div class="m-event-time">
                <div class="m-times">
                    <div class="m-time" :class="showTime(i)" v-for="(item, i) in event_time" :key="i">
                        <img class="u-icon" :src="`${imgRoot}web/info/ing.svg`" />
                        <img class="u-img" :src="`${imgRoot}web/info/img${i + 1}.png?jx3cxk`" />
                        <div class="u-title">{{ item.title }}</div>
                        <div class="u-time">{{ item.time }}</div>
                    </div>
                </div>
                <div class="u-line"></div>
            </div>
        </div>
        <!-- 宣言2 -->
        <div class="m-ready">
            <div class="u-info" v-html="jx3cxkData.ready"></div>
        </div>
        <!-- 参赛条件 -->
        <div class="m-condition">
            <h2>
                <img class="u-icon" :src="`${imgRoot}web/info/star.svg`" />
                <span>参赛条件</span>
            </h2>
            <ul>
                <li v-for="(item, i) in jx3cxkData.condition" :key="i">
                    <b class="u-no">{{ i + 1 }}</b>
                    <span>{{ item }}</span>
                </li>
                <li class="u-ps" v-html="jx3cxkData.condition_ps"></li>
            </ul>
        </div>
        <!-- 参赛步骤 -->
        <div class="m-step">
            <div class="u-step" v-for="(item, i) in step" :key="i">
                <h2>
                    <img class="u-icon" :src="`${imgRoot}web/info/star.svg`" />
                    <span>参赛步骤</span>
                    <b class="u-no" :style="{ marginRight: i == 1 ? '10px' : '' }">{{ i }}</b>
                </h2>
                <div class="u-info" v-html="item.info" @click="handleClick(i)"></div>
                <template v-if="item.img">
                    <img class="u-img" v-for="img in item.img" :key="img" :src="`${imgRoot}web/info/${img}?1`" />
                </template>
            </div>
        </div>
        <!-- 参赛奖励 -->
        <div class="m-reward wp">
            <div class="m-bg">
                <img class="u-img" :src="`${imgRoot}web/info/bg-jiangli_01.png`" />
                <div class="m-div"></div>
                <img class="u-img" :src="`${imgRoot}web/info/bg-jiangli_03.png`" />
            </div>
            <div class="m-reward-content">
                <img :src="`${imgRoot}web/prize${year}.jpg?jx3cxk`" />
            </div>
        </div>
    </div>
</template>
<script>
import dayjs from "dayjs";
import jx3cxkData from "@/assets/data/event/jx3cxk.json";
export default {
    inject: ["__imgRoot"],
    data() {
        return {
            jx3cxkData,
            imgRoot: this.__imgRoot,
        };
    },
    computed: {
        year() {
            let year = this.$route.query.year || new Date().getFullYear();
            year = parseInt(year);
            if (year < 2025) {
                year = 2025;
            }
            return year;
        },
        preface() {
            const baseYear = 2010;
            const curYear = this.year || new Date().getFullYear();
            const duration = curYear - baseYear;
            const durationChinese = this.numberToChinese(duration);
            let preface = this.jx3cxkData.preface || "";
            preface = preface.replace(/练习时长[^<]*半/, `练习时长${durationChinese}年半`);
            preface = preface.replace(/练习了[^<]*半/, `练习了${durationChinese}年半`);

            return preface;
        },
        event_time() {
            return this.jx3cxkData.event_time[this.year];
        },
        step() {
            const step = JSON.parse(JSON.stringify(this.jx3cxkData.step));
            const currentYear = this.year || new Date().getFullYear();
            const replaceText = currentYear < 2026 ? "" : currentYear.toString();
            step["2"].info = step["2"].info.replace(/2026/g, replaceText);
            return step;
        },
    },
    methods: {
        getEventStatus() {
            const currentDate = dayjs().startOf("day");
            const activityDate = dayjs(this.event_time[0].time).startOf("day");
            const voteDate = dayjs(this.event_time[1].time).startOf("day");
            const resultDate = dayjs(this.event_time[2].time).startOf("day");
            const status = {
                activity: "upcoming",
                vote: "upcoming",
                result: "upcoming",
            };
            if (currentDate.isAfter(activityDate) || currentDate.isSame(activityDate)) {
                status.activity = currentDate.isBefore(voteDate) ? "active" : "expired";
            }
            if (currentDate.isAfter(voteDate) || currentDate.isSame(voteDate)) {
                status.vote = currentDate.isBefore(resultDate) ? "active" : "expired";
            }
            if (currentDate.isAfter(resultDate)) {
                status.result = "expired";
            } else if (currentDate.isSame(resultDate)) {
                status.result = "active";
            }
            return status;
        },
        showTime(i) {
            const status = this.getEventStatus();
            const statusList = ["activity", "vote", "result"];
            return status[statusList[i]];
        },
        handleClick(i) {
            if (i == 2) {
                const text = "「2026剑三练习生」";
                navigator.clipboard.writeText(text).then(() => {
                    this.$message.success("复制成功");
                });
            }
        },
        numberToChinese(num) {
            const zh_num = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
            if (num >= 0 && num <= 10) {
                return zh_num[num];
            }
            if (num > 10 && num < 100) {
                const tens = Math.floor(num / 10);
                const units = num % 10;

                let result = "";
                if (tens > 1) {
                    result += zh_num[tens];
                }
                result += "十";
                if (units !== 0) {
                    result += zh_num[units];
                }
                return result;
            }

            if (num >= 100) {
                return num
                    .toString()
                    .split("")
                    .map((digit) => zh_num[parseInt(digit)])
                    .join("");
            }

            return num.toString();
        },
    },
};
</script>
<style lang="less" scoped>
@import "../../../../assets/css/event/jx3cxk/info.less";
</style>
