<template>
    <div class="w-time-line-box">
        <h2>活动时间线</h2>
        <div class="m-time-line-box">
            <img
                class="u-arr u-arr-left"
                :class="{
                    'u-arr__hide': !currentIndex,
                }"
                @click="scroll('left')"
                :src="arrow"
            />
            <div class="m-timeline">
                <ul ref="timeline" :style="{ left: listLeft + 'px' }" v-html="html"></ul>
            </div>
            <img
                class="u-arr u-arr-right"
                :class="{
                    'u-arr__hide': currentIndex == totalDay,
                }"
                @click="scroll('right')"
                :src="arrow"
            />
        </div>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
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
            currentIndex: 0,
            totalDay: 0,
            arrow: `${__imgPath}image/rank/common/timeline_arrow.svg`,
        };
    },
    watch: {
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
                            const progressDiv = document.createElement("div");
                            progressDiv.classList.add("progress"); // 添加 class
                            progressDiv.textContent = `当前进度`;
                            nearestLi.appendChild(progressDiv);
                        }
                        if (hasReachedToday) {
                            for (let i = nearestIndex + 1; i < liElements.length; i++) {
                                liElements[i].classList.add("after-today");
                            }
                        }
                        this.totalDay = totalDays - 1;
                        this.setLiPosition(true);
                    });
            },
        },
    },
    methods: {
        setLiPosition(firstLoad) {
            const list = this.$refs.timeline;
            const liElements = list.querySelectorAll("li");
            let left = 0;
            for (let i = 0; i < liElements.length; i++) {
                const li = liElements[i];
                li.style.left = left + "px";
                left += li.offsetWidth + 34;
                if (!firstLoad) {
                    if (i === this.currentIndex) {
                        this.listLeft = -li.offsetLeft;
                    }
                } else {
                    if (li.classList[0] == "nearest") {
                        this.initTreatment(li);
                    }
                }
            }
        },
        initTreatment(dom) {
            const parentWidth = this.$refs.timeline.offsetWidth;
            const liOffsetLeft = dom.offsetLeft;
            const offsetLeft = parentWidth / 2 - liOffsetLeft - dom.offsetWidth / 2;
            this.listLeft = offsetLeft;
            this.$nextTick(() => {
                const list = this.$refs.timeline;
                const liElements = list.querySelectorAll("li");
                for (let i = 0; i < liElements.length; i++) {
                    if (-this.listLeft >= liElements[i].offsetLeft && -this.listLeft <= liElements[i + 1].offsetLeft) {
                        this.currentIndex = i + 1;
                        // 如果需要左侧保持不裁剪，增加下面代码
                        // this.listLeft = -liElements[i].offsetLeft;
                    }
                }
            });
        },
        scroll(direction) {
            const list = this.$refs.timeline;
            const li = list.querySelector("li");
            if (!li) return;
            if (direction === "left") {
                this.currentIndex = Math.max(0, this.currentIndex - 1);
            } else if (direction === "right") {
                this.currentIndex = Math.min(this.currentIndex + 1, list.children.length - 1);
            }
            this.setLiPosition();
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
        padding: 0 20px;
        box-sizing: border-box;
        .m-timeline {
            .clip;
            .size(100%,200px);
            .flex;
            box-sizing: border-box;
            padding: 57px 10px 0 10px;
            box-sizing: border-box;
            align-items: center;

            .progress {
                position: absolute;
                .fz(18px);
                top: -30px;
                color: white;
                font-weight: bold;
                &::after {
                    content: "";
                    .pa;
                    .size(107px,6px);
                    bottom: 40px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-radius: 3px;
                    background-color: #feecc5;
                }
            }
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
                    .full;
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
        // .pa;
        .pointer;
        .size(35px);
        .z(9);
        .mt(57px);
        bottom: 0;
        transition: 0.2s all;
        &.u-arr-left {
            left: -45px;
        }
        &.u-arr-right {
            right: -45px;
            transform: rotate(180deg);
        }
        &:hover {
            filter: brightness(110%);
        }

        &.u-arr__hide {
            opacity: 0;
            cursor: initial;
        }
    }
}
</style>
