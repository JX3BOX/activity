<template>
    <div class="m-index" :style="{ backgroundColor: color }" v-loading="loading">
        <div class="m-header">
            <img :src="__imgRoot + `logo-${logoNumber}.svg`" class="u-text u-logo" alt="魔盒" />
            <img :src="__imgRoot + `font-${textNumber}.svg`" class="u-text u-text-1" alt="全力以赴" />
            <img :src="__imgRoot + `${year}.png`" class="u-text u-year" />
            <img :src="__imgRoot + 'text.png'" class="u-text u-text-2" :style="{ filter }" alt="2023剑三高考卷" />
        </div>
        <div class="m-exam">
            <div class="m-title">
                <span :style="{ color: font, background }">{{ name }}</span>
            </div>
            <div class="m-content">
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

                <div class="m-exam-submit" @click="submit" :class="{ isSubmitted }" v-if="list.length">
                    <el-button class="u-btn" :disabled="isSubmitted">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { postStat } from "@jx3box/jx3box-common/js/stat.js";
import ExamCard from "./ExamCard.vue";
import { submitAnswer, getPaper } from "@/service/event/exam.js";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "Paper",
    inject: ["__imgRoot"],
    props: ["paper", "showKey", "showId", "showYear"],
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
        };
    },
    computed: {
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
            return this.$route.params.year || this.showYear;
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
                        postStat("paper", id);

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
            if (!User.isLogin()) return this.$message.error("请先登录");
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
                submitAnswer(this.id, submitList, true).then((res) => {
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
    },
    mounted() {
        this.loadData();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/2023exam/card.less";
</style>
