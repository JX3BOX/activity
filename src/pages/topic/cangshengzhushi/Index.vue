<script setup>
import { onMounted, onBeforeUnmount, shallowRef } from "vue";
import ParallaxHero from "./components/ParallaxHero.vue";
import NewJourney from "./components/NewJourney.vue";
import WorldMaps from "./components/WorldMaps.vue";
import DungeonSection from "./components/DungeonSection.vue";
import FeatureShowcase from "./components/FeatureShowcase.vue";
import { asset, chapters, chapterIds, scrollToChapter } from "./assets";

const active = shallowRef(-1);
const footerVisible = shallowRef(false);
let observer;
let footerObserver;
function observeChapters() {
    observer?.disconnect();
    const inset = Math.floor(window.innerHeight * 0.35);
    observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
            if (entry.isIntersecting) active.value = chapterIds.indexOf(entry.target.id);
        }
    }, { rootMargin: `-${inset}px 0px -${inset}px 0px`, threshold: 0 });
    document.querySelectorAll(".m-section, .m-hero").forEach(section => observer.observe(section));
}
onMounted(() => {
    observeChapters();
    window.addEventListener("resize", observeChapters);
    footerObserver?.disconnect();
    const footer = document.querySelector(".c-footer--v4");
    if (footer) {
        footerObserver = new IntersectionObserver(([entry]) => {
            footerVisible.value = entry.isIntersecting;
        }, { rootMargin: "0px 0px -10% 0px" });
        footerObserver.observe(footer);
    }
});
onBeforeUnmount(() => {
    observer?.disconnect();
    footerObserver?.disconnect();
    window.removeEventListener("resize", observeChapters);
});
</script>

<template>
    <main class="m-page">
        <ParallaxHero />
        <nav v-show="active >= 0" class="m-navigation" :class="{ 'is-hidden': footerVisible }" aria-label="专题章节">
            <span class="u-navigation-track" aria-hidden="true"></span>
            <a v-for="(chapter, index) in chapters" :key="chapter" :href="`#${chapterIds[index]}`" :aria-current="active === index ? 'location' : null" @click.prevent="scrollToChapter(chapterIds[index])">
                <img :src="asset(`bt03-${index + 1}-${active === index ? 2 : 1}.png`)" :alt="chapter" />
            </a>
        </nav>
        <NewJourney />
        <WorldMaps />
        <DungeonSection />
        <FeatureShowcase kind="pvp" />
        <FeatureShowcase kind="pvx" />
    </main>
</template>

<style>
.m-page { width: 100%; overflow: hidden; color: #f1ddb0; }
.m-page *, .m-page *::before, .m-page *::after { box-sizing: border-box; }
.m-page img { vertical-align: middle; }
.m-page button { font-family: inherit; touch-action: manipulation; }
.m-page button:focus-visible, .m-page a:focus-visible { outline: 2px solid #ffe3a0; outline-offset: 5px; }
.m-section { min-height: calc(56.25 * var(--u)); background-size: cover; background-position: center; position: relative; }
.m-navigation {
    --navigation-width: min(calc(16 * var(--u)), 40vh);
    position: fixed;
    /* 4K 限宽后跟随内容区左缘：内容左偏移 + 原始 1.5u 边距 */
    left: calc(max((100vw - 2560px) / 2, 0px) + 1.5 * var(--u));
    top: 50%;
    transform: translateY(-50%);
    width: var(--navigation-width);
    padding: calc(var(--navigation-width) * .1875) 0;
    display: flex;
    flex-direction: column;
    gap: calc(var(--navigation-width) * .094);
    z-index: 20;
}
.m-navigation { transition: opacity .3s ease; }
.m-navigation.is-hidden { opacity: 0; pointer-events: none; }
.m-navigation::before { content: ''; position: absolute; left: calc(-1 * 1.5 * var(--u)); top: 50%; transform: translateY(-50%); width: calc(22 * var(--u)); height: 100vh; background: linear-gradient(to right, rgba(0, 0, 0, .5), transparent); pointer-events: none; z-index: -1; }
/* Both navigation states use 717 × 175 artwork; the lotus center is x=108. */
.m-navigation .u-navigation-track {
    position: absolute;
    left: 15.06%;
    top: 0;
    bottom: 0;
    width: 1px;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, .45);
    pointer-events: none;
}
.m-navigation .u-navigation-track::before,
.m-navigation .u-navigation-track::after {
    content: '';
    position: absolute;
    left: 50%;
    width: calc(var(--navigation-width) * .02);
    height: calc(var(--navigation-width) * .02);
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: #a5a2a0;
}
.m-navigation .u-navigation-track::before { top: 0; }
.m-navigation .u-navigation-track::after { top: 100%; }
.m-navigation a { position: relative; display: block; margin: 0; opacity: .55; }
.m-navigation a[aria-current='location'] { opacity: 1; }
.m-navigation img { width: 100%; height: auto; aspect-ratio: 717 / 175; display: block; }
@media (min-width: 1921px) { .m-page { max-width: 2560px; margin: auto; } }
@media (max-width: 767px) { .m-navigation { display: none !important; } }

/* App 内嵌模式（__env=app）：与移动端同款排版，不依赖屏幕断点 */
html.v-app .m-navigation { display: none !important; }
@keyframes cs-fadeInUp { from { opacity: 0; transform: translateY(35px); } to { opacity: 1; transform: translateY(0); } }
@keyframes cs-fadeInDown { from { opacity: 0; transform: translateY(-35px); } to { opacity: 1; transform: translateY(0); } }
@keyframes cs-fadeInLeftBig { from { opacity: 0; transform: translateX(calc(-1 * 100 * var(--u))); } to { opacity: 1; transform: translateX(0); } }
@keyframes cs-fadeInRightBig { from { opacity: 0; transform: translateX(calc(100 * var(--u))); } to { opacity: 1; transform: translateX(0); } }
@keyframes cs-fade { from { opacity: 0; } to { opacity: 1; } }
.m-page .cs-motion { opacity: 0; }
.m-page .is-visible .cs-motion { animation: var(--motion, cs-fadeInUp) .9s both; animation-delay: var(--delay, 0s); }
@media (prefers-reduced-motion: reduce) { .m-page .cs-motion { opacity: 1; animation: none !important; }
 .m-page *, .m-page *::before, .m-page *::after { transition: none !important; animation: none !important; } }
</style>
