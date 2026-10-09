<script setup>
import { assetRoot } from "../topic";
import { computed } from "vue";
const props = defineProps({ title: { type: String, required: true }, tone: { type: String, default: "cyan" } });
const color = computed(() => ({ gold: "w", orange: "o", cyan: "q", purple: "q" }[props.tone] || "q"));
</script>
<template>
    <div class="dat-section-title" :class="'tone-' + tone">
        <h2>{{ title }}</h2>
        <div class="dat-divider" aria-hidden="true">
            <img :src="`${assetRoot}star-${color}-l.svg`" />
            <span class="dat-star">
                <img class="dat-star-core" :src="`${assetRoot}star-${color}-a.svg`" alt="" />
                <img class="dat-star-ring" :src="`${assetRoot}star-${color}-b.svg`" alt="" />
            </span>
            <img :src="`${assetRoot}star-${color}-l.svg`" />
        </div>
    </div>
</template>
