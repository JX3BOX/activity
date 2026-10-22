<script setup>
import { onMounted, onBeforeUnmount, shallowRef } from "vue";
import ParallaxHero from "./components/ParallaxHero.vue";
import NewJourney from "./components/NewJourney.vue";
import WorldMaps from "./components/WorldMaps.vue";
import DungeonSection from "./components/DungeonSection.vue";
import FeatureShowcase from "./components/FeatureShowcase.vue";
import { asset, chapters, chapterIds, scrollToChapter } from "./assets";

const active = shallowRef(-1);
let observer;
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
});
onBeforeUnmount(() => {
    observer?.disconnect();
    window.removeEventListener("resize", observeChapters);
});
</script>

<template>
    <main class="m-page">
        <ParallaxHero />
        <nav v-show="active >= 0" class="m-navigation" aria-label="专题章节">
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
.m-section { min-height: 56.25vw; background-size: cover; background-position: center; position: relative; }
.m-navigation {
    --navigation-width: min(16vw, 40vh);
    position: fixed;
    left: 1.5vw;
    top: 50%;
    transform: translateY(-50%);
    width: var(--navigation-width);
    padding: calc(var(--navigation-width) * .1875) 0;
    display: flex;
    flex-direction: column;
    gap: calc(var(--navigation-width) * .094);
    z-index: 20;
}
.m-navigation::before { content: ''; position: fixed; left: -1.5vw; top: 50%; transform: translateY(-50%); width: 22vw; height: 100vh; background: linear-gradient(to right, rgba(0, 0, 0, .5), transparent); pointer-events: none; z-index: -1; }
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
@keyframes cs-fadeInUp { from { opacity: 0; transform: translateY(35px); } to { opacity: 1; transform: translateY(0); } }
@keyframes cs-fadeInDown { from { opacity: 0; transform: translateY(-35px); } to { opacity: 1; transform: translateY(0); } }
@keyframes cs-fadeInLeftBig { from { opacity: 0; transform: translateX(-100vw); } to { opacity: 1; transform: translateX(0); } }
@keyframes cs-fadeInRightBig { from { opacity: 0; transform: translateX(100vw); } to { opacity: 1; transform: translateX(0); } }
@keyframes cs-fade { from { opacity: 0; } to { opacity: 1; } }
.m-page .cs-motion { opacity: 0; }
.m-page .is-visible .cs-motion { animation: var(--motion, cs-fadeInUp) .9s both; animation-delay: var(--delay, 0s); }
@media (prefers-reduced-motion: reduce) { .m-page .cs-motion { opacity: 1; animation: none !important; }
 .m-page *, .m-page *::before, .m-page *::after { transition: none !important; animation: none !important; } }
</style>
