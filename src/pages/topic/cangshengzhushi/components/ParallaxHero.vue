<script setup>
import { shallowRef, onBeforeUnmount } from "vue";
import { asset, scrollToChapter } from "../assets";

const position = shallowRef(0);
const layers = [
    { image: "bg1-1.jpg", depth: 8 },
    { image: "bg1-2.png", depth: 18 },
    { image: "bg1-3.png", depth: 32 },
    { image: "bg1-4.png", depth: 42 },
    { image: "bg1-5.png", depth: 50 },
];
let frame = 0;
function move(event) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const next = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => { position.value = next; });
}
function reset() {
    cancelAnimationFrame(frame);
    position.value = 0;
}
onBeforeUnmount(() => cancelAnimationFrame(frame));
</script>

<template>
    <header id="top" class="m-hero" @pointermove="move" @pointerleave="reset">
        <div class="u-hero-layers" aria-hidden="true">
            <img v-for="layer in layers" :key="layer.image" :src="asset(`kv/${layer.image}`)" alt=""
                :style="{ transform: `translate3d(${position * layer.depth}px, 0, 0) scale(1.055)` }" />
        </div>
        <a class="u-brand" href="https://www.jx3box.com/" aria-label="返回剑网3魔盒"><img :src="asset('logo.png')" alt="剑网3 × JX3BOX 魔盒" /></a>
        <div class="u-hero-copy">
            <h1><img :src="asset('bt01.png')" alt="苍生铸世" /></h1>
            <img class="u-hero-caption" :src="asset('bt02.png')" alt="魔盒专题页" />
        </div>
        <a class="u-scroll" href="#journey" @click.prevent="scrollToChapter('journey')">下滑探索更多精彩<span>⌄</span></a>
    </header>
</template>

<style scoped>
.m-hero { height: 56.25vw; max-height: 1080px; min-height: 560px; position: relative; overflow: hidden; background: #665440; }
.u-hero-layers, .u-hero-layers img { position: absolute; inset: 0; width: 100%; height: 100%; }
.u-hero-layers img { object-fit: cover; transition: transform .65s cubic-bezier(.2,.65,.3,1); pointer-events: none; }
.u-brand { position: absolute; left: 4%; top: 4%; width: 5.5%; min-width: 65px; }
.u-brand img { width: 100%; }
.u-hero-copy { position: absolute; width: 45%; left: 12%; top: 27%; text-align: center; }
.u-hero-copy h1 { margin: 0; }
.u-hero-copy h1 img { width: 100%; }
.u-hero-caption { width: 82%; margin-top: -4%; }
.u-scroll { position: absolute; bottom: 7%; left: 50%; transform: translateX(-50%); color: #f4e6c8; font-size: 13px; letter-spacing: 2px; text-decoration: none; text-shadow: 0 1px 4px #24170d; }
.u-scroll span { display: block; text-align: center; font-size: 32px; line-height: 1.2; }
@media (max-width: 767px) {
    .m-hero { height: 145vw; min-height: 0; max-height: none; }
    .u-hero-layers img { object-position: 61% center; }
    .u-brand { width: 15%; min-width: 0; }
    .u-hero-copy { width: 84%; left: 4%; top: 25%; }
    .u-scroll { font-size: 10px; white-space: nowrap; bottom: 8%; }
}
@media (prefers-reduced-motion: reduce) { .u-hero-layers img { transform: none !important; transition: none; } }
</style>
