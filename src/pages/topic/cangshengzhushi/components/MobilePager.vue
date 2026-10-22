<script setup>
defineEmits(["previous", "next"]);
</script>

<template>
    <div class="u-mobile-pager" aria-label="切换内容">
        <button type="button" @click="$emit('previous')"><i aria-hidden="true"></i>上一个</button>
        <button type="button" @click="$emit('next')">下一个<i aria-hidden="true"></i></button>
    </div>
</template>

<style scoped>
.u-mobile-pager { display: none; }
@media (max-width: 767px) {
    .u-mobile-pager { display: flex; width: 84%; justify-content: space-between; margin: calc(8 * var(--u)) auto 0; }
    .u-mobile-pager button { display: flex; align-items: center; gap: calc(2 * var(--u)); padding: calc(3 * var(--u)) calc(4.5 * var(--u)); border: 1px solid #fff0ce; border-radius: 99px; background: rgba(0, 0, 0, .15); color: #fff0ce; font-size: calc(4.3 * var(--u)); line-height: 1.3; cursor: pointer; }
    .u-mobile-pager i { display: block; width: calc(3 * var(--u)); height: calc(3 * var(--u)); border-left: 2px solid currentColor; border-bottom: 2px solid currentColor; transform: rotate(45deg); }
    .u-mobile-pager button:last-child i { transform: rotate(225deg); }
}

/* App 内嵌模式（__env=app）：与移动端同款排版，不依赖屏幕断点 */
html.v-app .u-mobile-pager { display: flex; width: 84%; justify-content: space-between; margin: calc(8 * var(--u)) auto 0; }
html.v-app .u-mobile-pager button { display: flex; align-items: center; gap: calc(2 * var(--u)); padding: calc(3 * var(--u)) calc(4.5 * var(--u)); border: 1px solid #fff0ce; border-radius: 99px; background: rgba(0, 0, 0, .15); color: #fff0ce; font-size: calc(4.3 * var(--u)); line-height: 1.3; cursor: pointer; }
html.v-app .u-mobile-pager i { display: block; width: calc(3 * var(--u)); height: calc(3 * var(--u)); border-left: 2px solid currentColor; border-bottom: 2px solid currentColor; transform: rotate(45deg); }
html.v-app .u-mobile-pager button:last-child i { transform: rotate(225deg); }
</style>
