<script setup>
import { useSectionMotion } from "../composables/useSectionMotion";
const { section, visible } = useSectionMotion();
import MobileChapterHeading from "./MobileChapterHeading.vue";
import { asset } from "../assets";
</script>

<template>
    <section ref="section" :class="{ 'is-visible': visible }" id="journey" class="m-section m-journey" aria-label="50级新世代">
        <MobileChapterHeading :index="0" />
        <img class="u-leaves cs-motion" style="--motion: cs-fadeInRightBig" :src="asset('xdj02-3.png')" alt="" aria-hidden="true" loading="lazy" />
        <div class="u-journey-art">
            <img class="u-photo-leaf leaf-left cs-motion" style="--delay: .4s" :src="asset('xdj02-1.png')" alt="" aria-hidden="true" />
            <img class="u-photo-leaf leaf-top cs-motion" style="--delay: .5s" :src="asset('xdj02-2.png')" alt="" aria-hidden="true" />
            <div class="u-journey-photo"><img class="u-journey-picture cs-motion" style="--motion: cs-fadeInLeftBig" :src="asset('xdj01.png')" alt="全新江湖，50级新历程" loading="lazy" /></div>
            <picture class="u-journey-title cs-motion" style="--delay: .5s">
                <source media="(max-width: 767px)" :srcset="asset('xdj03-app.png')" />
                <img :src="asset('xdj03.png')" alt="50级新历程" loading="lazy" />
            </picture>
        </div>
        <div class="u-journey-copy cs-motion" style="--motion: cs-fade; --delay: .7s">
            <p class="cs-motion" style="--motion: cs-fadeInDown; --delay: .7s"><span class="u-copy-start">新角色从<strong>1</strong>级开始<span class="u-copy-comma">，</span></span><span class="u-copy-end">重构<strong>1</strong>至<strong>50</strong>级的历程</span></p>
            <small class="cs-motion" style="--motion: cs-fadeInDown; --delay: .7s">（130级角色将从30级开启历程）</small>
        </div>
        <img class="u-leaf" :class="{ 'is-falling': visible }" :src="asset('xdj05.png')" alt="" aria-hidden="true" loading="lazy" />
    </section>
</template>

<style scoped>
.m-journey { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; background-image: url('https://cdn.jx3box.com/design/topic/cangshengzhushi/bg/bg2-1.jpg'); }
.u-journey-art { position: relative; width: 57%; padding-bottom: 8%; }
.u-photo-leaf { position: absolute; width: 23%; pointer-events: none; }
.leaf-left { left: -10%; bottom: 20%; }
.leaf-top { left: 48%; top: -13%; }
.u-journey-picture { position: relative; display: block; width: 100%; }
.u-journey-title { z-index: 1; position: absolute; left: -4%; bottom: 0; width: 108%; }
.u-journey-title img { width: 100%; }
.u-leaves { position: absolute; width: 36%; right: 0; top: 0; pointer-events: none; }
.u-journey-copy {
    width: 60%;
    margin-top: 15px;
    padding: 0 0 14px;
    text-align: center;
    color: #ffe6b8;
    font-family: "ALIMAMASHUHEITI", 'Microsoft YaHei', sans-serif;
    background: url('https://cdn.jx3box.com/design/topic/cangshengzhushi/xdj04.png') center/100% 100%;
}
.u-journey-copy p {
    margin: 0;
    font-size: clamp(16px, 1.875vw, 36px);
    font-weight: 700;
    letter-spacing: 4px;
    line-height: 2.7439;
}
.u-journey-copy strong { font-size: 2em; font-weight: 700; line-height: 1; }
.u-journey-copy small { display: block; font-size: clamp(12px, 1.25vw, 24px); font-weight: 400; line-height: 1.5; letter-spacing: 4px; }
.u-leaf { width: 5%; position: absolute; top: 10%; right: 15%; pointer-events: none; opacity: 0; }
.is-falling { animation: cs-leaf-fall 8s 1s ease-in-out both; }
@keyframes cs-leaf-fall { 0% { opacity: 0; transform: translate(0, 0) rotate(0); } 10% { opacity: 1; } 50% { transform: translate(-4vw, 15vw) rotate(110deg); } 100% { opacity: 0; transform: translate(-1vw, 34vw) rotate(240deg); } }
@media (max-width: 767px) {
    .m-journey { min-height: 165vw; padding: 10vw 0 0; justify-content: flex-start; isolation: isolate; overflow: hidden; background: #39281e; }
    .m-journey::before { content: ''; position: absolute; z-index: -1; width: 200vw; height: 100vw; left: 50%; top: 50%; transform: translate(-50%, -50%) rotate(90deg); background: url('https://cdn.jx3box.com/design/topic/cangshengzhushi/bg/bg2-1.jpg') center / cover; }
    .u-journey-art { width: 100%; height: 100vw; padding: 0; }
    .u-journey-photo { position: absolute; width: 190%; left: -32%; top: 0; transform: rotate(5deg); }
    .u-journey-picture { width: 100%; max-width: none; }
    .u-journey-title { width: 44%; top: -2%; bottom: auto; left: auto; right: 3%; }
    .u-leaves { width: 34%; top: 0; z-index: 2; }
    .leaf-left { width: 22%; left: 1%; bottom: -7%; }
    .leaf-top, .u-leaf { display: none; }
    .u-journey-copy { width: 100%; margin-top: 0; padding: 0; background: none; }
    .u-journey-copy p { border-top: 1px solid #c5a36b; border-bottom: 1px solid #c5a36b; padding: 4vw 0; font-size: 4.5vw; line-height: 1.55; letter-spacing: 4px; }
    .u-copy-start, .u-copy-end { display: block; }
    .u-copy-end { font-weight: 400; }
    .u-copy-comma { display: none; }
    .u-journey-copy strong { font-size: inherit; font-weight: inherit; }
    .u-journey-copy small { padding: 3vw 0 5vw; font-size: 3.1vw; letter-spacing: 3px; color: #aaa; background: linear-gradient(transparent, #202c37b3); }
}
</style>
