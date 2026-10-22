<script setup>
import { computed, shallowRef } from "vue";
import MobileChapterHeading from "./MobileChapterHeading.vue";
import { asset } from "../assets";

const dungeonIndex = shallowRef(0);
const bossIndex = shallowRef(0);
const dungeons = ["洛阳之战", "昊渊极", "东山马场", "玄元观", "大明津"];
const bosses = ["突利和顺", "田承嗣", "伊曼·寂夜 伊曼·逐焰", "阿史那承庆", "史朝义"];
const guideLinks = ["洛阳之战", "昊渊极", "南山马场", "玄元观", "大阳津"].map(name => `https://www.jx3box.com/fb/?fb_name=${encodeURIComponent(name)}`);
const guideLink = computed(() => guideLinks[dungeonIndex.value]);
const background = computed(() => ({ backgroundImage: `url(${asset(`bg/bg4-${dungeonIndex.value + 1}.jpg`)})` }));
function selectDungeon(index) { dungeonIndex.value = index; bossIndex.value = 0; }
function tabImage(index) {
    const start = index === 0 ? 1 : index * 2 + 1;
    return asset(`pve01-${start + (dungeonIndex.value === index ? 1 : 0)}.png`);
}
</script>

<template>
    <section id="dungeons" class="m-section m-dungeons" :style="background" aria-label="PVE新秘境">
        <div class="u-mobile-dungeons">
            <MobileChapterHeading :index="2" />
            <p class="u-mobile-dungeon-hint">&gt; 点击卡片可查看秘境攻略 &lt;</p>
            <div class="u-mobile-dungeon-list">
                <a v-for="(name, index) in dungeons" :key="name" :href="guideLinks[index]" target="_blank" rel="noopener noreferrer"
                    @click="selectDungeon(index)">
                    <img :src="tabImage(index)" :alt="name" loading="lazy" />
                </a>
            </div>
        </div>
        <div class="u-dungeon-content">
            <div class="u-dungeon-tabs" role="tablist" aria-label="选择秘境">
                <button v-for="(name, index) in dungeons" :id="`dungeon-tab-${index}`" :key="name" role="tab"
                    :aria-selected="dungeonIndex === index" aria-controls="dungeon-panel" :class="{ first: index === 0 }"
                    @click="selectDungeon(index)" @keydown.right.prevent="selectDungeon((index + 1) % dungeons.length)"
                    @keydown.left.prevent="selectDungeon((index + dungeons.length - 1) % dungeons.length)">
                    <img :src="tabImage(index)" :alt="name" loading="lazy" />
                </button>
            </div>
            <div id="dungeon-panel" class="u-dungeon-panel" role="tabpanel" :aria-labelledby="`dungeon-tab-${dungeonIndex}`">
                <template v-if="dungeonIndex === 0">
                    <div class="u-boss-art"><img :src="asset(`pve02-${bossIndex + 1}.png`)" :alt="`${bosses[bossIndex]}首领介绍`" loading="lazy" /></div>
                    <div class="u-boss-picker" aria-label="选择秘境首领">
                        <button v-for="(name, index) in bosses" :key="name" :aria-label="name" :aria-pressed="bossIndex === index" @click="bossIndex = index">
                            <img :src="asset(`xtx${String(index + (bossIndex === index ? 6 : 1)).padStart(2, '0')}.png`)" :alt="name" loading="lazy" />
                        </button>
                    </div>
                </template>
                <img v-else class="u-dungeon-scene" :src="asset(`pve0${dungeonIndex + 2}.jpg`)" :alt="`${dungeons[dungeonIndex]}秘境场景`" loading="lazy" />
                <a class="u-guide" :href="guideLink" target="_blank" rel="noopener noreferrer"><img :src="asset('anniu.png')" alt="查看攻略" /></a>
            </div>
        </div>
    </section>
</template>

<style scoped>
.u-mobile-dungeons { display: none; }
.m-dungeons { display: flex; justify-content: center; align-items: flex-start; padding-top: calc(5 * var(--u)); padding-bottom: calc(5 * var(--u)); }
.u-dungeon-content { width: 60.26%; }
.u-dungeon-tabs { display: grid; grid-template-columns: 2.07fr 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 8px; margin-bottom: 0; }
.u-dungeon-tabs button { background: none; border: 1px solid transparent; padding: 0; cursor: pointer; min-width: 0; }
.u-dungeon-tabs button[aria-selected='true'] { border-color: #ead2a0; box-shadow: 0 0 12px #d6b46a55; }
.u-dungeon-tabs .first { grid-row: span 2; }
.u-dungeon-tabs img { display: block; width: 100%; height: 100%; object-fit: fill; }
/* The boss PNG includes headroom above its visible frame. Give scenes the same headroom. */
.u-dungeon-panel { position: relative; margin-top: 14px; }
.u-dungeon-scene { padding-top: 4.08%; }
.u-boss-art img, .u-dungeon-scene { display: block; width: 100%; }
.u-boss-picker { position: absolute; width: 41%; right: 6%; bottom: 20%; display: flex; gap: 7px; }
.u-boss-picker button { width: 20%; padding: 0; background: none; border: 0; cursor: pointer; }
.u-boss-picker img { display: block; width: 100%; }
.u-guide { cursor: pointer; position: absolute; width: 19%; right: 5%; bottom: 7%; }
.u-guide img { width: 100%; display: block; }
.u-guide:hover img { content: url('https://cdn.jx3box.com/design/topic/cangshengzhushi/anniu01.png'); }
@media (max-width: 767px) {
    .m-dungeons { display: block; padding: calc(7 * var(--u)) 0 calc(10 * var(--u)); background-image: url('https://cdn.jx3box.com/design/topic/cangshengzhushi/bg/bg4-1.jpg') !important; }
    .u-dungeon-content { display: none; }
    .u-mobile-dungeons { display: block; }
    .u-mobile-dungeon-hint { margin: calc(-1 * 4 * var(--u)) 0 calc(6 * var(--u)); text-align: center; color: #aaa; font-size: calc(3.2 * var(--u)); }
    .u-mobile-dungeon-list { display: flex; flex-direction: column; gap: calc(4 * var(--u)); width: 91%; margin: 0 auto; }
    .u-mobile-dungeon-list a { display: block; border: 2px solid #f6e4b4; cursor: pointer; }
    .u-mobile-dungeon-list img { display: block; width: 100%; height: calc(33 * var(--u)); object-fit: fill; }
}

/* App 内嵌模式（__env=app）：与移动端同款排版，不依赖屏幕断点 */
html.v-app .m-dungeons { display: block; padding: calc(7 * var(--u)) 0 calc(10 * var(--u)); background-image: url('https://cdn.jx3box.com/design/topic/cangshengzhushi/bg/bg4-1.jpg') !important; }
html.v-app .u-dungeon-content { display: none; }
html.v-app .u-mobile-dungeons { display: block; }
html.v-app .u-mobile-dungeon-hint { margin: calc(-1 * 4 * var(--u)) 0 calc(6 * var(--u)); text-align: center; color: #aaa; font-size: calc(3.2 * var(--u)); }
html.v-app .u-mobile-dungeon-list { display: flex; flex-direction: column; gap: calc(4 * var(--u)); width: 91%; margin: 0 auto; }
html.v-app .u-mobile-dungeon-list a { display: block; border: 2px solid #f6e4b4; cursor: pointer; }
html.v-app .u-mobile-dungeon-list img { display: block; width: 100%; height: calc(33 * var(--u)); object-fit: fill; }
</style>
