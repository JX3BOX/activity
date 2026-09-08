<template>
    <transition name="fade">
        <div
            v-if="visible && poem"
            ref="detail"
            class="m-poem-detail_app"
            :class="{ 'is-android': isAndroid }"
            :style="{ backgroundImage: imgPrefix ? `url('${imgPrefix}bg3.jpg')` : '' }"
        >
            <!-- 顶部：返回 + 标题 -->
            <transition name="poem-toast">
                <div v-if="toastMessage" class="u-poem-toast" role="status" aria-live="polite">{{ toastMessage }}</div>
            </transition>
            <div class="m-detail-header">
                <button class="u-back" type="button" @click="close">
                    <span class="u-back-arrow" aria-hidden="true"></span>
                    <span class="u-title">返回诗集</span>
                </button>
                <div class="u-header-nav">
                    <button class="u-page-btn" type="button" :disabled="!hasPrev" aria-label="上一篇" @click="prev">
                        <svg class="u-page-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 6 L9 12 L15 18" /></svg>
                    </button>
                    <button class="u-page-btn" type="button" :disabled="!hasNext" aria-label="下一篇" @click="next">
                        <svg class="u-page-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 6 L15 12 L9 18" /></svg>
                    </button>
                </div>
            </div>

            <!-- 正文卡片 -->
            <div class="m-detail-main">
                <transition name="poem-switch" mode="out-in">
                    <div class="m-poem-card" :key="poem.id">
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
                        <div class="u-poem-source" v-if="originalUrl">
                            <a :href="originalUrl" target="_blank" rel="noopener noreferrer">查看原作→</a>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="m-detail-footer">
                <div class="u-vote-btn" :class="{ voted: isVoted }" @click="toVote">
                    <span class="u-heart-wrap" :class="{ 'is-animating': voteAnimating }">
                        <svg class="u-heart" :class="{ 'is-filled': isVoted }" viewBox="0 0 24 24" aria-hidden="true" @animationend="voteAnimating = false">
                            <path d="M12 20.5S3 15 3 8.75C3 3.5 9.5 2.5 12 7c2.5-4.5 9-3.5 9 1.75C21 15 12 20.5 12 20.5Z" />
                        </svg>
                        <span v-if="voteAnimating" class="u-vote-feedback">+1</span>
                    </span>
                    <template v-if="!isVoted">朕心甚慰</template>
                    <template v-else>已投票</template>
                    <span class="u-count">{{ poem.amount || 0 }}</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import { markRaw } from "vue";
import { createGesture } from "@ionic/core";
import { vote, getMyVote } from "@/service/event/vote";
import { getPoemTextLines, onAvatarError } from "./poemCommon";

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
            swipeGesture: null,
            myVote: [],
            lastVoteTime: 0,
            voting: false,
            toastMessage: "",
            toastTimer: null,
            voteAnimating: false,
            isAndroid: typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent),
        };
    },
    computed: {
        mockVote() {
            return process.env.NODE_ENV === "development"
                && ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname)
                && this.$route.query.mockVote === "1";
        },
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
        originalUrl() {
            const id = String(this.poem?.sub_title || "").trim();
            if (!/^\d+$/.test(id)) return "";
            const queryClient = this.$route.query.client;
            const client = (Array.isArray(queryClient) ? queryClient[0] : queryClient)
                || new URLSearchParams(window.location.search).get("client")
                || (window.location.hostname === "origin.jx3box.com" ? "origin" : "std");
            const root = client === "std" ? "https://www.jx3box.com" : "https://origin.jx3box.com";
            return `${root}/community/${id}`;
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
                    this.destroySwipeGesture();
                    return;
                }
                this.current = this.index;
                this.$nextTick(this.initSwipeGesture);
                // 已投票状态只在登录后才有意义
                if (User.isLogin() && this.programId) {
                    this.loadMyVote();
                }
            },
            immediate: true,
        },
        current() {
            this.voteAnimating = false;
            this.$nextTick(() => {
                if (this.$refs.detail) this.$refs.detail.scrollTop = 0;
            });
        },
    },
    beforeUnmount() {
        clearTimeout(this.toastTimer);
        this.destroySwipeGesture();
    },
    methods: {
        showToast(message) {
            clearTimeout(this.toastTimer);
            this.toastMessage = message;
            this.toastTimer = setTimeout(() => {
                this.toastMessage = "";
            }, 2500);
        },
        onAvatarError,
        initSwipeGesture() {
            this.destroySwipeGesture();
            const el = this.$refs.detail;
            if (!this.visible || !el) return;
            const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
            this.swipeGesture = markRaw(createGesture({
                el,
                gestureName: "mid-autumn-poem-swipe",
                direction: "x",
                threshold: rem,
                maxAngle: 30,
                disableScroll: false,
                canStart: ({ event }) => !event.target.closest(".u-back, .u-vote-btn, .u-page-btn, a"),
                onEnd: ({ deltaX, deltaY, event }) => {
                    if (!this.visible || event.type === "touchcancel" || event.type === "pointercancel") return;
                    if (Math.abs(deltaX) < 3 * rem || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) return;
                    if (deltaX < 0) this.next();
                    else this.prev();
                },
            }));
            this.swipeGesture.enable();
        },
        destroySwipeGesture() {
            this.swipeGesture?.destroy();
            this.swipeGesture = null;
        },
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
            if ((!this.mockVote && this.isVoted) || this.voting) {
                return;
            }
            const now = Date.now();
            if (now - this.lastVoteTime < 1000) {
                return this.$message.warning("投票速度太快啦！");
            }
            this.lastVoteTime = now;
            this.voting = true;
            const votedPoem = this.poem;
            const request = this.mockVote
                ? Promise.resolve()
                : vote(this.programId, { vote_id_list: [votedPoem.id] }, { mute: true });
            request
                .then(() => {
                    this.showToast(this.mockVote ? "模拟投票成功" : "投票成功");
                    votedPoem.isVoted = true;
                    votedPoem.amount = (votedPoem.amount || 0) + 1;
                    if (this.visible && this.poem === votedPoem) this.voteAnimating = true;
                })
                .catch((error) => {
                    const data = error?.response?.data || error?.data;
                    this.showToast(data?.msg || data?.message || "投票失败，请稍后再试");
                })
                .finally(() => {
                    this.voting = false;
                });
        },
        getPoemLines(val) {
            const PUNCT = "。！？，、；：…";
            const MAX_CHARS = 15;
            const lines = [];

            getPoemTextLines(val).forEach((raw) => {
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
    },
};
</script>

<style lang="less">
.poem-switch-enter-active,
.poem-switch-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}

.poem-switch-enter-from {
    opacity: 0;
    transform: translateY(0.5rem);
}

.poem-switch-leave-to {
    opacity: 0;
    transform: translateY(-0.5rem);
}

@media (prefers-reduced-motion: reduce) {
    .poem-switch-enter-active,
    .poem-switch-leave-active {
        transition: none;
    }
}

.m-poem-detail_app {
    .u-poem-toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1100;
        width: max-content;
        max-width: calc(100% - 3rem);
        box-sizing: border-box;
        padding: 0.75rem 1.125rem;
        border-radius: 0.625rem;
        background: rgba(24, 24, 28, 0.9);
        color: #fff;
        font-size: 0.875rem;
        line-height: 1.6;
        text-align: center;
        overflow-wrap: anywhere;
        pointer-events: none;
        box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.18);
    }
    .poem-toast-enter-active,
    .poem-toast-leave-active {
        transition: opacity 0.15s ease;
    }
    .poem-toast-enter-from,
    .poem-toast-leave-to {
        opacity: 0;
    }
    touch-action: pan-y;
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    background: #050a20;
    background-size: 100% auto;
    background-repeat: no-repeat;

    .m-detail-header {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        padding: calc(1.25rem + env(safe-area-inset-top, 0rem)) 1rem 0.75rem;

        .u-header-nav {
            display: flex;
            gap: 0.5rem;
            margin-left: auto;
        }

        .u-page-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.375rem;
            height: 2.375rem;
            padding: 0;
            border: 0.0625rem solid rgba(239, 211, 146, 0.5);
            border-radius: 50%;
            background: linear-gradient(110deg, rgba(239, 211, 146, 0.16), rgba(20, 29, 35, 0.6));
            color: #fdf0cd;
            cursor: pointer;
            transition: background-color 0.18s ease, opacity 0.18s ease;

            &:active:not(:disabled) {
                background-color: rgba(239, 211, 146, 0.2);
            }

            &:disabled {
                opacity: 0.3;
                cursor: default;
            }

            &:focus-visible {
                outline: 0.125rem solid #efd392;
                outline-offset: 0.1875rem;
            }
        }

        .u-page-arrow {
            display: block;
            flex-shrink: 0;
            width: 1rem;
            height: 1rem;
            fill: none;
            stroke: currentColor;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        .u-back {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            padding: 0.5rem 0.875rem;
            border: 0.0625rem solid rgba(239, 211, 146, 0.5);
            border-radius: 2rem;
            background: linear-gradient(110deg, rgba(239, 211, 146, 0.16), rgba(20, 29, 35, 0.6));
            box-shadow: inset 0 0.0625rem 0 rgba(255, 243, 207, 0.12), 0 0.125rem 0.5rem rgba(0, 0, 0, 0.12);
            backdrop-filter: blur(0.375rem);
            font-family: inherit;
            cursor: pointer;
            color: #fdf0cd;
            transition: background-color 0.18s ease, border-color 0.18s ease;

            &:active {
                background-color: rgba(239, 211, 146, 0.2);
                border-color: #efd392;
            }

            &:focus-visible {
                outline: 0.125rem solid #efd392;
                outline-offset: 0.1875rem;
            }

            .u-back-arrow {
                width: 0.4375rem;
                height: 0.4375rem;
                border-left: 0.125rem solid currentColor;
                border-bottom: 0.125rem solid currentColor;
                transform: rotate(45deg);
                flex-shrink: 0;
            }
        }
        .u-title {
            font-size: 0.875rem;
            line-height: 1.5;
            letter-spacing: 0.0625rem;
        }
    }

    .m-detail-main {
        flex-shrink: 0;
        padding: 2vw 4vw 3vw;

        .m-poem-card {
            box-sizing: border-box;
            padding: 8vw 6vw;
            border-radius: 4vw;
            background: linear-gradient(180deg, #fdfbf7 0%, #f2eadc 100%);

            .u-flower {
                text-align: center;
                margin-bottom: 2rem;
                img {
                    width: 2rem;
                    height: 2rem;
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

            .u-poem-source {
                margin-top: 8vw;
                text-align: center;
                font-size: 3.7vw;
                color: #af4859;
                a {
                    color: inherit;
                    text-decoration: none;
                }
            }
        }
    }

    .m-detail-footer {
        flex-shrink: 0;
        padding: 3vw 4vw calc(8vw + env(safe-area-inset-bottom));

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
            transition: transform 0.15s ease, filter 0.15s ease, box-shadow 0.15s ease;

            &:active:not(.voted) {
                transform: scale(0.97);
                filter: brightness(1.1);
                box-shadow: inset 0 0.125rem 0.375rem rgba(89, 25, 40, 0.2);
            }

            .u-count {
                font-size: 4.5vw;
            }
            .u-heart-wrap {
                position: relative;
                display: inline-flex;
                flex-shrink: 0;
                color: #fff2d7;

                &.is-animating {
                    .u-heart {
                        animation: poem-vote-pop 720ms cubic-bezier(0.2, 0.85, 0.32, 1.35) both;
                    }
                    &::before,
                    &::after {
                        content: "";
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        pointer-events: none;
                    }
                    &::before {
                        width: 1rem;
                        height: 1rem;
                        border: 0.125rem solid rgba(255, 232, 183, 0.7);
                        border-radius: 50%;
                        animation: poem-vote-ring 660ms ease-out both;
                    }
                    &::after {
                        width: 2.5rem;
                        height: 2.5rem;
                        background: radial-gradient(circle, #fff2d7 0 0.1rem, transparent 0.15rem) 50% 0 / 0.4rem 0.4rem no-repeat,
                            radial-gradient(circle, #f5d38d 0 0.1rem, transparent 0.15rem) 100% 28% / 0.4rem 0.4rem no-repeat,
                            radial-gradient(circle, #fff2d7 0 0.1rem, transparent 0.15rem) 82% 88% / 0.4rem 0.4rem no-repeat,
                            radial-gradient(circle, #f5d38d 0 0.1rem, transparent 0.15rem) 18% 88% / 0.4rem 0.4rem no-repeat,
                            radial-gradient(circle, #fff2d7 0 0.1rem, transparent 0.15rem) 0 28% / 0.4rem 0.4rem no-repeat;
                        animation: poem-vote-particles 700ms ease-out both;
                    }
                }
            }
            .u-heart {
                display: block;
                width: 1.5rem;
                height: 1.5rem;
                fill: none;
                stroke: currentColor;
                stroke-width: 1.8;
                stroke-linecap: round;
                stroke-linejoin: round;
                &.is-filled {
                    fill: currentColor;
                }
            }
            .u-vote-feedback {
                position: absolute;
                top: -0.75rem;
                right: -0.625rem;
                font-size: 0.75rem;
                pointer-events: none;
                animation: poem-vote-feedback 720ms ease-out both;
            }

            &.voted {
                cursor: default;
            }
        }

    }

    &.is-android .m-detail-footer {
        padding-bottom: calc(4vw + max(env(safe-area-inset-bottom, 0px), 48px));
    }
}
@keyframes poem-vote-pop {
    0% { transform: scale(0.65) rotate(-14deg); }
    44% { transform: scale(1.3) rotate(8deg); }
    100% { transform: scale(1) rotate(0); }
}
@keyframes poem-vote-ring {
    0% { opacity: 0.85; transform: translate(-50%, -50%) scale(0.5); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(2.5); }
}
@keyframes poem-vote-particles {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.45) rotate(-12deg); }
    28% { opacity: 1; }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(1.3) rotate(16deg); }
}
@keyframes poem-vote-feedback {
    0% { opacity: 0; transform: translateY(0.25rem); }
    24% { opacity: 1; }
    100% { opacity: 0; transform: translateY(-0.65rem); }
}
@media (prefers-reduced-motion: reduce) {
    .m-poem-detail_app .u-heart-wrap.is-animating {
        .u-heart, .u-vote-feedback, &::before, &::after {
            animation-duration: 1ms !important;
        }
    }
}
</style>
