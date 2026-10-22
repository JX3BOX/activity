<script setup>
import { asset, chapters } from "../assets";
defineProps({ index: { type: Number, required: true } });
</script>

<template>
    <h2 class="u-mobile-chapter-heading"><img :src="asset(`bt03-${index + 1}-2.png`)" :alt="chapters[index]" loading="lazy" /></h2>
</template>

<style scoped>
.u-mobile-chapter-heading { display: none; }
@media (max-width: 767px) {
    .u-mobile-chapter-heading { display: block; width: calc(76 * var(--u)); height: calc(16 * var(--u)); margin: 0 auto calc(10 * var(--u)); }
    .u-mobile-chapter-heading img { display: block; width: 100%; height: 100%; object-fit: contain; }
}

/* App 内嵌模式（__env=app）：与移动端同款排版，不依赖屏幕断点 */
html.v-app .u-mobile-chapter-heading { display: block; width: calc(76 * var(--u)); height: calc(16 * var(--u)); margin: 0 auto calc(10 * var(--u)); }
html.v-app .u-mobile-chapter-heading img { display: block; width: 100%; height: 100%; object-fit: contain; }
</style>
