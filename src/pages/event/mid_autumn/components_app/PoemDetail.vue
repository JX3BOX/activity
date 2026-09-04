<template>
    <transition name="fade">
        <div
            v-if="visible && poem"
            class="m-poem-detail_app"
            :style="{ backgroundImage: imgPrefix ? `url('${imgPrefix}bg3.jpg')` : '' }"
        >
            <!-- 顶部：返回 + 标题 -->
            <div class="m-detail-header">
                <div class="u-back" @click="close"><span class="u-back-arrow"></span></div>
                <div class="u-title">剑网3魔盒中秋诗词大会</div>
            </div>

            <!-- 正文卡片 -->
            <div class="m-detail-main">
                <div class="m-poem-card">
                    <div class="u-flower"><img :src="`${__imgRoot}${year}/phone/flower1.png`" /></div>
                    <div class="u-poem-title">《{{ poem.title }}》</div>
                    <div class="u-poem-author">
                        <img class="u-avatar" :src="poem.user_info?.avatar" alt="" @error="onAvatarError" />
                        <span class="u-name">{{ poem.user_info?.display_name || "侠士" }}</span>
                    </div>
                    <div class="u-poem-content">
                        <div v-for="(line, i) in poemLines" :key="i" class="u-line" :class="{ 'u-gap': !line }">
                            {{ line }}
                        </div>
                    </div>
                    <div class="u-poem-date" v-if="poemDate">· {{ poemDate }} ·</div>
                </div>
            </div>
            <div class="m-detail-footer">
                <div class="u-vote-btn" :class="{ voted: isVoted }" @click="toVote">
                    <img class="u-heart" :src="`${__imgRoot}${year}/phone/heart${isVoted ? 2 : 1}.png`" />
                    <template v-if="!isVoted">投票支持</template>
                    <template v-else>已投票</template>
                    <span class="u-count">{{ poem.amount || 0 }}</span>
                </div>
                <div class="u-nav">
                    <div class="u-nav-item" :class="{ disabled: !hasPrev }" @click="prev">
                        <span class="u-arrow u-arrow--left"></span>上一篇
                    </div>
                    <div class="u-nav-item u-back-list" @click="close">返回诗集</div>
                    <div class="u-nav-item" :class="{ disabled: !hasNext }" @click="next">
                        下一篇<span class="u-arrow u-arrow--right"></span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import dayjs from "dayjs";
import { vote, getMyVote } from "@/service/event/vote";
import { onAvatarError } from "./poemCommon";

export default {
    name: "PoemDetailApp",
    inject: ["__imgRoot"],
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        list: {
            type: Array,
            default: () => [],
        },
        index: {
            type: Number,
            default: 0,
        },
        year: {
            type: String,
            default: "",
        },
        programId: {
            type: [String, Number],
            default: 0,
        },
    },
    emits: ["update:visible"],
    data() {
        return {
            current: 0,
            myVote: [],
            lastVoteTime: 0,
            voting: false,
        };
    },
    computed: {
        poem() {
            return this.list[this.current];
        },
        hasPrev() {
            return this.current > 0;
        },
        hasNext() {
            return this.current < this.list.length - 1;
        },
        isVoted() {
            return !!this.poem?.isVoted;
        },
        poemDate() {
            const time = this.poem?.created_at || this.poem?.updated_at;
            return time ? dayjs(time).format("YYYY-MM-DD") : "";
        },
        imgPrefix() {
            return this.year ? `${this.__imgRoot}${this.year}/phone/` : "";
        },
        poemLines() {
            return this.getPoemLines(this.poem?.content);
        },
    },
    watch: {
        visible: {
            handler: function (val) {
                if (!val) {
                    return;
                }
                this.current = this.index;
                // 已投票状态只在登录后才有意义
                if (User.isLogin() && this.programId) {
                    this.loadMyVote();
                }
            },
            immediate: true,
        },
    },
    methods: {
        onAvatarError,
        close() {
            this.$emit("update:visible", false);
        },
        prev() {
            if (this.hasPrev) {
                this.current--;
            }
        },
        next() {
            if (this.hasNext) {
                this.current++;
            }
        },
        loadMyVote() {
            getMyVote(this.programId)
                .then((res) => {
                    this.myVote = res.data?.data?.list || [];
                    this.list.forEach((item) => {
                        item.isVoted = this.myVote.some((e) => e.vote_item_id == item.id);
                    });
                })
                .catch(() => {});
        },
        toVote() {
            if (this.isVoted || this.voting) {
                return;
            }
            const now = Date.now();
            if (now - this.lastVoteTime < 1000) {
                return this.$message.warning("投票速度太快啦！");
            }
            this.lastVoteTime = now;
            this.voting = true;
            vote(this.programId, { vote_id_list: [this.poem.id] })
                .then(() => {
                    this.$message.success("投票成功");
                    this.poem.isVoted = true;
                    this.poem.amount = (this.poem.amount || 0) + 1;
                })
                .catch(() => {
                    this.$message.error("投票失败，请稍后再试");
                })
                .finally(() => {
                    this.voting = false;
                });
        },
        getPoemLines(val) {
            const PUNCT = "。！？，、；：…";
            const MAX_CHARS = 15;
            const lines = [];

            this.getText(val || "", 1).forEach((raw) => {
                const text = raw.trim();
                if (!text) {
                    return;
                }
                const tokens = text.match(new RegExp(`[^${PUNCT}]*[${PUNCT}]+|[^${PUNCT}]+$`, "g")) || [];
                let cur = "";
                tokens.forEach((t) => {
                    if (cur && (cur + t).length > MAX_CHARS) {
                        lines.push(cur);
                        cur = t;
                    } else {
                        cur += t;
                    }
                });
                if (cur) {
                    lines.push(PUNCT.includes(cur.slice(-1)) ? cur : cur + "。");
                }
            });
            return lines;
        },
        getText(val, type) {
            let splitArr = String(val).split(/\n/);
            let arr = [];
            splitArr.forEach((item) => {
                if (item) {
                    let regex = /https?:\/\/[^"']*\.(?:jpg|jpeg|gif|png)/gi;
                    var imageUrls = item.match(regex);
                    if (imageUrls) {
                        imageUrls.forEach((element) => {
                            if (type == 1) {
                                item = item.replace(element, "");
                            }
                        });
                    }
                    arr.push(item);
                }
            });
            return arr;
        },
    },
};
</script>

<style lang="less">
.m-poem-detail_app {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    background: rgba(5, 10, 32, 0.96);
    background-size: 100% auto;

    .m-detail-header {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 2vw;
        padding: 12vw 4vw 3vw;

        .u-back {
            display: flex;
            align-items: center;
            cursor: pointer;
            color: #fff;

            .u-back-arrow {
                width: 3.5vw;
                height: 3.5vw;
                border-left: 1vw solid currentColor;
                border-bottom: 1vw solid currentColor;
                transform: rotate(45deg);
            }
        }
        .u-title {
            font-size: 4.3vw;
            color: #fff;
        }
    }

    .m-detail-main {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        padding: 2vw 4vw 3vw;

        .m-poem-card {
            box-sizing: border-box;
            min-height: 100%;
            padding: 8vw 6vw;
            border-radius: 4vw;
            background: linear-gradient(180deg, #fdfbf7 0%, #f2eadc 100%);

            .u-flower {
                text-align: center;
                margin-bottom: 2rem;
                img {
                    width: 2.5rem;
                    height: 2.5rem;
                    .auto(x);
                }
            }
            .u-poem-title {
                margin-top: 3vw;
                text-align: center;
                font-size: 5.3vw;
                font-weight: 500;
                color: #b03a3a;
                word-break: break-all;
            }
            .u-poem-author {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 2vw;
                margin-top: 4vw;

                .u-avatar {
                    width: 6vw;
                    height: 6vw;
                    border-radius: 50%;
                    object-fit: cover;
                    background: #eee;
                }
                .u-name {
                    font-size: 3.7vw;
                    color: #999;
                }
            }

            .u-poem-content {
                margin-top: 7vw;
                text-align: center;

                .u-line {
                    font-size: 4.3vw;
                    line-height: 2;
                    color: #333;
                    word-break: break-all;
                    &.u-gap {
                        height: 4vw;
                    }
                }
            }

            .u-poem-date {
                margin-top: 8vw;
                text-align: center;
                font-size: 3.7vw;
                color: #af4859;
            }
        }
    }

    .m-detail-footer {
        flex-shrink: 0;
        padding: 3vw 4vw calc(3vw + env(safe-area-inset-bottom));
        border-radius: 6vw 6vw 0 0;
        background: #fdfbf6;
        box-shadow: 0px -4px 4px 0px #00000040;

        .u-vote-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5vw;
            padding: 3.5vw 0;
            border-radius: 8vw;
            font-size: 4.5vw;
            font-weight: 500;
            color: #fff;
            cursor: pointer;
            background: linear-gradient(90deg, #cf7c69 0%, #ae3b4e 100%);

            .u-count {
                font-size: 4.5vw;
            }
            .u-heart {
                width: 5vw;
            }

            &.voted {
                filter: grayscale(1);
            }
        }

        .u-nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 4vw 2vw 0;

            .u-nav-item {
                display: flex;
                align-items: center;
                font-size: 4vw;
                color: #666;
                cursor: pointer;

                // CSS 绘制的翻页箭头（替代字符 ‹ ›，大小可控）
                .u-arrow {
                    display: inline-block;
                    width: 3vw;
                    height: 3vw;
                    border-top: 0.9vw solid currentColor;
                    border-right: 0.9vw solid currentColor;

                    &.u-arrow--left {
                        transform: rotate(-135deg);
                        margin-right: 2vw;
                    }
                    &.u-arrow--right {
                        transform: rotate(45deg);
                        margin-left: 2vw;
                    }
                }

                &.disabled {
                    opacity: 0.4;
                }
            }
        }
    }
}
</style>
