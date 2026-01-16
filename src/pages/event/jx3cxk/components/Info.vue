<template>
    <div class="m-content m-info">
        <!-- 宣言 -->
        <div class="m-preface"><div class="u-info" v-html="jx3cxkData.preface"></div></div>
        <!-- 活动时间 -->
        <div class="wp">
            <div class="m-event-time">
                <div class="m-times">
                    <div class="m-time" :class="showTime(i)" v-for="(item, i) in jx3cxkData.event_time" :key="i">
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
                    <img class="u-icon" :src="`${imgRoot}web/info/${i + 1}.svg?jx3box`" />
                    <span>{{ item }}</span>
                </li>
                <li class="u-ps" v-html="jx3cxkData.condition_ps"></li>
            </ul>
        </div>
        <!-- 参赛步骤 -->
        <div class="m-step">
            <div class="u-step" v-for="(item, i) in jx3cxkData.step" :key="i">
                <h2>
                    <img class="u-icon" :src="`${imgRoot}web/info/star.svg`" />
                    <span>参赛步骤</span>
                    <img class="u-number" :src="`${imgRoot}web/info/${i}.svg?jx3box`" />
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
            <div class="m-reward-content"></div>
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
    methods: {
        getEventStatus() {
            const currentDate = dayjs().startOf("day");
            const activityDate = dayjs(this.jx3cxkData.event_time[0].time).startOf("day");
            const voteDate = dayjs(this.jx3cxkData.event_time[1].time).startOf("day");
            const resultDate = dayjs(this.jx3cxkData.event_time[2].time).startOf("day");
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
    },
};
</script>
<style lang="less" scoped>
@import "../../../../assets/css/event/jx3cxk/info.less";
</style>
