<script setup>
import { computed, shallowRef, watch, onBeforeUnmount } from "vue";
import { useSectionMotion } from "../composables/useSectionMotion";
const { section, visible } = useSectionMotion();
import MobileChapterHeading from "./MobileChapterHeading.vue";
import MobilePager from "./MobilePager.vue";
import BrandLockup from "./BrandLockup.vue";
import { asset } from "../assets";

const props = defineProps({ kind: { type: String, required: true } });
const selected = shallowRef(0);
const pvp = [
    { name: "阵营与帮会改革", cards: [
        ["阵营荣誉永久留痕", "全新帮会历史　阵营大事记"],
        ["帮会战功榜", "不再只以刷战阶多少来决定排名"],
        ["战阶改造", "称号属性改造　天赋属性路线"],
    ] },
    { name: "PVP玩法更新", cards: [
        ["阵营体系全面重构", "各种玩法串联为整体，每一场战局都会有连锁反应"],
        ["新等级改革", "名剑大会 / 战场升级；阵营拍卖系统回归"],
        ["周常减负", "取消橙戒周常；取消跨服三关"],
    ] },
    { name: "演武名剑大会", cards: [
        ["代币系统重构", "威名点封顶减负；名剑大会 / 战场体系升级"],
        ["新手教学", "1V1新手训练房，帮助萌新掌握基本PVP概念"],
        ["战后复盘与分析", "内置轻量分析工具，用于查看、复盘、分析战斗数据"],
    ] },
];
const pvx = ["新增功能·江湖笔记", "新增功能·个人主页", "新增功能·大唐社团", "生活技能重塑", "野外经营·玩法优化", "捏脸升级·以颜悦己"];
const items = computed(() => props.kind === "pvp" ? pvp.map(item => item.name) : pvx);
const prefix = computed(() => `${props.kind}0${selected.value + 1}`);
let timer;
function schedule() {
    clearTimeout(timer);
    if (visible.value) timer = setTimeout(() => select((selected.value + 1) % items.value.length), 5000);
}
function select(index) { selected.value = index; schedule(); }
function change(offset) { select((selected.value + offset + items.value.length) % items.value.length); }
watch(visible, schedule);
onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
    <section ref="section" :id="kind" class="m-section m-showcase" :class="[`m-${kind}`, { 'is-visible': visible }]" :aria-label="kind === 'pvp' ? 'PVP新改革' : 'PVX新圈子'">
        <div class="u-showcase-content">
            <MobileChapterHeading :index="kind === 'pvp' ? 3 : 4" />
            <h2 class="u-feature-heading cs-motion" :key="`${prefix}-heading`"><img :src="asset(`${prefix}-1.png`)" :alt="items[selected]" loading="lazy" /></h2>
            <div class="u-showcase-stage">
                <img class="u-feature-picture" :key="prefix" :class="{ 'u-page-turn': kind === 'pvx' && visible }" :src="asset(`${prefix}-2.png`)" :alt="items[selected]" loading="lazy" />
            </div>
            <div class="u-feature-caption" :class="`u-${kind}-caption`">
                <img class="cs-motion" :key="`${prefix}-caption`" style="--motion: cs-fadeInDown" :src="asset(`${prefix}-3.png`)" :alt="kind === 'pvp' ? pvp[selected].cards.map(card => card.join('：')).join('；') : items[selected]" loading="lazy" />
            </div>
            <div v-if="kind === 'pvp'" class="u-mobile-pvp-copy">
                <div v-for="(item, index) in pvp" :key="item.name" class="u-mobile-pvp-panel" :class="{ 'is-active': selected === index }" :aria-hidden="selected !== index">
                    <article v-for="card in item.cards" :key="card[0]"><h3>{{ card[0] }}</h3><p>{{ card[1] }}</p></article>
                </div>
            </div>
            <MobilePager @previous="change(-1)" @next="change(1)" />
            <div class="u-feature-dots" :aria-label="kind === 'pvp' ? 'PVP玩法导航' : 'PVX玩法导航'">
                <button class="u-feature-arrow previous" aria-label="上一项" @click="change(-1)"></button>
                <button class="u-feature-dot" v-for="(item, index) in items" :key="item" :aria-label="item" :aria-current="selected === index ? 'true' : null" @click="select(index)"></button>
                <button class="u-feature-arrow next" aria-label="下一项" @click="change(1)"></button>
            </div>
        </div>
        <BrandLockup v-if="kind === 'pvx'" class="u-bottom-logo" />
        <div v-if="kind === 'pvx'" class="u-bottom-leaves" aria-hidden="true">
            <img :src="asset('xdj02-1.png')" alt="" loading="lazy" />
            <img :src="asset('xdj02-2.png')" alt="" loading="lazy" />
            <img :src="asset('xdj05.png')" alt="" loading="lazy" />
        </div>
    </section>
</template>

<style scoped>
.u-mobile-pvp-copy, .u-bottom-leaves { display: none; }
.m-showcase { position: relative; display: flex; align-items: center; justify-content: center; }
.m-pvp { background-image: url('https://cdn.jx3box.com/design/topic/cangshengzhushi/bg/bg5-1.jpg'); }
.m-pvx { min-height: 73.85vw; background-image: url('https://cdn.jx3box.com/design/topic/cangshengzhushi/bg/bg6-1.jpg'); }
.u-showcase-content { width: 60%; text-align: center; }
.m-pvp .u-showcase-content { width: 47.7%; }
.m-pvx .u-showcase-content { width: 55%; margin-top: -9%; }
.u-feature-heading { margin: 0 0 18px; }
.u-feature-heading img { width: 100%; display: block; }
.u-showcase-stage { position: relative; perspective: 1200px; height: 0; padding-bottom: 45.797%; }
.m-pvx .u-showcase-stage { padding-bottom: 53.788%; }
.u-showcase-stage .u-feature-picture { position: absolute; inset: 0; height: 100%; object-fit: contain; }
.u-feature-heading { height: 6vw; }
.u-feature-heading img { height: 100%; object-fit: contain; }
.u-feature-caption { position: relative; height: 5vw; }
.u-pvp-caption { height: 13.1vw; }
.u-feature-caption img { display: block; width: 100%; height: 100%; object-fit: contain; }
.u-page-turn { transform-origin: left center; animation: cs-page-turn .65s ease-out both; }
@keyframes cs-page-turn { from { opacity: .3; transform: rotateY(-65deg); } to { opacity: 1; transform: rotateY(0); } }
.u-feature-picture { display: block; width: 100%; }
.u-feature-dots { display: flex; align-items: center; justify-content: space-between; width: 55%; margin: 2.5vw auto 0; color: #fff3a1; }
.m-pvx .u-feature-dots { width: 75%; }
.u-feature-dots button { position: relative; flex: 0 0 auto; width: 2.5vw; height: 2.5vw; min-width: 28px; min-height: 28px; padding: 0; border: 0; background: none; cursor: pointer; color: inherit; }
.u-feature-dot::before { content: ''; position: absolute; width: .85vw; height: .85vw; min-width: 7px; min-height: 7px; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 50%; background: currentColor; }
.u-feature-dot[aria-current]::after { content: ''; position: absolute; inset: 8%; border: 1px solid currentColor; border-radius: 50%; }
.u-feature-arrow::before { content: ''; position: absolute; width: .9vw; height: 1.8vw; min-width: 8px; min-height: 16px; left: 50%; top: 50%; transform: translate(-50%, -50%); background: currentColor; clip-path: polygon(100% 0, 34% 50%, 100% 100%, 0 50%); }
.u-feature-arrow.next::before { transform: translate(-50%, -50%) rotate(180deg); }
.u-bottom-logo { position: absolute; width: 28%; height: auto; bottom: 7%; left: 50%; transform: translateX(-50%); }
@media (max-width: 767px) {
    .m-showcase { display: block; padding: 8vw 0 14vw; }
    .u-showcase-content, .m-pvp .u-showcase-content, .m-pvx .u-showcase-content { width: 100%; margin-top: 0; }
    .u-feature-heading { width: 96%; height: 14vw; margin: 0 auto 4vw; }
    .u-feature-heading img { width: 100%; height: 100%; }
    .u-showcase-stage { width: 96%; margin: 0 auto; padding-bottom: 43.965%; }
    .m-pvx .u-showcase-stage { padding-bottom: 51.637%; }
    .u-feature-caption { height: 18vw; margin-top: 5vw; }
    .u-pvp-caption, .u-feature-dots { display: none; }
    .u-mobile-pvp-copy { display: grid; width: 84%; margin: 4vw auto 0; }
    .u-mobile-pvp-panel { display: flex; flex-direction: column; gap: 3vw; grid-area: 1 / 1; visibility: hidden; }
    .u-mobile-pvp-panel.is-active { visibility: visible; }
    .u-mobile-pvp-panel article { min-height: 18vw; padding: 2.5vw 2vw; border-top: 1px solid #f9e9b2; background: linear-gradient(110deg, #4f1d1cb3, #1b2147b3); color: #f9eab4; }
    .u-mobile-pvp-panel h3 { margin: 0 0 1.5vw; font-family: 'Songti SC', serif; font-size: 4.8vw; font-weight: 600; line-height: 1.4; }
    .u-mobile-pvp-panel p { margin: 0; font-size: 3.1vw; line-height: 1.7; }
    .m-pvx { min-height: 195vw; padding-bottom: 62vw; }
    .u-bottom-logo { width: 54%; bottom: 17vw; }
    .u-bottom-leaves { display: block; pointer-events: none; }
    .u-bottom-leaves img { position: absolute; bottom: -2vw; width: 22vw; }
    .u-bottom-leaves img:first-child { left: -3vw; transform: rotate(20deg); }
    .u-bottom-leaves img:nth-child(2) { right: -4vw; transform: rotate(-25deg); }
    .u-bottom-leaves img:last-child { width: 5vw; left: 25%; bottom: 2vw; }
}
</style>
