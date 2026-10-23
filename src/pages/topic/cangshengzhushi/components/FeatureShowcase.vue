<script setup>
import { computed, shallowRef, watch, onBeforeUnmount } from "vue";
import { useSectionMotion } from "../composables/useSectionMotion";
import MobileChapterHeading from "./MobileChapterHeading.vue";
import MobilePager from "./MobilePager.vue";
import BrandLockup from "./BrandLockup.vue";
import { asset } from "../assets";

const { section, visible } = useSectionMotion();
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
const leaving = shallowRef(null);
let leaveSeq = 0;
let leaveTimer;
let timer;
function schedule() {
    clearTimeout(timer);
    if (visible.value) timer = setTimeout(() => select((selected.value + 1) % items.value.length), 5000);
}
function select(index) {
    if (props.kind === "pvx" && visible.value && index !== selected.value) {
        leaveSeq += 1;
        leaving.value = { id: leaveSeq, src: asset(`${prefix.value}-2.png`), alt: items.value[selected.value] };
        clearTimeout(leaveTimer);
        leaveTimer = setTimeout(() => (leaving.value = null), 1000);
    }
    selected.value = index;
    schedule();
}
function change(offset) { select((selected.value + offset + items.value.length) % items.value.length); }
watch(visible, schedule);
onBeforeUnmount(() => { clearTimeout(timer); clearTimeout(leaveTimer); });
</script>

<template>
    <section ref="section" :id="kind" class="m-section m-showcase" :class="[`m-${kind}`, { 'is-visible': visible }]" :aria-label="kind === 'pvp' ? 'PVP新改革' : 'PVX新圈子'">
        <div class="u-showcase-content">
            <MobileChapterHeading :index="kind === 'pvp' ? 3 : 4" />
            <h2 class="u-feature-heading cs-motion" :key="`${prefix}-heading`"><img :src="asset(`${prefix}-1.png`)" :alt="items[selected]" loading="lazy" /></h2>
            <div class="u-showcase-stage">
                <img class="u-feature-picture" :key="prefix" :src="asset(`${prefix}-2.png`)" :alt="items[selected]" loading="lazy" />
                <img v-if="leaving && kind === 'pvx'" class="u-feature-picture u-page-flip" :key="`leaving-${leaving.id}`" :src="leaving.src" :alt="leaving.alt" @animationend="leaving = null" />
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
.m-pvx { min-height: calc(73.85 * var(--u)); background-image: url('https://cdn.jx3box.com/design/topic/cangshengzhushi/bg/bg6-1.jpg'); }
.u-showcase-content { width: 60%; text-align: center; }
.m-pvp .u-showcase-content { width: 47.7%; }
.m-pvx .u-showcase-content { width: 55%; margin-top: -9%; }
.u-feature-heading { margin: 0 0 18px; }
.u-feature-heading img { width: 100%; display: block; }
.u-showcase-stage { position: relative; perspective: 3000px; height: 0; padding-bottom: 45.797%; }
.m-pvx .u-showcase-stage { padding-bottom: 53.788%; }
.u-showcase-stage .u-feature-picture { position: absolute; inset: 0; height: 100%; object-fit: contain; }
.u-feature-heading { height: calc(6 * var(--u)); }
.u-feature-heading img { height: 100%; object-fit: contain; }
.u-feature-caption { position: relative; height: calc(5 * var(--u)); }
.u-pvp-caption { height: calc(13.1 * var(--u)); }
.u-feature-caption img { display: block; width: 100%; height: 100%; object-fit: contain; }
/* 真实翻页：旧页绕左侧书脊整体旋转（0 → -180°），左边缘即旋转轴，位移为零；背页隐藏，转过 90° 后自然消失 */
.u-showcase-stage .u-page-flip { z-index: 2; pointer-events: none; transform-origin: left center; backface-visibility: hidden; animation: cs-page-flip .8s ease-in-out both; }
@keyframes cs-page-flip { from { transform: rotateY(0); filter: brightness(1); } to { transform: rotateY(-180deg); filter: brightness(.72); } }
.u-feature-picture { display: block; width: 100%; }
.u-feature-dots { display: flex; align-items: center; justify-content: space-between; width: 55%; margin: calc(2.5 * var(--u)) auto 0; color: #fff3a1; }
.m-pvx .u-feature-dots { width: 75%; }
.u-feature-dots button { position: relative; flex: 0 0 auto; width: calc(2.5 * var(--u)); height: calc(2.5 * var(--u)); min-width: 28px; min-height: 28px; padding: 0; border: 0; background: none; cursor: pointer; color: inherit; }
.u-feature-dot::before { content: ''; position: absolute; width: calc(.85 * var(--u)); height: calc(.85 * var(--u)); min-width: 7px; min-height: 7px; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 50%; background: currentColor; }
.u-feature-dot[aria-current]::after { content: ''; position: absolute; inset: 8%; border: 1px solid currentColor; border-radius: 50%; }
.u-feature-arrow::before { content: ''; position: absolute; width: calc(.9 * var(--u)); height: calc(1.8 * var(--u)); min-width: 8px; min-height: 16px; left: 50%; top: 50%; transform: translate(-50%, -50%); background: currentColor; clip-path: polygon(100% 0, 34% 50%, 100% 100%, 0 50%); }
.u-feature-arrow.next::before { transform: translate(-50%, -50%) rotate(180deg); }
.u-bottom-logo { position: absolute; width: 28%; height: auto; bottom: 7%; left: 50%; transform: translateX(-50%); }
@media (max-width: 767px) {
    .m-showcase { display: block; padding: calc(8 * var(--u)) 0 calc(14 * var(--u)); }
    .u-showcase-content, .m-pvp .u-showcase-content, .m-pvx .u-showcase-content { width: 100%; margin-top: 0; }
    .u-feature-heading { width: 96%; height: calc(14 * var(--u)); margin: 0 auto calc(4 * var(--u)); }
    .u-feature-heading img { width: 100%; height: 100%; }
    .u-showcase-stage { width: 96%; margin: 0 auto; padding-bottom: 43.965%; }
    .m-pvx .u-showcase-stage { padding-bottom: 51.637%; }
    .u-feature-caption { height: calc(18 * var(--u)); margin-top: calc(5 * var(--u)); }
    .u-pvp-caption, .u-feature-dots { display: none; }
    .u-mobile-pvp-copy { display: grid; width: 84%; margin: calc(4 * var(--u)) auto 0; }
    .u-mobile-pvp-panel { display: flex; flex-direction: column; gap: calc(3 * var(--u)); grid-area: 1 / 1; visibility: hidden; }
    .u-mobile-pvp-panel.is-active { visibility: visible; }
    .u-mobile-pvp-panel article { min-height: calc(18 * var(--u)); padding: calc(2.5 * var(--u)) calc(2 * var(--u)); border-top: 1px solid #f9e9b2; background: linear-gradient(110deg, #4f1d1cb3, #1b2147b3); color: #f9eab4; }
    .u-mobile-pvp-panel h3 { margin: 0 0 calc(1.5 * var(--u)); font-family: 'Songti SC', serif; font-size: calc(4.8 * var(--u)); font-weight: 600; line-height: 1.4; }
    .u-mobile-pvp-panel p { color: #FFF0CE; margin: 0; font-size: calc(3.1 * var(--u)); line-height: 1.7; }
    .m-pvx { min-height: calc(195 * var(--u)); padding-bottom: calc(62 * var(--u)); }
    .u-bottom-logo { width: 54%; bottom: calc(17 * var(--u)); }
    .u-bottom-leaves { display: block; pointer-events: none; }
    .u-bottom-leaves img { position: absolute; bottom: calc(-1 * 2 * var(--u)); width: calc(22 * var(--u)); }
    .u-bottom-leaves img:first-child { left: calc(-1 * 3 * var(--u)); transform: rotate(20deg); }
    .u-bottom-leaves img:nth-child(2) { right: calc(-1 * 4 * var(--u)); transform: rotate(-25deg); }
    .u-bottom-leaves img:last-child { width: calc(5 * var(--u)); left: 25%; bottom: calc(2 * var(--u)); }
}

/* App 内嵌模式（__env=app）：与移动端同款排版，不依赖屏幕断点 */
html.v-app .m-showcase { display: block; padding: calc(8 * var(--u)) 0 calc(14 * var(--u)); }
html.v-app .u-showcase-content, html.v-app .m-pvp .u-showcase-content, html.v-app .m-pvx .u-showcase-content { width: 100%; margin-top: 0; }
html.v-app .u-feature-heading { width: 96%; height: calc(14 * var(--u)); margin: 0 auto calc(4 * var(--u)); }
html.v-app .u-feature-heading img { width: 100%; height: 100%; }
html.v-app .u-showcase-stage { width: 96%; margin: 0 auto; padding-bottom: 43.965%; }
html.v-app .m-pvx .u-showcase-stage { padding-bottom: 51.637%; }
html.v-app .u-feature-caption { height: calc(18 * var(--u)); margin-top: calc(5 * var(--u)); }
html.v-app .u-pvp-caption, html.v-app .u-feature-dots { display: none; }
html.v-app .u-mobile-pvp-copy { display: grid; width: 84%; margin: calc(4 * var(--u)) auto 0; }
html.v-app .u-mobile-pvp-panel { display: flex; flex-direction: column; gap: calc(3 * var(--u)); grid-area: 1 / 1; visibility: hidden; }
html.v-app .u-mobile-pvp-panel.is-active { visibility: visible; }
html.v-app .u-mobile-pvp-panel article { min-height: calc(18 * var(--u)); padding: calc(2.5 * var(--u)) calc(2 * var(--u)); border-top: 1px solid #f9e9b2; background: linear-gradient(110deg, #4f1d1cb3, #1b2147b3); color: #f9eab4; }
html.v-app .u-mobile-pvp-panel h3 { margin: 0 0 calc(1.5 * var(--u)); font-family: 'Songti SC', serif; font-size: calc(4.8 * var(--u)); font-weight: 600; line-height: 1.4; }
html.v-app .u-mobile-pvp-panel p { color: #FFF0CE; margin: 0; font-size: calc(3.1 * var(--u)); line-height: 1.7; }
html.v-app .m-pvx { min-height: calc(195 * var(--u)); padding-bottom: calc(62 * var(--u)); }
html.v-app .u-bottom-logo { width: 54%; bottom: calc(17 * var(--u)); }
html.v-app .u-bottom-leaves { display: block; pointer-events: none; }
html.v-app .u-bottom-leaves img { position: absolute; bottom: calc(-1 * 2 * var(--u)); width: calc(22 * var(--u)); }
html.v-app .u-bottom-leaves img:first-child { left: calc(-1 * 3 * var(--u)); transform: rotate(20deg); }
html.v-app .u-bottom-leaves img:nth-child(2) { right: calc(-1 * 4 * var(--u)); transform: rotate(-25deg); }
html.v-app .u-bottom-leaves img:last-child { width: calc(5 * var(--u)); left: 25%; bottom: calc(2 * var(--u)); }
</style>
