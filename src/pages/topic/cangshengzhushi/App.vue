<script setup>
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { isEmbeddedApp } from "@/utils/env";

const appMode = isEmbeddedApp();
postStat("topic", "cangshengzhushi");
</script>

<template>
    <div class="p-cangsheng">
        <CommonHeader :overlayEnable="true"></CommonHeader>
        <router-view />
        <CommonFooter v-if="!appMode" />
    </div>
</template>

<style>
html { scroll-behavior: smooth; }
body { margin: 0; min-width: 0; background: #433327; }
/* 专题基准单位：视口宽度的 1%，超过 2K（2560px）后封顶，保证 4K 下按 2K 等比渲染 */
.p-cangsheng { --u: min(1vw, 25.6px); }
/* App 内嵌模式（__env=app）：以 375 画板等比缩放（最大 2 倍即 750px），不依赖屏幕断点切换排版 */
html.v-app body { min-width: 0; margin: 0; }
html.v-app .m-page { --u: min(1vw, 7.5px); max-width: 750px; margin: 0 auto; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
</style>
