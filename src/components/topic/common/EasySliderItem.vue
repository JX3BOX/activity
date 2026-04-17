<template>
    <div class="easy-slider-item" v-show="isActive">
        <slot />
    </div>
</template>

<script>
import { inject, computed, onMounted, onBeforeUnmount, ref } from "vue";

export default {
    name: "EasySliderItem",
    setup() {
        const register = inject("sliderRegister", null);
        const unregister = inject("sliderUnregister", null);
        const currentIndex = inject("sliderCurrentIndex", ref(0));

        let index = -1;
        onMounted(() => {
            if (register) {
                index = register();
            }
        });
        onBeforeUnmount(() => {
            if (unregister) {
                unregister();
            }
        });

        const isActive = computed(() => index === currentIndex.value);

        return { isActive };
    },
};
</script>

<style>
.easy-slider-item {
    width: 100%;
    height: 100%;
}
</style>
