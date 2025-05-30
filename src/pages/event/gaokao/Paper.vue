<template>
    <div class="m-index" :style="{ backgroundColor: color }" v-loading="loading">
        <div class="m-header">
            <img :src="__imgRoot + `logo-${logoNumber}.svg`" class="u-text u-logo" alt="魔盒" />
            <img :src="__imgRoot + `font-${textNumber}.svg`" class="u-text u-text-1" alt="全力以赴" />
            <div class="u-text m-year">
                <div class="u-year">{{ year }}</div>
                <div class="u-text1">JIANSAN</div>
                <div class="u-text2">GAOKAOJUAN</div>
            </div>
            <img :src="__imgRoot + 'text.png'" class="u-text u-text-2" :style="{ filter }" alt="剑三高考卷" />
        </div>
        <div class="m-exam">
            <div class="m-title">
                <span @click="openchangeExam" :style="{ color: font, backgroundColor: background }">
                    {{ name }}
                    <img svg-inline src="@/assets/img/event/switch_touchbar.svg" :style="{ fill: font }" />
                </span>
            </div>
            <div class="m-content" v-if="list && list.length">
                <ExamCard
                    v-for="(item, index) in list"
                    :key="item.id"
                    :item="item.list"
                    :index="index + 1"
                    :answer="item.answer"
                    :isSubmitted="isSubmitted"
                    :background="background"
                    :font="font"
                    :color="color"
                    :showId="showId"
                    @changeVal="finalAnswer"
                />

                <div class="m-exam-submit" :class="{ isSubmitted }" v-if="list.length">
                    <el-button class="u-btn" @click="submit" :disabled="isSubmitted">提交</el-button>
                    <div @click="openchangeExam" v-if="isMiniProgram && isSubmitted" class="m-switch-exam">
                        <el-button class="u-btn" :style="{ color: font, backgroundColor: background }"
                            >试试别的</el-button
                        >
                        <img svg-inline src="@/assets/img/event/switch_touchbar.svg" :style="{ fill: font }" />
                    </div>
                </div>
            </div>
        </div>

        <el-drawer class="m-exam-drawer" :visible.sync="changeExamVisible" direction="btt" :with-header="false">
            <div class="m-drawer">
                <div class="m-drawer-title">年份</div>
                <div class="m-drawer-select">
                    <span
                        v-for="(item, key) in exams"
                        :key="key"
                        :class="['u-item', { active: showYear == key }]"
                        @click="showYear = key"
                    >
                        {{ key }}
                    </span>
                </div>
                <div class="m-drawer-title">类型</div>
                <div class="m-drawer-select">
                    <span
                        v-for="(item, id) in exam"
                        :key="id"
                        :class="['u-item', { active: showTypeId == id }]"
                        @click="showTypeId = id"
                    >
                        {{ item.name }}
                    </span>
                </div>
                <div class="m-drawer-actions">
                    <button class="u-reset" @click="examDrawerReset">重置</button>
                    <button class="u-confirm" :disabled="examDrawerSubDis" @click="examDrawerSub">确定</button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
// import { postStat } from "@jx3box/jx3box-common/js/stat.js";
import ExamCard from "./ExamCard.vue";
import { submitAnswer, getPaper, submitAnswerTrial } from "@/service/event/exam.js";
import User from "@jx3box/jx3box-common/js/user";
import { isMiniProgram } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Paper",
    inject: ["__imgRoot"],
    props: ["paper", "showKey", "showId", "exams"],
    components: { ExamCard },
    data: function () {
        return {
            data: {},
            list: [],
            answer: "",
            score: "",
            userAnswers: {},
            isSubmitted: false,
            loading: false,
            changeExamVisible: true,
            showYear: "",
            showTypeId: "",
            isMiniProgram: isMiniProgram(),
        };
    },
    computed: {
        exam() {
            return this.exams[this.showYear];
        },
        id() {
            return this.paper.key;
        },
        name() {
            return this.paper.name;
        },
        color() {
            return this.paper.color;
        },
        font() {
            return this.paper.font;
        },
        background() {
            return this.paper.background;
        },
        filter() {
            return this.paper.filter;
        },
        filterYear() {
            return this.paper.filterYear;
        },
        logoNumber() {
            let id = this.showId;
            if (id == 6) id = 5;
            return id;
        },
        textNumber() {
            let id = this.showId;
            if (id == 5) id = 3;
            if (id == 6) id = 7;
            return id;
        },
        year() {
            return this.$route.params.year;
        },
        examDrawerSubDis() {
            return this.showYear == this.year && this.showTypeId == this.showId;
        },
        isPractice() {
            return this.$route?.query?.mode == "practice";
        },
    },
    watch: {
        showKey() {
            this.data = {};
            this.isSubmitted = false;
            this.userAnswers = {};
            this.list = [];

            this.loadData();
        },
    },
    methods: {
        loadData() {
            const id = this.id;
            this.loading = true;
            this.showKey == id &&
                getPaper(id)
                    .then((res) => {
                        let data = res.data;

                        // 发送统计
                        // postStat("paper", id);

                        data.tags = JSON.parse(data.tags);
                        data.questionDetailList =
                            data?.questionDetailList?.map((item) => {
                                item.options = JSON.parse(item.options);
                                item.tags = JSON.parse(item.tags);

                                return item;
                            }) || [];
                        this.data = data;

                        this.list =
                            data?.questionDetailList?.map((item) => {
                                return {
                                    list: item,
                                };
                            }) || [];
                    })
                    .finally(() => {
                        this.loading = false;
                    });
        },
        finalAnswer(val) {
            this.userAnswers = {
                ...this.userAnswers,
                ...val,
            };
        },
        submit() {
            if (!this.isPractice && !User.isLogin()) return this.$message.error("请先登录");
            if (!Object.keys(this.userAnswers).length) {
                this.$alert("不能交白卷哦~", "提交失败", {
                    type: "error",
                });
            } else {
                let list = this.data.questionDetailList;
                let obj = this.userAnswers;
                let submitList = {};
                for (const key in obj) {
                    const item = list.find((l) => l.id === ~~key);
                    submitList[key] = obj[key].map((o) => item.options[o]);
                }
                let userAnswers = [];
                for (let i in this.userAnswers) {
                    userAnswers.push({
                        id: [i],
                        myAnswer: this.userAnswers[i].sort(),
                    });
                }
                const fn = this.isPractice ? submitAnswerTrial : submitAnswer;
                fn(this.id, submitList, true).then((res) => {
                    if (res.data.score) {
                        document.documentElement.scrollTop = 0;
                        const paper = res.data.paper;
                        this.list = this.list.map((item) => {
                            let answer = paper.questionDetailList.find((q) => q.id === item.list.id);
                            answer.answerList = answer.answerList.sort();
                            const myAnswer = userAnswers.find((q) => q.id == answer.id);
                            item.answer = { ...answer, ...myAnswer };
                            return item;
                        });
                        this.score = String(res.data.score.score);
                        this.isSubmitted = true;
                    }
                });
            }
        },
        openchangeExam() {
            if (this.isMiniProgram) {
                this.changeExamVisible = true;
            }
        },
        examDrawerReset() {
            this.showYear = this.year;
            this.showTypeId = this.showId;
        },
        examDrawerSub() {
            this.changeExamVisible = false;
            this.$parent.changeExam(this.showTypeId, this.showYear, this.showKey);
        },
    },
    mounted() {
        this.loadData();
        this.showYear = this.$route.params.year;
        this.showTypeId = this.showId;
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/2023exam/card.less";
</style>
