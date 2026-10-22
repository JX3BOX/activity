<script setup>
import { computed, shallowRef, watch, onBeforeUnmount } from "vue";
import { useMediaQuery } from "@vueuse/core";
import MobileChapterHeading from "./MobileChapterHeading.vue";
import MobilePager from "./MobilePager.vue";
import { asset } from "../assets";
import { useSectionMotion } from "../composables/useSectionMotion";
const { section, visible } = useSectionMotion();
const maps = ["过云岭", "云州", "渝州", "陕州"];
const introductions = [
    [
        "为营救一众工匠，侠士身陷重围，遭遇重创。",
        "平生憾事历历，多少故人旧事，终究无力回天。幸此一战，终究是护住了想保护的人。",
        "漫道征途多怅惘，亦多风雨摧人肠。",
        "是隐于尘嚣，泯然众生；还是束装提剑，奔赴前路？",
    ],
    [
        "若失去仰仗的一身武艺，回归平凡，你又当以何等身份，应答乱世抛来的话问？",
        "倘若庙堂趋利妥协，那么护国安民的重任便将落于百姓自身。",
        "匹夫虽微，亦可撼动河川山岳，力量并非源自朝堂，而是来自守护万千黎民的坚定信念。",
    ],
    [
        "以杀淬锋，以命炼刃。",
        "昔日唐门“刺客之王计划”所训练出的至强杀器集结此地，意外之人自暗处现身。枭雄筹谋多年，终将在此迎来结局！",
        "明明还在街边，怎么一转身就上了屋顶？",
        "以为脚下是平地，转身已在楼阁之上；登临屋字之巅，推门又见街巷通衢。",
        "搓搓麻将，涮涮火锅，到了渝州，就是要起！",
        "这可不得来盏特色坝坝茶，打听下最近的江湖八卦！",
    ],
    [
        "叛军挥师西进，陕州乃潼关门户！长安发发可危！守住，守住，熬过漫漫长夜，终至破晓黎明！",
        "捐躯赴国难，视死忽如归！是你，是我，是前往驰援的每一个人！古来青史谁不见，今见功名胜古人。苍生铸就史诗，尽为血肉所书！",
        "黄河之水滔滔而来，至三门峡骤然收束，激流翻涌，险滩暗伏。舟行其间，险象环生，汹涌水势阻断通路，尽显山河雄浑之势。",
        "行至陕州，影戏流转，梨园故曲铿锵，苍凉与憾恨融入弦歌中，与乱世的悲欢往事交织。",
        "高元的唱腔将《秦王破阵乐》的铿锵雄烈，娓妮铺展，余韵回荡城间。",
    ],
];
const isMobile = useMediaQuery("(max-width: 767px)");
const mobileMap = shallowRef(0);
const selected = shallowRef(-1);
const activeMap = computed(() => isMobile.value ? mobileMap.value : selected.value);
const scenes = shallowRef([1, 1, 1, 1]);
const background = computed(() => ({ backgroundImage: `url(${asset(`bg/bg3-${activeMap.value + 2}.jpg`)})` }));
let timer;
let slot = 0;
let round = 1;
function tick() {
    if (isMobile.value) {
        const next = [...scenes.value];
        next[mobileMap.value] = next[mobileMap.value] % 3 + 1;
        scenes.value = next;
        timer = setTimeout(tick, 3000);
        return;
    }
    if (slot === 0) round = round % 3 + 1;
    if (selected.value !== slot) {
        const next = [...scenes.value];
        next[slot] = round;
        scenes.value = next;
    }
    slot = (slot + 1) % maps.length;
    // Four replacements span .75s, followed by a 2s pause.
    timer = setTimeout(tick, slot === 0 ? 2000 : 250);
}
watch(visible, value => {
    clearTimeout(timer);
    if (value) timer = setTimeout(tick, 2000);
    else selected.value = -1;
});
onBeforeUnmount(() => clearTimeout(timer));
function select(index) { selected.value = index; }
function selectMobileMap(index) {
    mobileMap.value = index;
    clearTimeout(timer);
    if (visible.value) timer = setTimeout(tick, 3000);
}
function changeMobileMap(offset) { selectMobileMap((mobileMap.value + offset + maps.length) % maps.length); }
function release() {
    if (selected.value >= 0) {
        const next = [...scenes.value];
        next[selected.value] = round;
        scenes.value = next;
    }
    selected.value = -1;
}
</script>

<template>
    <section ref="section" id="maps" class="m-section m-maps" :style="background" aria-label="新地图上线">
        <MobileChapterHeading :index="1" />
        <div v-if="isMobile" class="u-mobile-map-view">
            <div class="u-mobile-map-tabs" aria-label="选择地图">
                <button v-for="(name, index) in maps" :key="name" :aria-label="name" :aria-pressed="mobileMap === index" @click="selectMobileMap(index)">
                    <img :src="asset(`tp0${index + 1}-4.png`)" :alt="name" loading="lazy" />
                </button>
            </div>
            <div class="u-mobile-map-photo">
                <img class="u-map-frame" :src="asset('tp.png')" alt="" />
                <img class="u-map-scene" :key="`${mobileMap}-${scenes[mobileMap]}`" :src="asset(`tp0${mobileMap + 1}-${scenes[mobileMap]}.png`)" :alt="`${maps[mobileMap]}风光`" loading="lazy" />
            </div>
        </div>
        <div v-else class="u-map-cards">
            <div v-for="(name, index) in maps" :key="name" class="u-map-card" :class="{ active: selected === index }" @mouseenter="select(index)" @mouseleave="release" @focusin="select(index)" @focusout="release">
                <button class="u-map-select" :aria-label="`探索${name}`" :aria-pressed="selected === index" @click="select(index)">
                    <img class="u-map-frame" :src="asset('tp.png')" alt="" />
                    <img :key="`${index}-${scenes[index]}`" class="u-map-scene" :src="asset(`tp0${index + 1}-${scenes[index]}.png`)" :alt="`${name}风光`" loading="lazy" />
                    <img class="u-map-name" :src="asset(`tp0${index + 1}-4.png`)" :alt="name" loading="lazy" />
                </button>

            </div>
        </div>
        <!-- All four panels share a grid cell, reserving the tallest copy at every viewport width. -->
        <div class="u-map-intro" :class="{ 'has-selection': activeMap >= 0 }">
            <div v-for="(lines, index) in introductions" :key="maps[index]" class="u-map-description"
                :class="{ 'is-active': activeMap === index }" :aria-hidden="activeMap !== index">
                <p v-for="(line, lineIndex) in lines" :key="lineIndex">{{ line }}</p>
            </div>
        </div>
        <MobilePager @previous="changeMobileMap(-1)" @next="changeMobileMap(1)" />
    </section>
</template>

<style scoped>
.m-maps { display: flex; flex-direction: column; align-items: center; justify-content: center; transition: background-image .4s; }
.u-map-cards { display: flex; width: 61%; gap: 2%; }
.u-map-card { width: 23.5%; position: relative; transition: transform .3s; }
.u-map-card.active { transform: translateY(-10px); }
.u-map-select { display: block; width: 100%; position: relative; padding: 0; border: 0; background: none; cursor: pointer; }
.u-map-frame { display: block; width: 100%; }
.u-map-scene { animation: cs-fade .25s ease-out; position: absolute; inset: 0; width: 100%; height: 100%; }
.u-map-name { position: absolute; width: 16.5%; right: 8%; top: 8%; }
.u-map-intro { display: grid; width: 61%; padding: 24px; margin: 24px 0 0; text-align: center; color: #dacbb7; font-size: 16px; font-weight: 400; line-height: 2.2; text-shadow: 0 2px 4px #000; }
.u-map-intro.has-selection { background: rgba(0, 0, 0, .5); }
.u-map-description { grid-area: 1 / 1; align-self: center; visibility: hidden; }
.u-map-description.is-active { visibility: visible; }
.u-map-description p { margin: 0; }
@media (max-width: 767px) {
    .m-maps { padding: 6vw 0 14vw; justify-content: flex-start; }
    .u-mobile-map-view { display: grid; grid-template-columns: 12vw 57vw; gap: 5vw; width: 80vw; margin: 0 auto; }
    .u-mobile-map-tabs { display: flex; flex-direction: column; gap: 1vw; }
    .u-mobile-map-tabs button { display: block; width: 12vw; height: 29.25vw; padding: 1vw; border: 0; border-radius: 2px; background: #080808; cursor: pointer; }
    .u-mobile-map-tabs button[aria-pressed='true'] { background: #fff2b9; }
    .u-mobile-map-tabs img { display: block; width: 100%; height: 100%; object-fit: fill; }
    .u-mobile-map-photo { position: relative; height: 120vw; }
    .u-mobile-map-photo .u-map-frame { height: 100%; }
    .u-map-intro { width: 96%; margin-top: 5vw; padding: 4vw; font-size: 2.65vw; line-height: 1.6; }
}
</style>
