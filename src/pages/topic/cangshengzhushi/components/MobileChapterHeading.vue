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
    .u-mobile-chapter-heading { display: block; width: 76vw; height: 16vw; margin: 0 auto 10vw; }
    .u-mobile-chapter-heading img { display: block; width: 100%; height: 100%; object-fit: contain; }
}
</style>
