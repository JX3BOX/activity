<script setup>
import { __imgPath } from "@/utils/config";
</script>
<template>
    <div class="dat-empty-state">
        <img :src="`${__imgPath}image/rank/common/null.png`" alt="暂无数据" />
    </div>
</template>
<style scoped>
.dat-empty-state { position: relative; left: 50%; transform: translateX(-50%); width: min(1280px, 90vw); padding: 40px 0; text-align: center; }
.dat-empty-state img { display: block; width: 1280px; max-width: 100%; height: auto; margin: 0 auto; }
</style>
