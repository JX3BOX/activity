<script setup>
import { computed, shallowRef } from "vue";
import { asset } from "../assets";

const maps = ["过云岭", "云州", "渝州", "陕州"];
const selected = shallowRef(-1);
const scene = shallowRef(1);
const background = computed(() => ({ backgroundImage: `url(${asset(`bg/bg3-${selected.value + 2}.jpg`)})` }));
function select(index) {
    if (selected.value !== index) scene.value = 1;
    selected.value = index;
}
function changeScene(offset) { scene.value = (scene.value - 1 + offset + 3) % 3 + 1; }
</script>

<template>
    <section id="maps" class="m-section m-maps" :style="background" aria-label="新地图上线">
        <div class="u-map-cards">
            <div v-for="(name, index) in maps" :key="name" class="u-map-card" :class="{ active: selected === index }" @mouseenter="select(index)">
                <button class="u-map-select" :aria-label="`探索${name}`" :aria-pressed="selected === index" @click="select(index)">
                    <img class="u-map-frame" :src="asset('tp.png')" alt="" />
                    <img class="u-map-scene" :src="asset(`tp0${index + 1}-${selected === index ? scene : 1}.png`)" :alt="`${name}风光`" loading="lazy" />
                    <img class="u-map-name" :src="asset(`tp0${index + 1}-4.png`)" :alt="name" loading="lazy" />
                </button>
                <div v-if="selected === index" class="u-map-controls">
                    <button :aria-label="`${name}上一张风光`" @click="changeScene(-1)">‹</button>
                    <span>{{ scene }} / 3</span>
                    <button :aria-label="`${name}下一张风光`" @click="changeScene(1)">›</button>
                </div>
            </div>
        </div>
        <p class="u-map-intro">过云岭、云州、渝州、陕州，全新地图上线。<br />踏遍山河，重访江湖，在苍生铸世的全新历程中探索更多风景。</p>
    </section>
</template>

<style scoped>
.m-maps { display: flex; flex-direction: column; align-items: center; justify-content: center; transition: background-image .4s; }
.u-map-cards { display: flex; width: 61%; gap: 2%; }
.u-map-card { width: 23.5%; position: relative; transition: transform .3s; }
.u-map-card.active { transform: translateY(-10px); }
.u-map-select { display: block; width: 100%; position: relative; padding: 0; border: 0; background: none; cursor: pointer; }
.u-map-frame { display: block; width: 100%; }
.u-map-scene { position: absolute; inset: 0; width: 100%; height: 100%; }
.u-map-name { position: absolute; width: 16.5%; right: 8%; top: 8%; }
.u-map-controls { position: absolute; bottom: 7%; left: 10%; width: 80%; display: flex; justify-content: space-between; align-items: center; color: #ffedb4; text-shadow: 0 1px 4px #000; }
.u-map-controls button { background: #21191199; color: #ffedb4; border: 1px solid #bd9d61; border-radius: 50%; width: 32px; height: 32px; font-size: 24px; line-height: 1; cursor: pointer; }
.u-map-intro { width: 57%; text-align: center; color: #dacbb7; line-height: 2.2; font-size: 14px; margin: 40px 0 0; text-shadow: 0 2px 4px #000; }
@media (max-width: 767px) {
    .m-maps { padding: 18vw 5vw; }
    .u-map-cards { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 18px 14px; }
    .u-map-card { width: 100%; }
    .u-map-card.active { transform: none; }
    .u-map-intro { width: 100%; font-size: 12px; margin-top: 24px; }
}
</style>
