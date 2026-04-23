<template>
    <transition :name="transitionName">
        <div
            class="easy-slider-item slider-item"
            v-bind="$attrs"
            v-show="display"
            :style="{ zIndex, transition: `all ${speed / 1000}s` }"
        >
            <slot />
        </div>
    </transition>
</template>

<script>
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from "vue";

export default {
    name: "EasySliderItem",
    inheritAttrs: false,
    setup() {
        const register = inject("easySliderRegister", null);
        const options = inject(
            "easySliderOptions",
            computed(() => ({
                animation: "normal",
                speed: 500,
            }))
        );

        const display = ref(false);
        const isInit = ref(false);
        const initAnimation = ref(false);
        const direction = ref(false);
        const animation = ref(options.value.animation || "normal");
        const speed = ref(options.value.speed || 500);
        const zIndex = ref(99);
        let unregister = null;

        const transitionName = computed(() => {
            if (initAnimation.value) return "";
            return `${animation.value}-${direction.value ? "left" : "right"}`;
        });

        function init() {
            if (isInit.value) return;

            isInit.value = true;
            display.value = true;
            initAnimation.value = true;
            requestAnimationFrame(() => {
                initAnimation.value = false;
            });
        }

        function show(nextDirection) {
            zIndex.value = 99;
            direction.value = nextDirection;
            requestAnimationFrame(() => {
                display.value = true;
            });
        }

        function hide(nextDirection) {
            zIndex.value = 98;
            direction.value = nextDirection;
            requestAnimationFrame(() => {
                display.value = false;
            });
        }

        onMounted(() => {
            if (!register) return;

            unregister = register({
                init,
                show,
                hide,
            });
        });

        watch(
            options,
            (val) => {
                animation.value = val.animation || "normal";
                speed.value = val.speed || 500;
            },
            { immediate: true }
        );

        onBeforeUnmount(() => {
            if (unregister) {
                unregister();
                unregister = null;
            }
        });

        return {
            display,
            zIndex,
            speed,
            transitionName,
        };
    },
};
</script>

<style>
.easy-slider-item,
.slider-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.normal-left-enter-active,
.normal-right-enter-active,
.fade-left-enter-active,
.fade-right-enter-active {
    z-index: 99 !important;
}
.normal-left-leave-active,
.normal-right-leave-active,
.fade-left-leave-active,
.fade-right-leave-active {
    z-index: 98 !important;
}
.normal-left-leave-to,
.normal-right-enter-from {
    transform: translateX(-100%);
}
.normal-left-enter-from,
.normal-right-leave-to {
    transform: translateX(100%);
}
.normal-left-enter-to,
.normal-left-leave-from,
.normal-right-enter-to,
.normal-right-leave-from {
    transform: translateX(0);
}
.fade-left-enter-from,
.fade-left-leave-to,
.fade-right-enter-from,
.fade-right-leave-to {
    opacity: 0;
}
.fade-left-enter-to,
.fade-left-leave-from,
.fade-right-enter-to,
.fade-right-leave-from {
    opacity: 1;
    transform: translateX(0);
}
.fade-left-leave-to,
.fade-right-enter-from {
    transform: translateX(-10px);
}
.fade-left-enter-from,
.fade-right-leave-to {
    transform: translateX(10px);
}
</style>
