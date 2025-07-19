<template>
    <div class="p-lover-card" :style="containerStyle">
        <div class="m-container">
            <div class="m-top-section">
                <div class="m-header">
                    <div class="m-title">
                        <img class="u-title-img" :src="`${cdnLink}design/event/lover/title.png`" alt="title" />
                        <div class="m-subtitle">
                            <div class="u-line">
                                <span class="u-line-title">裁判</span>
                                <span class="u-line-content">组织抽取“同心天命签”并公布结果</span>
                            </div>
                            <div class="u-line">
                                <span class="u-line-title">选手</span>
                                <span class="u-line-content">根据抽签结果调整配装与奇穴，锁定配置</span>
                            </div>
                        </div>
                    </div>
                    <div class="m-cards-info">
                        <div class="u-title">天命签效果说明</div>
                        <div class="u-list">
                            <div v-for="(card, index) in cards" :key="index" class="u-list-item">
                                <span class="u-list-item-name">{{ card.name }}</span>
                                <span>-</span>
                                <span class="u-list-item-desc">{{ card.desc }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-cards">
                    <video
                        class="u-result-fire"
                        autoplay
                        disablepictureinpicture
                        disableremoteplayback
                        loop
                        muted
                        playsinline
                        :src="`${cdnLink}design/event/lover/fire.webm`"
                    ></video>
                    <div
                        class="u-card"
                        v-for="(card, index) in renderCards"
                        :key="index"
                        :style="cardStyle(index)"
                        ref="cardRef"
                    >
                        <div class="u-card-flipper" :class="{ 'is-center': index === Math.floor(cards.length / 2) }">
                            <img class="u-card-cover" :src="card.img" alt="" />
                            <img class="u-card-back" :src="cardBackImg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-actions-section">
                <div class="m-select">
                    <el-select
                        class="u-select u-select-event"
                        v-model="slug"
                        placeholder="选择活动"
                        popper-class="m-card-select-popper"
                        @change="onSelectEvent"
                        :disabled="onDrawing || enableResultAnimation"
                    >
                        <el-option
                            v-for="item in $store.state.events"
                            :key="item.slug"
                            :label="item.name"
                            :value="item.slug"
                        >
                        </el-option>
                    </el-select>
                    <el-select
                        class="u-select u-select-process"
                        v-model="currentProcessId"
                        placeholder="选择赛程"
                        popper-class="m-card-select-popper"
                        :disabled="onDrawing || enableResultAnimation"
                    >
                        <el-option
                            v-for="item in processes"
                            :key="item.id"
                            :label="`第 ${item.round} 轮`"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                    <el-select
                        class="u-select u-select-team"
                        v-model="currentTeamId"
                        placeholder="选择队伍"
                        popper-class="m-card-select-popper"
                        :disabled="onDrawing || enableResultAnimation"
                    >
                        <el-option v-for="item in teamOptions" :key="item.id" :label="item.team_name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="u-draw-button" @click="onDraw"></div>
                <div class="u-confirm-button" :class="{ 'is-ready': currentCard }" @click="onSetCard">
                    <div class="u-draw-result" v-if="currentCard">
                        <span>本次抽得：</span>
                        <span class="u-draw-result-name">{{ currentCard.name }}</span>
                    </div>
                    <span v-if="currentCard">提交结果</span>
                    <span v-else>未出结果</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { __cdn as cdnLink } from "@jx3box/jx3box-common/data/jx3box.json";
import { getEventCardList, pickCard, getProcessListManage, setProcessCardId } from "@/service/rank/lover.js";

export default {
    name: "",
    components: {},
    props: {},
    data: () => ({
        cdnLink,
        slug: null,
        cardBackImg: `${cdnLink}design/event/lover/q0.png`,
        cards: [],
        processes: [],

        currentProcessId: null,
        currentTeamId: null, // 当前选中的队伍ID
        currentCard: null,

        // 动画控制
        onDrawing: false,
        animationPlaying: false,
        enableFlipperAnimation: true,
        cardRotateDeg: 0, // 卡片旋转角度
        enableMoveAnimation: false, // 是否启用移动动画
        cardMoveDistance: [],
        enableResultAnimation: false, // 是否启用结果动画
    }),
    computed: {
        events() {
            return this.$store.state.events;
        },
        currentEvent() {
            return this.$store.state.event;
        },
        containerStyle() {
            const result = {
                "--background-image": `url(${cdnLink}design/event/lover/bg.webp)`,
                "--draw-image": `url(${cdnLink}design/event/lover/open0.png)`,
                "--draw-image-hover": `url(${cdnLink}design/event/lover/open1.png)`,
            };
            if (this.enableFlipperAnimation) {
                result["--card-flipper-transition"] = "transform 0.5s";
            }
            if (this.enableMoveAnimation) {
                result["--card-move-transition"] = "transform 0.5s";
            }
            if (this.enableResultAnimation) {
                result["--card-flipper-transition"] = "transform 0.5s";
                result["--card-center-transform"] = `rotateY(180deg) scale(1.04)`;
                result["--file-opacity"] = 1;
            }
            result["--card-transform"] = `rotateY(${this.cardRotateDeg}deg)`;
            return result;
        },
        renderCards() {
            const list = [...this.cards];
            if (this.currentCard) {
                // 将当前抽中的卡片放到中间位置
                const index = list.findIndex((item) => item.id === this.currentCard.id);
                if (index !== -1) {
                    const [card] = list.splice(index, 1);
                    list.splice(Math.floor(list.length / 2), 0, card);
                }
            }
            return list;
        },
        currentProcess() {
            return this.processes.find((item) => item.id === this.currentProcessId) || null;
        },
        teamOptions() {
            if (!this.currentProcess) return [];
            return [this.currentProcess.team1_record, this.currentProcess.team2_record].filter(Boolean);
        },
    },
    watch: {
        "$route.params.slug": {
            immediate: true,
            handler(newVal) {
                this.slug = newVal;
            },
        },
        "currentEvent.id": {
            immediate: true,
            deep: true,
            handler() {
                this.loadCards();
                this.loadProcessList();
            },
        },
    },
    methods: {
        async onDraw() {
            if (this.onDrawing || this.animationPlaying) return;
            if (!this.currentProcessId || !this.currentTeamId) {
                this.$message.error("请先选择赛程和队伍");
                return;
            }
            this.onDrawing = true;
            this.currentCard = null; // 重置当前卡片
            const [drawResult] = await Promise.all([this.loadDrawResult(), this.playAnimation()]);
            if (!drawResult) return;
            // 将指定id的卡片
            this.currentCard = drawResult;
            this.onDrawing = false;
        },
        async playAnimation() {
            if (this.animationPlaying) return;
            this.resetAnimation();
            // ===== 动画开始
            this.animationPlaying = true;
            // 1. 所有卡片翻到正面用时0.5s，停留0.5s
            this.enableFlipperAnimation = true;
            this.cardRotateDeg = 180;
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // 2. 所有卡片翻到背面用时0.5s，停顿0.5s
            this.cardRotateDeg = 360;
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // 重置
            this.enableFlipperAnimation = false;
            this.cardRotateDeg = 0;
            // 3. 开始洗牌，最左侧与最右侧交换位置。
            this.enableMoveAnimation = true;
            for (let i = 0; i < 4; i++) {
                this.doShuffle();
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
            this.enableMoveAnimation = false;
            this.$set(this, "cardMoveDistance", []); // 清空移动距离
            // 4. 中间的签翻到正面，方法，播放动画
            this.enableResultAnimation = true;
            this.animationPlaying = false;
        },
        doShuffle() {
            // 计算各个卡片的移动距离，第一张和最后一张交换位置，第二张和倒数第二张交换位置，以此类推，中间的不动
            if (this.cardMoveDistance.length) {
                // 如果当前已经有移动距离，恢复即可。
                this.$set(this, "cardMoveDistance", []);
                return;
            }
            const cardRefs = this.$refs.cardRef;
            for (let i = 0; i < cardRefs.length / 2; i++) {
                const leftCard = cardRefs[i];
                const rightCard = cardRefs[cardRefs.length - 1 - i];
                // 计算移动距离
                const leftDistance = rightCard.offsetLeft - leftCard.offsetLeft;
                const rightDistance = leftCard.offsetLeft - rightCard.offsetLeft;
                this.$set(this.cardMoveDistance, i, leftDistance);
                this.$set(this.cardMoveDistance, cardRefs.length - 1 - i, rightDistance);
            }
        },
        resetAnimation() {
            this.enableFlipperAnimation = false;
            this.enableMoveAnimation = false;
            this.enableResultAnimation = false;
            this.animationPlaying = false;
            this.cardRotateDeg = 0;
            this.$set(this, "cardMoveDistance", []);
        },
        cardStyle(index) {
            if (this.enableMoveAnimation) {
                return {
                    transform: `translateX(${this.cardMoveDistance[index] || 0}px)`,
                };
            }
            if (this.enableResultAnimation && index === Math.floor(this.cards.length / 2)) {
                return {
                    transform: `scale(1.2)`,
                    transition: "transform 0.5s",
                };
            }
        },
        loadCards() {
            getEventCardList({
                _no_page: 1,
                event_id: this.currentEvent.id,
            }).then((res) => {
                this.cards = res.data.data.list || [];
            });
        },
        loadProcessList() {
            getProcessListManage({
                _no_page: 1,
                event_id: this.currentEvent.id,
            })
                .then((res) => {
                    this.processes = res.data.data.list || [];
                    console.log([...this.processes]);
                })
                .catch((error) => {
                    console.error("获取流程列表失败:", error);
                    this.$message.error("获取流程列表失败，请稍后再试");
                });
        },
        async loadDrawResult() {
            return pickCard(this.currentEvent.id, 190)
                .then((res) => {
                    return res.data.data;
                })
                .catch((error) => {
                    console.error("抽签请求失败:", error);
                    this.$message.error("抽签请求失败，请稍后再试");
                });
        },
        onSelectEvent(value) {
            if (value != this.slug) {
                this.$router.push({ name: "card", params: { slug: value } });
            }
        },
        onSetCard() {
            if (!this.currentCard) {
                return;
            }
            this.$confirm(`是否将卡片 ${this.currentCard.name} 设置为当前队伍的天命签？`, "确认")
                .then(() => {
                    const key =
                        this.currentProcess.team1_record.id === this.currentTeamId ? "team1_card" : "team2_card";
                    setProcessCardId(this.currentProcessId, {
                        [key]: this.currentCard.id,
                    }).then(() => {
                        this.$message.success("设置卡片成功");
                        this.loadProcessList();
                    });
                })
                .catch(() => {});
        },
    },
};
</script>

<style lang="less">
.m-card-select-popper {
    &.el-select-dropdown {
        border: none;
        background: rgba(44, 24, 24, 0.8);

        .popper__arrow {
            border-bottom-color: rgba(44, 24, 24, 0.8);

            &::after {
                border-bottom-color: rgba(44, 24, 24, 0.8);
            }
        }

        .el-select-dropdown__item {
            background: transparent;
            color: #f3ca94;

            &.hover {
                background: rgba(44, 24, 24, 0.5);
            }

            &.selected {
                filter: brightness(1.2);
            }
        }

        .el-select-dropdown__empty {
            color: #f3ca94;
            text-align: center;
        }
    }
}
.p-lover-card {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 1200px;
    min-height: 696px;
    overflow-y: auto;
    height: 100vh;
    width: 100vw;

    background-size: cover;
    background-image: var(--background-image);

    .m-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 77px;
    }

    .m-top-section {
        display: flex;
        flex-direction: column;
        gap: 36px;
    }

    .m-header {
        display: flex;
        justify-content: space-between;
    }

    .m-title {
        display: flex;
        flex-direction: column;
        height: 150px;

        gap: 7px;

        .u-title-img {
            .size(403px, 87px);
        }
    }

    .m-subtitle {
        border-radius: 8px;
        background: linear-gradient(90deg, rgba(44, 24, 24, 1) 0%, rgba(44, 24, 24, 0) 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 4px;
        padding: 8px;

        .u-line {
            display: flex;
            align-items: center;
            gap: 4px;

            .u-line-title {
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 2px;
                background: linear-gradient(90deg, rgba(217, 188, 154, 1) 0%, rgba(250, 229, 187, 1) 100%);
                padding: 0px 8px 0px 8px;
                color: #492925;

                font-size: 12px;
                font-weight: 700;
            }

            .u-line-content {
                .fz(12px, 17.38px);
                color: rgba(240, 218, 194, 1);
                font-weight: 400;
            }
        }
    }

    .m-cards-info {
        display: flex;
        flex-direction: column;
        padding: 12px;
        gap: 8px;
        background: linear-gradient(90deg, rgba(44, 24, 24, 1) 0%, rgba(44, 24, 24, 0) 100%);
        width: 400px;
        height: 150px;
        .r(8px);
        box-sizing: border-box;

        .u-title {
            .r(2px);
            background: linear-gradient(180deg, rgba(217, 188, 154, 1) 0%, rgba(250, 229, 187, 1) 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 6px 8px 6px 8px;
            width: fit-content;
            color: #492925;

            .fz(13px, 18.82px);
            font-weight: 700;
        }

        .u-list {
            display: flex;
            flex-direction: column;
            .fz(12px, 17.38px);
            color: rgba(222, 205, 166, 1);
        }

        .u-list-item {
            display: flex;
            gap: 3px;
        }

        .u-list-item-name {
            font-weight: 700;
        }
    }

    .m-cards {
        .pr;
        display: flex;
        gap: 80px;

        .u-result-fire {
            pointer-events: none;
            transform: scale(1.5);
            width: 480px;
            height: 475px;
            position: absolute;
            left: calc(50% - 240px);
            transition: opacity 0.5s;
            opacity: var(--file-opacity, 0);
        }

        .u-card {
            .size(160px, 400px);
            perspective: 1920px;
            transition: var(--card-move-transition);
        }

        .u-card-flipper {
            .size(100%, 100%);
            transform-style: preserve-3d;
            transition: var(--card-flipper-transition);
        }

        .u-card-cover,
        .u-card-back {
            .size(100%, 100%);
            position: absolute;
            backface-visibility: hidden;
        }

        .u-card-back {
            z-index: 2;
        }
        .u-card-cover {
            transform: rotateY(180deg);
        }

        // 卡片翻转效果
        .u-card-flipper {
            transform: var(--card-transform);

            &.is-center {
                transform: var(--card-center-transform, var(--card-transform));
            }
        }
    }

    .m-actions-section {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 48px;
        .pt(30px);

        .u-select {
            padding: 0;
            box-sizing: border-box;
            height: 37px;
            border-radius: 18px;
            background: rgba(44, 24, 24, 0.5);
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0;

            .fz(14px, 20.27px);
            font-weight: 400;

            /** 文本1 */
            color: rgba(243, 202, 148, 1);
            flex-grow: 1;

            .el-input__inner {
                background-color: transparent;
                color: rgba(243, 202, 148, 1);
                border: none;
                box-shadow: none;

                &::placeholder {
                    color: rgba(243, 202, 148, 0.5);
                }
            }
        }

        .u-draw-button {
            .pr;
            .pointer;
            .size(285px, 80px);
            box-sizing: border-box;
            background-image: var(--draw-image);
            background-size: cover;
            filter: drop-shadow(0px -30px 40px rgba(38, 27, 25, 0.5));

            &:hover {
                background-image: var(--draw-image-hover);
            }
        }

        .u-confirm-button {
            .pr;
            .size(250px, 80px);
            .r(18px);
            .fz(16px);
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(243, 202, 148, 1);
            background: rgba(44, 24, 24, 0.5);
            font-weight: 700;
            transition: all 0.3s ease-in-out;
            box-sizing: border-box;
            cursor: not-allowed;

            &.is-ready {
                .pointer;
                border: 1px solid rgba(209, 172, 145, 1);
                background: linear-gradient(180deg, rgba(102, 65, 51, 1) 0%, rgba(44, 24, 24, 1) 100%);
            }

            &.is-ready:hover {
                background: linear-gradient(180deg, rgba(44, 24, 24, 1) 0%, rgba(80, 56, 46, 1) 100%);
                border: 1px solid rgba(209, 172, 145, 1);
            }
        }

        .u-draw-result {
            .pa;
            .fz(14px, 20.27px);
            color: rgba(255, 229, 31, 1);
            top: -30px;
            font-weight: 400;
            pointer-events: none;
        }
        .u-draw-result-name {
            font-weight: 700;
            margin-left: 5px;
        }
    }

    .m-select {
        display: flex;
        flex-direction: column;
        gap: 2px;
        width: 250px;
        box-sizing: border-box;
        .pr;

        .u-select-team {
            .pa;
            top: -52px;
            width: 200px;
            left: calc(50% + 213px);
        }
    }

    .m-select-section {
        display: flex;
        gap: 8px;
    }
}
</style>
