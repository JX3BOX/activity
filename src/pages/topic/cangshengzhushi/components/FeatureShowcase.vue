<script setup>
import { computed, shallowRef } from "vue";
import { asset } from "../assets";

const props = defineProps({ kind: { type: String, required: true } });
const selected = shallowRef(0);
const pvp = [
    { name: "阵营与帮会改革", cards: [
        ["阵营荣誉永久留痕", "全新帮会历史　阵营大事记"],
        ["帮会战功榜", "不再只以刷战阶多少来决定排名"],
        ["战阶改造", "称号属性改造　天罡属性离线"],
    ] },
    { name: "PVP玩法革新", cards: [
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
const current = computed(() => pvp[selected.value]);
const prefix = computed(() => `${props.kind}0${selected.value + 1}`);
function change(offset) { selected.value = (selected.value + offset + items.value.length) % items.value.length; }
</script>

<template>
    <section :id="kind" class="m-section m-showcase" :class="`m-${kind}`" :aria-label="kind === 'pvp' ? 'PVP新改革' : 'PVX新圈子'">
        <div class="u-showcase-content">
            <h2 class="u-feature-heading"><img :src="asset(`${prefix}-1.png`)" :alt="items[selected]" loading="lazy" /></h2>
            <div class="u-showcase-stage">
                <button class="u-feature-arrow previous" aria-label="上一项" @click="change(-1)">‹</button>
                <img class="u-feature-picture" :src="asset(`${prefix}-2.png`)" :alt="items[selected]" loading="lazy" />
                <button class="u-feature-arrow next" aria-label="下一项" @click="change(1)">›</button>
            </div>
            <div v-if="kind === 'pvp'" class="u-pvp-copy">
                <article v-for="card in current.cards" :key="card[0]" class="u-pvp-card"><h3>{{ card[0] }}</h3><p>{{ card[1] }}</p></article>
            </div>
            <img v-else class="u-pvx-caption" :src="asset(`${prefix}-3.png`)" :alt="items[selected]" loading="lazy" />
            <div class="u-feature-dots" :aria-label="kind === 'pvp' ? 'PVP玩法导航' : 'PVX玩法导航'">
                <button v-for="(item, index) in items" :key="item" :aria-label="item" :aria-current="selected === index ? 'true' : null" @click="selected = index"></button>
            </div>
        </div>
        <img v-if="kind === 'pvx'" class="u-bottom-logo" :src="asset('logo.png')" alt="剑网3 × JX3BOX 魔盒" loading="lazy" />
    </section>
</template>

<style scoped>
.m-showcase { position: relative; display: flex; align-items: center; justify-content: center; }
.m-pvp { background-image: url('https://cdn.jx3box.com/design/topic/cangshengzhushi/bg/bg5-1.jpg'); }
.m-pvx { min-height: 73.85vw; background-image: url('https://cdn.jx3box.com/design/topic/cangshengzhushi/bg/bg6-1.jpg'); }
.u-showcase-content { width: 60%; text-align: center; }
.m-pvp .u-showcase-content { width: 47.7%; }
.m-pvx .u-showcase-content { width: 55%; margin-top: -9%; }
.u-feature-heading { margin: 0 0 18px; }
.u-feature-heading img { width: 100%; display: block; }
.u-showcase-stage { position: relative; }
.u-feature-picture { display: block; width: 100%; }
.u-feature-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 42px; height: 65px; padding: 0; font-size: 48px; background: none; border: 0; color: #e6d4aa; cursor: pointer; text-shadow: 0 2px 5px #24180f; }
.previous { left: -60px; }.next { right: -60px; }
.u-pvp-copy { display: grid; grid-template-columns: repeat(3, 1fr); background: linear-gradient(110deg,#300600b0,#12183bb0); color: #f9eab4; }
.u-pvp-card { padding: 20px 12px; position: relative; }
.u-pvp-card + .u-pvp-card::before { content: ''; position: absolute; height: 65%; left: 0; top: 17%; width: 1px; background: #d0bf8d; }
.u-pvp-card h3 { font-family: 'Songti SC', serif; font-size: clamp(15px,1.45vw,28px); font-weight: 600; margin: 0 0 18px; }
.u-pvp-card p { font-size: clamp(12px,.95vw,18px); line-height: 2; margin: 0; }
.u-pvx-caption { display: block; width: 100%; }
.u-feature-dots { display: flex; justify-content: center; gap: 16px; margin-top: 28px; }
.u-feature-dots button { width: 11px; height: 11px; padding: 0; border-radius: 50%; background: #7a654b; border: 1px solid #c0aa79; cursor: pointer; }
.u-feature-dots button[aria-current] { background: #ffe7a2; box-shadow: 0 0 8px #ffde88; }
.u-bottom-logo { position: absolute; width: 6%; bottom: 7%; left: 47%; }
@media (max-width: 767px) {
    .m-showcase { padding: 18vw 8vw; }
    .u-showcase-content, .m-pvp .u-showcase-content, .m-pvx .u-showcase-content { width: 100%; margin-top: 0; }
    .u-feature-heading { margin-bottom: 14px; }
    .u-feature-heading img { width: 135%; max-width: none; margin-left: -17.5%; }
    .u-feature-arrow { width: 25px; height: 45px; font-size: 34px; }
    .previous { left: -28px; }.next { right: -28px; }
    .u-pvp-copy { grid-template-columns: 1fr; gap: 8px; background: none; margin-top: 10px; }
    .u-pvp-card { padding: 14px 8px; background: linear-gradient(100deg,#5c281ebf,#1a2049bf); border-top: 1px solid #a58c68; }
    .u-pvp-card + .u-pvp-card::before { display: none; }
    .u-pvp-card h3 { font-size: 19px; margin-bottom: 7px; }
    .u-pvp-card p { font-size: 12px; line-height: 1.8; }
    .u-feature-dots { gap: 13px; margin-top: 22px; }
    .u-feature-dots button { width: 13px; height: 13px; }
    .m-pvx { min-height: 145vw; padding-bottom: 35vw; }
    .u-bottom-logo { width: 18%; left: 41%; bottom: 6%; }
}
</style>
