<script setup>
import SectionTitle from "./SectionTitle.vue";
import EmptyState from "./EmptyState.vue";
defineProps({ items: { type: Array, default: () => [] } });
</script>
<template>
    <div class="dat-rewards">
        <section v-for="(item, index) in items" :key="item.id || index" class="dat-award-section"
            :class="{ 'dat-showcase': item.showcase }">
            <SectionTitle :title="item.title" :tone="item.color || 'cyan'" />
            <div v-html="item.desc"></div>
            <img v-if="item.img" :src="item.img" :alt="item.title" loading="lazy" :class="item.color === 'purple' ? 'dat-community' : 'dat-physical'" />
        </section>
        <EmptyState v-if="!items.length" />
    </div>
</template>
