<script setup>
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { isEmbeddedApp } from "@/utils/env";

const appMode = isEmbeddedApp();
postStat("topic", "cangshengzhushi");
</script>

<template>
    <div class="p-cangsheng">
        <router-view />
        <CommonFooter v-if="!appMode" />
    </div>
</template>

<style>
html { scroll-behavior: smooth; }
body { margin: 0; min-width: 0; background: #433327; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
</style>
