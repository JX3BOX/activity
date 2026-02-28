<template>
    <div class="p-event-content">
        <div class="m-paper-box" :style="{ backgroundColor: showColor }">
            <img :src="`${__imgRoot}previous.png`" class="u-previous" @click="changeShow" />
            <span class="u-title">切换试卷</span>
            <div class="m-list">
                <span
                    v-for="(item, id) in exam"
                    :key="id"
                    :class="['u-paper', { active: showId == id }]"
                    @click="changeExam(id, showYear, item.key)"
                >
                    {{ item.name }}
                </span>
            </div>
        </div>
        <Paper
            v-for="(item, i) in paperList"
            :key="i"
            :paper="item"
            :exams="exams"
            :showKey="showKey"
            :showId="showId"
            :showYear="showYear"
            class="m-paper"
        />

        <div class="m-change-paper" v-show="show" :style="{ backgroundColor: showColor }">
            <img class="u-close" :src="`${__imgRoot}close.svg`" @click="show = false" />
            <div class="m-title">往届考题</div>
            <div class="m-content">
                <span
                    v-for="(item, key) in exams"
                    :key="key"
                    @click="changeYear(key)"
                    class="u-year"
                    :style="{ backgroundColor: showBackground, color: showFont }"
                    >{{ key }}</span
                >
            </div>
        </div>
        <div class="m-mark" v-show="show"></div>
    </div>
</template>

<script>
import { isMiniProgram, isApp } from "@jx3box/jx3box-common/js/utils";
import { getMenu } from "@jx3box/jx3box-common/js/api_misc";
import { papers } from "@/assets/data/event/exam.json";
import { findKey } from "lodash";
import Paper from "./Paper.vue";
export default {
    name: "Index",
    inject: ["__imgRoot"],
    components: { Paper },
    data: function () {
        return {
            showId: 1,
            show: false,
            showYear: "",
            papers,
            exams: {},
            isMiniProgram: isMiniProgram() || isApp(),
        };
    },
    mounted() {
        getMenu("exam_pagers").then((res) => {
            this.exams = res.reduce((acc, item) => {
                const list = JSON.parse(item.list);
                acc[item.year] = list.reduce((acc, item, index) => {
                    acc[`${index + 1}`] = { key: item.key, name: item.name };
                    return acc;
                }, {});
                return acc;
            }, {});
            this.showYear = Object.keys(this.exams).reverse()[0];
            const data = this.getRouter(this.exams, this.pathId);
            if (data) {
                this.showYear = data.year;
                const id = findKey(this.exam, (obj) => obj.key === data.key) || 1;
                this.changeExam(id, data.year, this.pathId);
            }
        });
    },
    computed: {
        exam() {
            let year = this.year;
            if (this.showYear !== year) {
                year = this.showYear;
            }
            return (this.exams && this.exams[year]) || {};
        },
        showKey() {
            return this.exam[this.showId]?.key;
        },
        showColor() {
            return this.papers[this.showId]?.color;
        },
        showBackground() {
            return this.papers[this.showId]?.background;
        },
        showFont() {
            return this.papers[this.showId]?.font;
        },
        pathMode() {
            return this.$route.query.mode;
        },
        pathId() {
            return this.$route.query.paper;
        },
        year() {
            return this.$route.params.year;
        },
        paperList() {
            if (!this.showKey) return {};
            const id = ~~this.showId === 0 ? 1 : ~~this.showId;
            const count = Object.keys(this.exam).length;
            const last = id - 1 === 0 ? count : id - 1;
            const next = id + 1 > count ? 1 : id + 1;
            const exam_last = Object.assign({}, this.papers[last], this.exam[last]);
            const exam_next = Object.assign({}, this.papers[next], this.exam[next]);
            const exam_id = Object.assign({}, this.papers[id], this.exam[id]);
            return {
                1: exam_last,
                2: exam_id,
                3: exam_next,
            };
        },
    },
    methods: {
        changeExam(id, year, paper) {
            this.showId = id;
            this.showYear = year;
            const query = { ...this.$route.query, paper };
            if (this.isMiniProgram) query.mode = "practice";
            this.$router.push({
                name: "index",
                params: { year },
                query,
            });
            window.scrollTo(0, 0);
        },
        changeShow() {
            this.show = !this.show;
        },
        changeYear(year) {
            this.showYear = year;
            this.show = false;
            this.showId = 1;
            this.$router.push({ name: "index", params: { year: year } });
            window.scrollTo(0, 0);
        },
        getRouter(data, targetKey) {
            for (const year in data) {
                for (const month in data[year]) {
                    if (data[year][month].key == targetKey) {
                        return { year, key: targetKey };
                    }
                }
            }
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/2023exam/index.less";
@import "~@/assets/css/event/2023exam/card.less";
@import "~@/assets/css/event/2023exam/miniprogram.less";
</style>
