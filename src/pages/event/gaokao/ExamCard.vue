<template>
    <div class="v-single-card" v-if="item">
        <div class="m-single-question">
            <div class="u-number" :style="{ background: color }">
                <div class="u-left">
                    <span class="u-num" v-if="index" :style="{ background }">{{ index }}</span>
                    <template v-if="index && item_tags.length">
                        <a
                            :href="tagsLink(item)"
                            target="_blank"
                            class="u-tag"
                            v-for="(item, i) in item_tags"
                            :key="i"
                            :style="{ background, color: font }"
                            >{{ item }}</a
                        >
                    </template>
                </div>

                <div class="u-right">
                    <a class="u-user" :href="authorLink(item.userInfo.id)" target="_blank"
                        ><span class="u-label" :style="{ background, color: font }">出题人</span
                        ><span v-if="!isMiniProgram">{{ item.userInfo.display_name }}</span>
                        <Avatar v-else :url="item.userInfo.avatar" class="u-avatar" />
                    </a>
                    <a class="u-exam" :href="`${exam_link}${item.id}`" target="_blank"
                        ><span class="u-label" :style="{ background, color: font }">试题编号</span>{{ item.id }}</a
                    >
                </div>
            </div>
            <div class="u-cont">
                <div class="u-title">
                    <span class="u-hint"> [{{ item.type == "checkbox" ? "多选题" : "单选题" }}] </span>
                    <span v-html="resolveImagePath(item.title)" class="m-html-title"> </span>
                </div>
                <div class="u-option" :class="`color-${showId}`">
                    <template v-if="item.type === 'checkbox'">
                        <el-checkbox-group v-model="checkbox" @change="checkAnswers(item.id, checkbox)">
                            <el-checkbox
                                :class="[{ 'has-hover': !isMiniProgram }, myWrongClass(i)]"
                                v-for="(option, i) of options"
                                :key="i"
                                :label="i"
                                border
                                :disabled="isSubmitted"
                            >
                                <div class="u-radio">
                                    <span class="u-num">{{ String.fromCharCode(65 + i) }}.</span>
                                    <span class="m-option-content" v-html="resolveImagePath(option)"></span>
                                </div>
                            </el-checkbox>
                        </el-checkbox-group>
                    </template>
                    <template v-else>
                        <el-radio-group v-model="radio" @change="checkAnswers(item.id, radio)">
                            <el-radio
                                v-for="(option, i) of options"
                                :key="i"
                                :label="i"
                                border
                                :disabled="isSubmitted"
                                :class="myWrongClass(i)"
                            >
                                <div class="u-radio">
                                    <span class="u-num">{{ String.fromCharCode(65 + i) }}.</span>
                                    <span class="m-option-content" v-html="resolveImagePath(option)"></span>
                                </div>
                            </el-radio>
                        </el-radio-group>
                    </template>
                </div>
            </div>
        </div>
        <div class="m-single-answer" v-if="answer">
            <div class="u-status" :class="myAnswersClass(answer)">
                {{ status }}
            </div>
            <div class="u-answer" v-if="!isMiniProgram">
                你的答案：
                <span v-if="answer.myAnswer">
                    <b v-for="key in answer.myAnswer" :key="key">{{ letter(key) }}</b>
                </span>
                <b v-else>-</b>
            </div>
            <div class="u-answer">
                正确答案：
                <b v-for="key in answer.answerList" :key="key">{{ letter(key) }}</b>
            </div>
            <hr />
            <div class="m-analysis">
                <span class="u-label">解析：</span>
                <!-- <Article :content="answer.whyami" v-if="answer.whyami"></Article> -->
                <span v-if="answer.whyami" v-html="answer.whyami"></span>
                <div v-else>暂无解析</div>
            </div>
        </div>
    </div>
</template>
<script>
import { authorLink, resolveImagePath } from "@jx3box/jx3box-common/js/utils";
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";
import { tags } from "@/assets/data/event/exam.json";
import { isMiniProgram } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Card",
    props: ["item", "answer", "index", "isSubmitted", "background", "color", "font", "showId"],
    data: function () {
        return {
            checkbox: [],
            radio: {},
            isMiniProgram: isMiniProgram(),
        };
    },
    computed: {
        options: function () {
            return this.item.options;
        },
        status: function () {
            if (!this.answer.myAnswer) return "未作答";
            return this.answer.myAnswerIsRight ? "回答正确" : "回答错误";
        },
        exam_link() {
            return __Root + `exam/question/`;
        },
        item_tags() {
            let arr = this.item.tags
                .map((item) => {
                    if (this.tags.indexOf(item) !== -1) return item;
                })
                .filter(Boolean);
            if (!arr.length) arr[0] = this.item.tags[0];
            return arr.slice(0, 1);
        },
        tags() {
            return tags.slice(5, tags.length);
        },
    },
    watch: {
        item: {
            deep: true,
            immediate: true,
            handler: function () {
                this.$nextTick(() => {
                    this.initImgViewer();
                });
            },
        },
    },
    methods: {
        authorLink,
        resolveImagePath,
        checkAnswers(key, val) {
            let value = Array.isArray(val) ? val : [val];
            this.$emit("changeVal", { [key]: value });
        },
        myAnswersClass({ myAnswer, myAnswerIsRight }) {
            if (!myAnswer) return "noAnswer";
            return myAnswerIsRight ? "isCorrect" : "isWrong";
        },
        myWrongClass(index) {
            if (!this.answer) return "";
            if (this.answer.myAnswerIsRight) return "";

            let list = this.answer.answerList;
            let my = this.answer.myAnswer || [];

            if (list.includes(index)) return "isCorrect";
            if (my.includes(index)) return "isWrong";
        },
        letter: function (val) {
            return String.fromCharCode(65 + val);
        },
        tagsLink(tag) {
            return `/exam/?tag=${tag}`;
        },
        initImgViewer() {
            const images = document.querySelectorAll(".m-html-title img");
            images.forEach((img) => {
                img.onclick = () => {
                    this.$hevueImgPreview({
                        url: img.src,
                        controlBar: false,
                        clickMaskCLose: true,
                    });
                };
            });
        },
    },
};
</script>
<style lang="less">
.color-1 {
    .el-radio:hover,
    .has-hover:hover,
    .is-checked {
        background: #ffe353 !important;
        .u-radio {
            color: #555090 !important;
        }
    }
}
.color-2 {
    .el-radio:hover,
    .has-hover:hover,
    .is-checked {
        background: #bbd4ce !important;
        .u-radio {
            color: #264e70 !important;
        }
    }
}
.color-3 {
    .el-radio:hover,
    .has-hover:hover,
    .is-checked {
        background: #f9c397 !important;
        .u-radio {
            color: #fff !important;
        }
    }
}
.color-4 {
    .el-radio:hover,
    .has-hover:hover,
    .is-checked {
        background: #ae7897 !important;
        .u-radio {
            color: #fff !important;
        }
    }
}
.color-5 {
    .el-radio:hover,
    .has-hover:hover,
    .is-checked {
        background: #f9b4ab !important;
        .u-radio {
            color: #fff !important;
        }
    }
}
.color-6 {
    .el-radio:hover,
    .has-hover:hover,
    .is-checked {
        background: #f9b4ab !important;
        .u-radio {
            color: #fff !important;
        }
    }
}
.color-7 {
    .el-radio:hover,
    .has-hover:hover,
    .is-checked {
        background: #f55951 !important;
        .u-radio {
            color: #fff !important;
        }
    }
}
</style>
