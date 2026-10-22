<script setup>
import { asset } from "../assets";
</script>

<template>
    <section id="journey" class="m-section m-journey" aria-label="50级新世代">
        <img class="u-leaves" :src="asset('xdj02-3.png')" alt="" aria-hidden="true" loading="lazy" />
        <div class="u-journey-art">
            <img class="u-journey-picture" :src="asset('xdj01.png')" alt="全新江湖，50级新历程" loading="lazy" />
            <picture class="u-journey-title">
                <source media="(max-width: 767px)" :srcset="asset('xdj03-app.png')" />
                <img :src="asset('xdj03.png')" alt="50级新历程" loading="lazy" />
            </picture>
        </div>
        <div class="u-journey-copy">
            <p>新角色从 <strong>1</strong> 级开始，重构 <strong>1</strong> 至 <strong>50</strong> 级的历程</p>
            <small>（130级角色将以50级重新启程）</small>
        </div>
        <img class="u-leaf" :src="asset('xdj05.png')" alt="" aria-hidden="true" loading="lazy" />
    </section>
</template>

<style scoped>
.m-journey { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; background-image: url('https://cdn.jx3box.com/design/topic/cangshengzhushi/bg/bg2-1.jpg'); }
.u-journey-art { position: relative; width: 57%; padding-bottom: 8%; }
.u-journey-picture { display: block; width: 100%; }
.u-journey-title { position: absolute; left: -4%; bottom: 0; width: 108%; }
.u-journey-title img { width: 100%; }
.u-leaves { position: absolute; width: 36%; right: 0; top: -6%; pointer-events: none; }
.u-journey-copy { text-align: center; color: #f3dfb2; font-family: 'Noto Serif SC', 'Songti SC', serif; background: url('https://cdn.jx3box.com/design/topic/cangshengzhushi/xdj04.png') center/100% 100%; width: 60%; padding: 14px 0; margin-top: 15px; }
.u-journey-copy p { margin: 0; font-size: clamp(14px, 1.45vw, 28px); letter-spacing: 2px; }
.u-journey-copy strong { font-size: 1.5em; }
.u-journey-copy small { font-size: 12px; letter-spacing: 2px; }
.u-leaf { width: 9%; position: absolute; bottom: 6%; left: 10%; }
@media (max-width: 767px) {
    .m-journey { min-height: 145vw; padding: 20vw 0 12vw; }
    .u-journey-art { width: 90%; padding: 0; }
    .u-journey-picture { width: 130%; max-width: none; margin-left: 4%; }
    .u-journey-title { width: 29%; bottom: -10%; left: -1%; }
    .u-leaves { width: 65%; }
    .u-journey-copy { width: 94%; margin-top: 20vw; padding: 16px 4px; box-sizing: border-box; }
    .u-journey-copy p { font-size: 13px; letter-spacing: 0; }
    .u-journey-copy small { font-size: 10px; letter-spacing: 0; }
}
</style>
