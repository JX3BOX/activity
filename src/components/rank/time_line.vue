<template>
    <div class="w-time-line-box">
        <h2>活动时间线</h2>
        <div class="m-time-line-box">
            <img
                v-show="!isApp"
                class="u-arr u-arr-left"
                :class="{ 'u-arr__hide': !currentIndex }"
                @click="scroll('left')"
                :src="arrow"
            />
            <div
                class="m-timeline"
                @touchstart="onDragStart"
                @touchmove="onDragMove"
                @touchend="onDragEnd"
                @mousedown="onDragStart"
                @mousemove="onDragMove"
                @mouseup="onDragEnd"
                @mouseleave="onDragEnd"
            >
                <ul ref="timeline" :style="{ left: listLeft + 'px' }" v-html="html"></ul>
            </div>
            <img
                v-show="!isApp"
                class="u-arr u-arr-right"
                :class="{ 'u-arr__hide': currentIndex == totalDay }"
                @click="scroll('right')"
                :src="arrow"
            />
        </div>
    </div>
</template>

<script>
import { __imgPath } from "@/utils/config";
import { isApp } from "@/utils/env";
export default {
    name: "TimeLine",
    props: {
        html: {
            type: String,
            default: "",
        },
    },
    data: function () {
        return {
            listLeft: 0,
            dragging: false,
            startX: 0,
            startLeft: 0,
            currentIndex: 0,
            totalDay: 0,
            arrow: `${__imgPath}image/rank/common/timeline_arrow.svg`,
        };
    },
    computed: {
        isApp() {
            return isApp();
        },
    },
    watch: {
        isApp() {
            this.dragging = false;
            this.$nextTick(() => this.setLiPosition(true));
        },
        html: {
            immediate: true,
            handler(val) {
                val &&
                    this.$nextTick(() => {
                        const list = this.$refs.timeline;
                        const liElements = list.querySelectorAll("li");
                        const today = new Date();
                        const currentMonth = today.getMonth() + 1; // 月份是从0开始计数的，所以需要加1
                        const currentDate = today.getDate();
                        let nearestIndex = -1;
                        let hasReachedToday = false;
                        let totalDays = 0;
                        liElements.forEach((li, index) => {
                            const timeSpan = li.querySelector(".u-time");
                            if (timeSpan) {
                                const timeParts = timeSpan.textContent.split("-");
                                const month = parseInt(timeParts[0], 10);
                                const date = parseInt(timeParts[1], 10);
                                totalDays++;
                                if (month === currentMonth && date === currentDate) {
                                    hasReachedToday = true;
                                    nearestIndex = index;
                                } else {
                                    if (month < currentMonth || (month === currentMonth && date <= currentDate)) {
                                        nearestIndex = index;
                                    }
                                }
                            }
                        });
                        if (nearestIndex !== -1) {
                            const nearestLi = liElements[nearestIndex];
                            nearestLi.classList.add("nearest");
                        }
                        if (hasReachedToday) {
                            for (let i = nearestIndex + 1; i < liElements.length; i++) {
                                liElements[i].classList.add("after-today");
                            }
                        }
                        this.setLiPosition(true);
                        this.totalDay = liElements.length - 1;
                        if (!this.isApp) this.currentIndex = Math.max(0, nearestIndex);
                    });
            },
        },
    },
    methods: {
        setLiPosition(firstLoad) {
            const list = this.$refs.timeline;
            const liElements = list.querySelectorAll("li");
            let left = this.isApp ? 16 : 0;
            const width = this.isApp ? 24 : 34;
            for (let i = 0; i < liElements.length; i++) {
                const li = liElements[i];
                li.style.left = left + "px";
                left += li.offsetWidth + width;
                if (!firstLoad && i === this.currentIndex) {
                    const containerWidth = list.offsetWidth;
                    const nodeRight = li.offsetLeft + li.offsetWidth;
                    let target = -li.offsetLeft;
                    const maxScroll = -(nodeRight - containerWidth);
                    if (target < maxScroll) target = maxScroll;
                    this.listLeft = target;
                }
            }
            if (firstLoad) {
                if (this.isApp) {
                    // app 模式：最后一个节点贴右侧边缘
                    this.alignLastRight();
                } else {
                    const nearest = list.querySelector("li.nearest");
                    nearest && this.initTreatment(nearest);
                }
            }
        },
        initTreatment(dom) {
            const parentWidth = this.$refs.timeline.offsetWidth;
            const liOffsetLeft = dom.offsetLeft;
            this.listLeft = parentWidth / 2 - liOffsetLeft - dom.offsetWidth / 2;
        },
        alignLastRight() {
            const list = this.$refs.timeline;
            const liElements = list.querySelectorAll("li");
            const last = liElements[liElements.length - 1];
            if (!last) return;
            const offset = last.offsetLeft + last.offsetWidth - list.offsetWidth;
            this.listLeft = Math.min(0, -offset - 16);
        },
        scrollBounds() {
            const list = this.$refs.timeline;
            const liElements = list.querySelectorAll("li");
            const last = liElements[liElements.length - 1];
            if (!last) return { min: 0, max: 0 };
            const min = -Math.max(0, last.offsetLeft + last.offsetWidth - list.offsetWidth + 16);
            return { min, max: 0 };
        },
        onDragStart(e) {
            if (!this.isApp) return;
            this.dragging = true;
            this.startX = e.touches ? e.touches[0].clientX : e.clientX;
            this.startLeft = this.listLeft;
        },
        onDragMove(e) {
            if (!this.dragging) return;
            const x = e.touches ? e.touches[0].clientX : e.clientX;
            const delta = x - this.startX;
            const { min, max } = this.scrollBounds();
            this.listLeft = Math.max(min, Math.min(max, this.startLeft + delta));
            if (e.cancelable) e.preventDefault();
        },
        onDragEnd() {
            this.dragging = false;
        },
        scroll(direction) {
            const list = this.$refs.timeline;
            if (!list) return;
            if (direction === "left") {
                this.currentIndex = Math.max(0, this.currentIndex - 1);
            } else if (direction === "right") {
                this.currentIndex = Math.min(this.currentIndex + 1, this.totalDay);
            }
            this.setLiPosition(false);
        },
    },
};
</script>

<style lang="less">
.w-time-line-box {
    .pr;
    .clip;
    .mb(88px);
    .w(100%);
    h2 {
        margin: 0;
    }
    .m-time-line-box {
        .pr;
        .flex;
        .clip;
        .h(200px);
        .auto(x);
        .mb(50px);
        gap: 10px;
        align-items: center;
        padding: 0 44px;
        box-sizing: border-box;
        .m-timeline {
            .clip;
            .size(100%,200px);
            .flex;
            box-sizing: border-box;
            padding: 57px 10px 0 10px;
            box-sizing: border-box;
            align-items: center;
        }

        ul {
            .pr;
            .size(100%,1px);
            margin: 0;
            transition: left 0.2s;
        }
        li {
            .pa;
            .flex;
            top: -56px;
            flex-direction: column;
            list-style: none;
            align-items: center;
            justify-content: center;
            &::after {
                content: "";
                .pa;
                .size(1980px,1px);
                top: 57px;
                background-color: #feecc5;
            }
            .u-time {
                .fz(22px);
                .bold;
                color: rgba(254, 236, 197, 1);
                &::after {
                    content: "";
                    .db;
                    .auto(x);
                    .size(17px);
                    background-color: #feecc5;
                    transform: rotate(45deg);
                    border: 2px solid white;
                    box-sizing: border-box;
                }
            }
            .u-label {
                .pr;
                .z(1);
                .pointer;
                .fz(16px,42px);
                .mt(20px);
                height: 45px;
                padding: 0 30px 0 34px;
                color: #474747;
                white-space: nowrap;
                box-sizing: border-box;

                &::after {
                    content: "";
                    .pa;
                    .z(-1);
                    .size(100%);
                    top: -2px;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background: linear-gradient(270deg, #f9e5bb 0%, #ffffff 100%);
                    border-radius: 8px 0 10px 0;
                    transform: skewX(-0.06turn);
                }

                &::before {
                    content: "";
                    .db;
                    .pa;
                    .z(2);
                    .size(2px,14px);
                    .auto(x);
                    left: calc(50% - 1px);
                    top: -14px;
                    background: linear-gradient(180deg, rgba(254, 236, 197, 0) 0%, #fcf1da 100%);
                }
            }
            &.after-today {
                .u-time {
                    &::after {
                        .pr;
                        .z(1);
                        background-color: #37495b;
                        border-color: #8d99a6;
                    }
                }
            }
        }
    }
    .u-arr {
        .pa;
        .pointer;
        .size(35px);
        .z(9);
        top: 50%;
        transform: translateY(-50%);
        transition: 0.2s all;
        &.u-arr-left {
            left: 4px;
        }
        &.u-arr-right {
            right: 4px;
        }
        &:hover {
            filter: brightness(110%);
        }
        &.u-arr__hide {
            opacity: 0;
            cursor: initial;
            pointer-events: none;
        }
    }
}
</style>
