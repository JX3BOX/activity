<script setup>
import EmptyState from "./EmptyState.vue";
defineProps({ items: { type: Array, default: () => [] } });
</script>
<template>
    <div>
        <div v-for="(item, index) in items" :key="item.id || index" v-html="item.desc"></div>
        <EmptyState v-if="!items.length" />
    </div>
</template>
