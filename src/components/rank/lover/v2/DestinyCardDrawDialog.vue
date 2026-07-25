<template>
    <el-dialog
        :model-value="modelValue"
        class="lover-v2-card-dialog"
        width="920px"
        :close-on-click-modal="false"
        :close-on-press-escape="!drawing"
        :show-close="!drawing"
        :before-close="beforeClose"
        append-to-body
        @open="handleOpen"
        @update:model-value="$emit('update:modelValue', $event)"
    >
        <template #header>
            <div class="u-dialog-title">
                <span>同心天命签</span>
                <small>{{ teamName ? `${teamName} · 本场抽签` : "本场抽签" }}</small>
            </div>
        </template>

        <div class="m-card-stage" :class="`is-${phase}`" :style="stageStyle">
            <video
                class="u-result-fire"
                autoplay
                disablepictureinpicture
                disableremoteplayback
                loop
                muted
                playsinline
                :src="`${cdnLink}design/event/lover/fire.webm`"
            />
            <div ref="cardRow" v-loading="cardsLoading" class="m-card-row">
                <div
                    v-for="(card, index) in renderCards"
                    :key="index"
                    ref="cardRefs"
                    class="u-card"
                    :class="{
                        'is-center': index === centerIndex,
                        'is-result': enableResultAnimation && index === centerIndex,
                    }"
                    :style="cardStyle(index)"
                >
                    <div class="u-card-flipper" :class="{ 'is-center': index === centerIndex }">
                        <img v-if="card.img" class="u-card-cover" :src="card.img" :alt="card.name" />
                        <div v-else class="u-card-cover u-card-fallback">
                            <FeatureBadge name="destiny-card" small />
                            <span>{{ card.name || "天命签" }}</span>
                        </div>
                        <img class="u-card-back" :src="cardBackImg" alt="天命签背面" />
                    </div>
                </div>
                <EmptyState
                    v-if="!cardsLoading && !cards.length"
                    icon="destiny-card"
                    :description="cardsLoadFailed ? '签面加载失败，请关闭后重试' : '当前赛事没有可抽取的天命签'"
                    compact
                />
            </div>

            <div class="m-result-copy">
                <template v-if="result">
                    <span>本次抽得</span>
                    <h3>{{ result.card?.name || "天命签" }}</h3>
                    <p>{{ result.card?.desc || "签面效果等待公布" }}</p>
                </template>
                <template v-else-if="drawing">
                    <h3>{{ drawingTitle }}</h3>
                    <p>{{ drawingDescription }}</p>
                </template>
                <template v-else>
                    <h3>请队长开启本场天命签</h3>
                    <p>签面会依次亮相、翻回并交错洗牌；最终结果只由赛事服务随机决定。</p>
                </template>
            </div>
        </div>

        <template #footer>
            <el-button
                v-if="!result"
                type="primary"
                :loading="drawing"
                :disabled="drawing || cardsLoading || !cards.length"
                @click="performDraw"
            >
                {{ drawing ? "正在抽签" : "开始抽签" }}
            </el-button>
            <el-button v-else type="primary" @click="closeDialog">收下签文</el-button>
        </template>
    </el-dialog>
</template>

<script>
import jx3boxData from "@jx3box/jx3box-common/data/jx3box.json";
import { drawCard, getAllEventCards } from "@/service/rank/lover-v2";
import EmptyState from "./EmptyState.vue";
import FeatureBadge from "./FeatureBadge.vue";

const { __cdn: cdnLink } = jx3boxData;

export default {
    name: "LoverV2DestinyCardDrawDialog",
    components: { EmptyState, FeatureBadge },
    emits: ["update:modelValue", "drawn"],
    props: {
        modelValue: { type: Boolean, default: false },
        eventId: { type: Number, required: true },
        matchId: { type: Number, required: true },
        teamName: { type: String, default: "" },
    },
    data: function () {
        return {
            cdnLink,
            cardBackImg: `${cdnLink}design/event/lover/q0.png`,
            cards: [],
            cardsLoading: false,
            cardsLoadFailed: false,
            phase: "idle",
            drawing: false,
            animationPlaying: false,
            enableFlipperAnimation: false,
            enableMoveAnimation: false,
            enableResultAnimation: false,
            cardRotateDeg: 0,
            cardMoveDistance: [],
            result: null,
        };
    },
    computed: {
        centerIndex() {
            return Math.floor(this.cards.length / 2);
        },
        renderCards() {
            const list = [...this.cards];
            if (!this.result?.card) return list;
            const selectedIndex = list.findIndex((card) => Number(card.id) === Number(this.result.card.id));
            const selected =
                selectedIndex >= 0
                    ? list.splice(selectedIndex, 1)[0]
                    : {
                          id: this.result.card.id,
                          name: this.result.card.name,
                          desc: this.result.card.desc,
                          img: this.result.card.img,
                      };
            if (selectedIndex < 0 && list.length) list.splice(this.centerIndex, 1);
            list.splice(Math.floor(list.length / 2), 0, selected);
            return list;
        },
        stageStyle() {
            const visibleCount = Math.max(this.cards.length, 1);
            const cardWidth = Math.max(72, Math.min(108, Math.floor((720 - (visibleCount - 1) * 24) / visibleCount)));
            return {
                "--card-width": `${cardWidth}px`,
                "--card-height": `${Math.round(cardWidth * 2.5)}px`,
                "--card-transform": `rotateY(${this.cardRotateDeg}deg)`,
                "--card-flipper-transition": this.enableFlipperAnimation ? "transform 0.5s ease" : "none",
                "--card-move-transition": this.enableMoveAnimation ? "transform 0.5s ease" : "none",
                "--card-center-transform": this.enableResultAnimation
                    ? "rotateY(180deg)"
                    : `rotateY(${this.cardRotateDeg}deg)`,
                "--fire-opacity": this.enableResultAnimation ? 0.92 : 0,
            };
        },
        drawingTitle() {
            const titles = {
                faces: "百签亮相，请记住每一道签影",
                backs: "签面已覆，天机将藏",
                shuffle: "签影交错，正在定签",
                settle: "命签已定，正在归于中位",
            };
            return titles[this.phase] || "天命签正在开启";
        },
        drawingDescription() {
            if (this.phase === "shuffle") return "签位正在交错换位，抽取结果仍以后端权威记录为准。";
            return "所有启用签面都会参与本场抽取，请稍候。";
        },
    },
    methods: {
        wait(duration) {
            return new Promise((resolve) => window.setTimeout(resolve, duration));
        },
        async handleOpen() {
            this.reset();
            await this.loadCards();
        },
        async loadCards() {
            this.cardsLoading = true;
            this.cardsLoadFailed = false;
            try {
                this.cards = await getAllEventCards(this.eventId);
            } catch (error) {
                console.error("[LoverV2DestinyCardDrawDialog.loadCards]", error);
                this.cards = [];
                this.cardsLoadFailed = true;
            } finally {
                this.cardsLoading = false;
            }
        },
        reset() {
            if (this.drawing) return;
            this.resetAnimation();
            this.result = null;
        },
        resetAnimation() {
            this.phase = "idle";
            this.animationPlaying = false;
            this.enableFlipperAnimation = false;
            this.enableMoveAnimation = false;
            this.enableResultAnimation = false;
            this.cardRotateDeg = 0;
            this.cardMoveDistance = [];
        },
        cardStyle(index) {
            const style = {};
            if (this.enableMoveAnimation) {
                style.transform = `translateX(${this.cardMoveDistance[index] || 0}px)`;
            }
            if (this.enableResultAnimation && index === this.centerIndex) {
                style.transform = "scale(1.18)";
                style.zIndex = 5;
            }
            return style;
        },
        doShuffle() {
            if (this.cardMoveDistance.length) {
                this.cardMoveDistance = [];
                return;
            }
            const refs = Array.isArray(this.$refs.cardRefs) ? this.$refs.cardRefs : [];
            const distances = Array(refs.length).fill(0);
            for (let index = 0; index < refs.length / 2; index += 1) {
                const leftCard = refs[index];
                const rightCard = refs[refs.length - 1 - index];
                if (!leftCard || !rightCard) continue;
                distances[index] = rightCard.offsetLeft - leftCard.offsetLeft;
                distances[refs.length - 1 - index] = leftCard.offsetLeft - rightCard.offsetLeft;
            }
            this.cardMoveDistance = distances;
        },
        async playPrelude() {
            if (this.animationPlaying) return;
            this.resetAnimation();
            this.animationPlaying = true;

            this.phase = "faces";
            this.enableFlipperAnimation = true;
            this.cardRotateDeg = 180;
            await this.wait(1000);

            this.phase = "backs";
            this.cardRotateDeg = 360;
            await this.wait(1000);

            this.enableFlipperAnimation = false;
            this.cardRotateDeg = 0;
            this.phase = "shuffle";
            this.enableMoveAnimation = true;
            for (let turn = 0; turn < 4; turn += 1) {
                this.doShuffle();
                await this.wait(500);
            }
            this.enableMoveAnimation = false;
            this.cardMoveDistance = [];
            this.animationPlaying = false;
        },
        async moveResultToCenter(cardId) {
            const selectedIndex = this.cards.findIndex((card) => Number(card.id) === Number(cardId));
            if (selectedIndex < 0 || selectedIndex === this.centerIndex) return;
            const refs = Array.isArray(this.$refs.cardRefs) ? this.$refs.cardRefs : [];
            const selectedCard = refs[selectedIndex];
            const centerCard = refs[this.centerIndex];
            if (!selectedCard || !centerCard) return;
            const distances = Array(refs.length).fill(0);
            distances[selectedIndex] = centerCard.offsetLeft - selectedCard.offsetLeft;
            distances[this.centerIndex] = selectedCard.offsetLeft - centerCard.offsetLeft;
            this.phase = "settle";
            this.enableMoveAnimation = true;
            this.cardMoveDistance = distances;
            await this.wait(600);
            this.enableMoveAnimation = false;
            this.cardMoveDistance = [];
        },
        async performDraw() {
            if (this.drawing || this.result || !this.cards.length) return;
            this.drawing = true;
            this.result = null;
            try {
                let response;
                let requestError;
                await Promise.all([
                    drawCard(this.eventId, this.matchId)
                        .then((value) => {
                            response = value;
                        })
                        .catch((error) => {
                            requestError = error;
                        }),
                    this.playPrelude(),
                ]);
                if (requestError) throw requestError;
                const drawResult = response.data.data;
                await this.moveResultToCenter(drawResult.card?.id);
                this.result = drawResult;
                await this.$nextTick();
                this.phase = "reveal";
                this.enableFlipperAnimation = true;
                this.enableResultAnimation = true;
                await this.wait(700);
                this.$emit("drawn", this.result);
                this.$message.success("天命签已抽取并公开");
            } catch (error) {
                console.error("[LoverV2DestinyCardDrawDialog.performDraw]", error);
                this.resetAnimation();
            } finally {
                this.drawing = false;
            }
        },
        beforeClose(done) {
            if (!this.drawing) done();
        },
        closeDialog() {
            if (this.drawing) return;
            this.$emit("update:modelValue", false);
        },
    },
};
</script>

<style lang="less">
.lover-v2-card-dialog {
    overflow: hidden;
    border: 1px solid #d5ae8b;
    border-radius: 12px;
    background: linear-gradient(145deg, rgba(255, 249, 235, 0.98), rgba(246, 225, 192, 0.98));
    box-shadow: 0 18px 60px rgba(72, 35, 28, 0.32);

    .el-dialog__header,
    .el-dialog__footer {
        margin: 0;
        padding: 20px 26px;
        border-color: rgba(139, 76, 61, 0.18);
    }

    .el-dialog__header {
        border-bottom: 1px solid rgba(139, 76, 61, 0.18);
    }

    .el-dialog__footer {
        border-top: 1px solid rgba(139, 76, 61, 0.18);
        text-align: center;
    }

    .el-dialog__body {
        padding: 24px 26px 20px;
    }

    .u-dialog-title {
        display: flex;
        align-items: baseline;
        gap: 12px;
        color: #58332d;

        span {
            font-size: 25px;
            font-weight: 700;
            letter-spacing: 4px;
        }

        small {
            color: #a27c70;
            font-size: 13px;
        }
    }

    .m-card-stage {
        position: relative;
        min-height: 490px;
        padding: 28px 22px 22px;
        overflow: hidden;
        border: 1px solid rgba(177, 119, 87, 0.3);
        border-radius: 12px;
        background:
            radial-gradient(circle at 50% 38%, rgba(255, 240, 190, 0.92), transparent 40%),
            linear-gradient(135deg, rgba(255, 252, 243, 0.92), rgba(237, 211, 174, 0.76));
    }

    .m-card-row {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
        min-height: 300px;
        perspective: 1920px;
    }

    .u-card {
        width: var(--card-width);
        height: var(--card-height);
        flex: 0 0 auto;
        perspective: 1920px;
        transition: var(--card-move-transition);

        &.is-result {
            z-index: 5;
        }
    }

    .u-card-flipper {
        position: relative;
        width: 100%;
        height: 100%;
        transform: var(--card-transform);
        transform-style: preserve-3d;
        transition: var(--card-flipper-transition);

        &.is-center {
            transform: var(--card-center-transform);
        }
    }

    .u-card-cover,
    .u-card-back {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 7px;
        backface-visibility: hidden;
        filter: drop-shadow(0 9px 12px rgba(82, 43, 31, 0.24));
    }

    .u-card-cover {
        object-fit: fill;
        transform: rotateY(180deg);
    }

    .u-card-back {
        z-index: 2;
        object-fit: fill;
    }

    .u-card-fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        border: 2px solid #c99565;
        background: linear-gradient(145deg, #fff8df, #d7ab70);
        color: #713e33;
        font-weight: 700;
    }

    .is-reveal .u-card:not(.is-center) {
        opacity: 0.28;
        filter: blur(0.4px);
    }

    .u-result-fire {
        pointer-events: none;
        position: absolute;
        z-index: 1;
        top: -18px;
        left: 50%;
        width: 480px;
        height: 410px;
        opacity: var(--fire-opacity);
        transform: translateX(-50%) scale(1.42);
        transition: opacity 0.5s ease;
    }

    .m-result-copy {
        position: relative;
        z-index: 3;
        min-height: 104px;
        margin: 20px auto 0;
        text-align: center;

        span {
            color: #a27667;
            font-size: 13px;
        }

        h3 {
            margin: 5px 0 8px;
            color: #66382f;
            font-size: 24px;
            letter-spacing: 2px;
        }

        p {
            max-width: 640px;
            margin: 0 auto;
            color: #8e7068;
            font-size: 14px;
            line-height: 1.75;
        }
    }

    .el-button--primary {
        border-color: #95473b;
        background: #95473b;
        color: #fff7ea;

        &:hover,
        &:focus {
            border-color: #7e372e;
            background: #7e372e;
            color: #fff;
        }
    }
}

@media screen and (max-width: 760px) {
    .lover-v2-card-dialog {
        width: calc(100vw - 24px) !important;

        .el-dialog__body {
            padding: 16px 10px;
        }

        .m-card-stage {
            --card-width: 52px !important;
            --card-height: 130px !important;
            min-height: 390px;
            padding: 24px 6px 18px;
        }

        .m-card-row {
            gap: 7px;
            min-height: 190px;
        }

        .m-result-copy {
            margin-top: 18px;
        }
    }
}
</style>
