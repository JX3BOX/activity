<template>
    <div
        class="easy-slider slider"
        :style="sliderStyle"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
    >
        <slot v-if="!sliderItems.length" name="loading">
            <div class="easy-slider__loading slider-loading">
                <div class="ball-pulse">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </slot>
        <div ref="touchArea" class="easy-slider__wrapper slider-wrapper slider-items">
            <slot />
        </div>
        <div
            v-if="indicators"
            :class="[
                'easy-slider__indicators',
                `easy-slider__indicators--${indicators}`,
                'slider-indicators',
                `slider-indicators-${indicators}`,
            ]"
            @click.stop
        >
            <span
                v-for="i in sliderItems.length"
                :key="i"
                :class="[
                    'easy-slider__indicator',
                    'slider-indicator-icon',
                    { 'easy-slider__indicator--active slider-indicator-active': currentIndex === i - 1 },
                ]"
                @click="handleIndicator(i - currentIndex - 1)"
            ></span>
        </div>
        <div v-if="controlBtn" class="easy-slider__btns slider-btns">
            <button type="button" class="slider-btn slider-btn-left" :aria-label="prevBtnLabel" @click.stop="prev">
                <span class="slider-icon slider-icon-left"></span>
            </button>
            <button type="button" class="slider-btn slider-btn-right" :aria-label="nextBtnLabel" @click.stop="next">
                <span class="slider-icon slider-icon-right"></span>
            </button>
        </div>
    </div>
</template>

<script>
import { computed, nextTick, onActivated, onBeforeUnmount, onDeactivated, onMounted, provide, ref, watch } from "vue";

export default {
    name: "EasySlider",
    props: {
        modelValue: { type: Number, default: undefined },
        value: { type: Number, default: undefined },
        width: { type: String, default: "auto" },
        height: { type: String, default: "300px" },
        touch: { type: Boolean, default: true },
        animation: { type: String, default: "normal" },
        autoplay: { type: Boolean, default: true },
        stopOnHover: { type: Boolean, default: false },
        interval: { type: Number, default: 3000 },
        speed: { type: Number, default: 500 },
        indicators: { type: [String, Boolean], default: "center" },
        controlBtn: { type: Boolean, default: true },
        beforePrevious: { type: Function, default: () => true },
        beforeNext: { type: Function, default: () => true },
        prevBtnLabel: { type: String, default: "Previous slide" },
        nextBtnLabel: { type: String, default: "Next slide" },
    },
    emits: ["update:modelValue", "change", "next", "previous"],
    setup(props, { emit }) {
        const sliderItems = ref([]);
        const currentIndex = ref(0);
        const timer = ref(null);
        const isStopped = ref(false);
        const touchArea = ref(null);
        let initTimer = null;
        let moveTimer = null;
        let touchStartX = 0;
        let touchStartY = 0;

        const activeValue = computed(() => {
            if (typeof props.modelValue === "number") {
                return props.modelValue;
            }
            if (typeof props.value === "number") {
                return props.value;
            }
            return 0;
        });

        const sliderStyle = computed(() => ({
            width: props.width,
            height: props.height,
        }));

        function clearAutoTimer() {
            if (timer.value) {
                clearInterval(timer.value);
                timer.value = null;
            }
        }

        function clearPendingTimers() {
            if (initTimer) {
                clearTimeout(initTimer);
                initTimer = null;
            }
            if (moveTimer) {
                clearTimeout(moveTimer);
                moveTimer = null;
            }
        }

        function auto() {
            if (!props.autoplay || isStopped.value) return;

            clearAutoTimer();
            timer.value = setInterval(() => {
                move(1);
            }, props.interval);
        }

        function init() {
            clearTimeout(initTimer);
            initTimer = setTimeout(() => {
                const startIndex =
                    activeValue.value >= 0 && activeValue.value <= sliderItems.value.length - 1 ? activeValue.value : 0;
                currentIndex.value = startIndex;
                const currentItem = sliderItems.value[currentIndex.value];

                if (currentItem) {
                    currentItem.init();
                    auto();
                }
            }, 100);
        }

        function registerItem(item) {
            sliderItems.value.push(item);
            init();

            return () => {
                const index = sliderItems.value.indexOf(item);
                if (index > -1) {
                    sliderItems.value.splice(index, 1);
                }
                if (currentIndex.value >= sliderItems.value.length) {
                    currentIndex.value = Math.max(sliderItems.value.length - 1, 0);
                }
                init();
            };
        }

        function canMove() {
            return sliderItems.value.length > 1;
        }

        function getNextIndex(step) {
            const len = sliderItems.value.length;
            if (!len) return 0;
            if (!sliderItems.value[currentIndex.value]) {
                currentIndex.value = len - 1;
            }
            return (currentIndex.value + step + len) % len;
        }

        function move(step) {
            if (!step || !canMove()) return;

            clearTimeout(moveTimer);
            moveTimer = setTimeout(() => {
                const isNext = step > 0;
                const nextIndex = getNextIndex(step);
                const currentItem = sliderItems.value[currentIndex.value];
                const nextItem = sliderItems.value[nextIndex];

                if (!currentItem || !nextItem || nextIndex === currentIndex.value) return;

                currentItem.hide(isNext);
                nextItem.show(isNext);
                currentIndex.value = nextIndex;
                emit("update:modelValue", nextIndex);
                emit("change", nextIndex);
            }, Math.max(props.speed - 200, 0));
        }

        function handleControlBtn(type) {
            if (!canMove()) return;

            const step = type === "next" ? 1 : -1;
            const nextIndex = getNextIndex(step);
            emit(type, { original: currentIndex.value, next: nextIndex });
            move(step);
            auto();
        }

        function prev() {
            if (props.beforePrevious()) {
                handleControlBtn("previous");
            }
        }

        function next() {
            if (props.beforeNext()) {
                handleControlBtn("next");
            }
        }

        function handleIndicator(step) {
            if (step && canMove()) {
                move(step);
                auto();
            }
        }

        function handleMouseenter() {
            if (props.autoplay && props.stopOnHover) {
                isStopped.value = true;
                clearAutoTimer();
            }
        }

        function handleMouseleave() {
            if (props.autoplay && props.stopOnHover) {
                isStopped.value = false;
                auto();
            }
        }

        function handleTouchstart(event) {
            const touch = event.changedTouches && event.changedTouches[0];
            if (!touch) return;

            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        }

        function handleTouchend(event) {
            const touch = event.changedTouches && event.changedTouches[0];
            if (!touch) return;

            const deltaX = touch.clientX - touchStartX;
            const deltaY = touch.clientY - touchStartY;

            if (Math.abs(deltaX) > 30 && Math.abs(deltaX) >= Math.abs(deltaY)) {
                deltaX < 0 ? next() : prev();
            }
        }

        function initTouchArea() {
            if (!touchArea.value || !props.touch) return;

            touchArea.value.removeEventListener("touchstart", handleTouchstart);
            touchArea.value.removeEventListener("touchend", handleTouchend);
            touchArea.value.addEventListener("touchstart", handleTouchstart, { passive: true });
            touchArea.value.addEventListener("touchend", handleTouchend, { passive: true });
        }

        function destroyTouchArea() {
            if (!touchArea.value) return;

            touchArea.value.removeEventListener("touchstart", handleTouchstart);
            touchArea.value.removeEventListener("touchend", handleTouchend);
        }

        watch(
            activeValue,
            (val) => {
                const step = val - currentIndex.value;
                if (!step || val < 0 || val > sliderItems.value.length - 1) return;

                handleIndicator(step);
            }
        );

        watch(
            () => props.autoplay,
            (enabled) => {
                if (enabled) {
                    auto();
                    return;
                }
                clearAutoTimer();
            }
        );

        watch(
            () => props.touch,
            (enabled) => {
                if (enabled) {
                    nextTick(initTouchArea);
                    return;
                }
                destroyTouchArea();
            }
        );

        provide("easySliderRegister", registerItem);
        provide(
            "easySliderOptions",
            computed(() => ({
                animation: props.animation,
                speed: props.speed,
            }))
        );

        onMounted(() => {
            init();
            nextTick(initTouchArea);
        });

        onActivated(() => {
            init();
            nextTick(initTouchArea);
        });

        onBeforeUnmount(() => {
            clearAutoTimer();
            clearPendingTimers();
            destroyTouchArea();
        });

        onDeactivated(() => {
            clearAutoTimer();
            destroyTouchArea();
        });

        return {
            sliderItems,
            currentIndex,
            sliderStyle,
            touchArea,
            prev,
            next,
            handleIndicator,
            handleMouseenter,
            handleMouseleave,
        };
    },
};
</script>

<style>
.easy-slider {
    position: relative;
    overflow: hidden;
}
.easy-slider__loading,
.slider-loading {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.08);
}
.easy-slider__wrapper,
.slider-wrapper,
.slider-items {
    position: relative;
    width: 100%;
    height: 100%;
}
.easy-slider__btns,
.slider-btns {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
.easy-slider__btns .slider-btn,
.slider-btns .slider-btn {
    position: absolute;
    top: 0;
    pointer-events: auto;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 100%;
    padding: 0;
    border: none;
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    outline: none;
    transition: background 0.3s;
}
.easy-slider__btns .slider-btn:hover .slider-icon,
.slider-btns .slider-btn:hover .slider-icon {
    border-color: rgba(255, 255, 255, 1);
}
.easy-slider__btns .slider-btn-left,
.slider-btns .slider-btn-left {
    left: 0;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0));
}
.easy-slider__btns .slider-btn-right,
.slider-btns .slider-btn-right {
    right: 0;
    background: linear-gradient(-90deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0));
}
.slider-icon {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-left: 2px solid rgba(255, 255, 255, 0.6);
    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
    transition: border 0.2s;
}
.slider-icon-left {
    transform: rotate(45deg);
}
.slider-icon-right {
    transform: rotate(-135deg);
}
.easy-slider__indicators {
    position: absolute;
    bottom: 20px;
    z-index: 999;
    display: flex;
    justify-content: center;
    gap: 8px;
}
.easy-slider__indicators--center,
.slider-indicators-center {
    left: 50%;
    transform: translateX(-50%);
}
.easy-slider__indicators--left {
    left: 6%;
}
.easy-slider__indicators--right {
    right: 6%;
}
.easy-slider__indicator {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: background-color 0.3s;
}
.easy-slider__indicator--active {
    background: rgba(255, 255, 255, 0.8);
}
.ball-pulse > div:nth-child(1) {
    animation: easy-slider-scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}
.ball-pulse > div:nth-child(2) {
    animation: easy-slider-scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}
.ball-pulse > div:nth-child(3) {
    animation: easy-slider-scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}
.ball-pulse > div {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin: 2px;
    border-radius: 100%;
    background-color: #fff;
    animation-fill-mode: both;
}
@keyframes easy-slider-scale {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    45% {
        transform: scale(0.1);
        opacity: 0.7;
    }
    80% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
