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
            <a v-for="(chapter, index) in chapters" :key="chapter" :href="`#${chapterIds[index]}`" :aria-current="active === index ? 'location' : null" @click.prevent="scrollToChapter(chapterIds[index])">
                <img :src="asset(`bt03-${index + 1}-${active === index ? 2 : 1}.png`)" :alt="chapter" />
            </a>
            <a class="u-back-top" href="#top" @click.prevent="scrollToChapter('top')">返回顶部 ↑</a>
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
.m-navigation { position: fixed; left: 1.5%; top: 50%; transform: translateY(-50%); width: 16%; z-index: 20; }
.m-navigation a { display: block; margin: 8px 0; }
.m-navigation img { width: 100%; display: block; }
.m-navigation .u-back-top { font-size: 12px; text-align: center; color: #d8c598; text-decoration: none; margin-top: 20px; text-shadow: 0 1px 5px #000; }
@media (min-width: 1921px) { .m-page { max-width: 2560px; margin: auto; } }
@media (max-width: 767px) { .m-navigation { display: none !important; } }
@media (prefers-reduced-motion: reduce) { .m-page *, .m-page *::before, .m-page *::after { transition: none !important; } }
</style>
