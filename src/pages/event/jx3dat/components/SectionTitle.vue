<script setup>
defineProps({ title: { type: String, required: true }, tone: { type: String, default: "cyan" } });
</script>
<template>
    <div class="dat-section-title" :class="'tone-' + tone">
        <h2>{{ title }}</h2>
        <div class="dat-divider" aria-hidden="true">
            <span class="dat-divider-diamond"></span>
        </div>
    </div>
</template>
