<script setup>
import { asset } from "../assets";
</script>

<template>
    <div class="u-brand-lockup" role="img" aria-label="剑网3 × JX3BOX 魔盒">
        <span class="u-game-logo" :style="{ backgroundImage: `url(${asset('logo.png')})` }"></span>
        <span class="u-brand-cross" aria-hidden="true">×</span>
        <span class="u-box-logo" :style="{ backgroundImage: `url(${asset('logo.png')})` }"></span>
    </div>
</template>

<style scoped>
.u-brand-lockup { display: grid; grid-template-columns: 1fr .25fr 1fr; align-items: center; }
.u-game-logo, .u-box-logo { display: block; background-size: 100% auto; background-repeat: no-repeat; }
.u-game-logo { aspect-ratio: 424 / 207; background-position: center top; }
.u-box-logo { aspect-ratio: 424 / 139; background-position: center bottom; }
.u-brand-cross { color: white; text-align: center; font-size: clamp(16px, calc(2.3 * var(--u)), 36px); font-weight: 300; line-height: 1; }
@media (max-width: 767px) { .u-brand-cross { font-size: calc(4 * var(--u)); } }

/* App 内嵌模式（__env=app）：与移动端同款排版，不依赖屏幕断点 */
html.v-app .u-brand-cross { font-size: calc(4 * var(--u)); }
</style>
