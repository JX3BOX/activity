<template>
    <div class="easy-slider" :style="{ width, height }" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <div class="easy-slider__wrapper">
            <transition :name="transitionName">
                <div class="easy-slider__slide" :key="currentIndex">
                    <slot />
                </div>
            </transition>
        </div>
        <div v-if="controlBtn" class="easy-slider__btns">
            <button class="slider-btn slider-btn-left" @click="prev">
                <span class="slider-icon slider-icon-left"></span>
            </button>
            <button class="slider-btn slider-btn-right" @click="next">
                <span class="slider-icon slider-icon-right"></span>
            </button>
        </div>
        <div v-if="indicators !== false" :class="['easy-slider__indicators', `easy-slider__indicators--${indicators}`]">
            <span
                v-for="(_, i) in itemCount"
                :key="i"
                :class="['easy-slider__indicator', { 'easy-slider__indicator--active': i === currentIndex }]"
                @click="goTo(i)"
            ></span>
        </div>
    </div>
</template>

<script>
import { ref, watch, computed, onMounted, onBeforeUnmount, provide } from "vue";

export default {
    name: "EasySlider",
    props: {
        modelValue: { type: Number, default: 0 },
        width: { type: String, default: "auto" },
        height: { type: String, default: "300px" },
        animation: { type: String, default: "normal" },
        autoplay: { type: Boolean, default: true },
        interval: { type: Number, default: 3000 },
        speed: { type: Number, default: 500 },
        touch: { type: Boolean, default: true },
        indicators: { type: [String, Boolean], default: "center" },
        controlBtn: { type: Boolean, default: true },
    },
    emits: ["update:modelValue", "change", "next", "previous"],
    setup(props, { emit }) {
        const currentIndex = ref(props.modelValue);
        const itemCount = ref(0);
        const direction = ref("next");
        let timer = null;

        const transitionName = computed(() => {
            if (props.animation === "fade") return "easy-slider-fade";
            return direction.value === "next" ? "easy-slider-next" : "easy-slider-prev";
        });

        provide("sliderRegister", () => {
            itemCount.value++;
            return itemCount.value - 1;
        });
        provide("sliderUnregister", () => {
            itemCount.value--;
        });
        provide("sliderCurrentIndex", currentIndex);

        function startAutoplay() {
            if (props.autoplay && !timer) {
                timer = setInterval(() => {
                    next();
                }, props.interval);
            }
        }

        function stopAutoplay() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        function next() {
            direction.value = "next";
            const nextIndex = (currentIndex.value + 1) % itemCount.value;
            goTo(nextIndex);
            emit("next", { original: currentIndex.value, next: nextIndex });
        }

        function prev() {
            direction.value = "prev";
            const prevIndex = (currentIndex.value - 1 + itemCount.value) % itemCount.value;
            goTo(prevIndex);
            emit("previous", { original: currentIndex.value, next: prevIndex });
        }

        function goTo(index) {
            currentIndex.value = index;
            emit("update:modelValue", index);
            emit("change", index);
        }

        function onMouseEnter() {
            stopAutoplay();
        }

        function onMouseLeave() {
            startAutoplay();
        }

        watch(
            () => props.modelValue,
            (val) => {
                if (val !== currentIndex.value) {
                    direction.value = val > currentIndex.value ? "next" : "prev";
                    currentIndex.value = val;
                }
            }
        );

        onMounted(() => {
            startAutoplay();
        });

        onBeforeUnmount(() => {
            stopAutoplay();
        });

        return {
            currentIndex,
            itemCount,
            transitionName,
            next,
            prev,
            goTo,
            onMouseEnter,
            onMouseLeave,
        };
    },
};
</script>

<style>
.easy-slider {
    position: relative;
    overflow: hidden;
}
.easy-slider__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}
.easy-slider__slide {
    width: 100%;
    height: 100%;
}
.easy-slider__btns {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
.easy-slider__btns .slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: auto;
    background: none;
    border: none;
    cursor: pointer;
    padding: 20px;
    outline: none;
}
.easy-slider__btns .slider-btn-left {
    left: 0;
}
.easy-slider__btns .slider-btn-right {
    right: 0;
}
.easy-slider__indicators {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 6px;
}
.easy-slider__indicators--left {
    justify-content: flex-start;
    padding-left: 10px;
}
.easy-slider__indicators--right {
    justify-content: flex-end;
    padding-right: 10px;
}
.easy-slider__indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: background 0.3s;
}
.easy-slider__indicator--active {
    background: #fff;
}
.easy-slider-fade-enter-active,
.easy-slider-fade-leave-active {
    transition: opacity 0.5s ease;
}
.easy-slider-fade-enter-from,
.easy-slider-fade-leave-to {
    opacity: 0;
}
.easy-slider-next-enter-active,
.easy-slider-next-leave-active,
.easy-slider-prev-enter-active,
.easy-slider-prev-leave-active {
    transition: all 0.5s ease;
}
.easy-slider-next-enter-from {
    transform: translateX(100%);
}
.easy-slider-next-leave-to {
    transform: translateX(-100%);
}
.easy-slider-prev-enter-from {
    transform: translateX(-100%);
}
.easy-slider-prev-leave-to {
    transform: translateX(100%);
}
</style>
