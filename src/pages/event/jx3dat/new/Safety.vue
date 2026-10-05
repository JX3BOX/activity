<script setup>
import { assetRoot, links } from "./config";
</script>
<template>
    <section class="dat-safety">
        <img class="dat-safety-icon" :src="assetRoot + 'spec.svg'" alt="注意" />
        <p>活动过程中严格遵守剑网3与魔盒平台数据规范，确保活动的安全性。</p>
        <p>同时制定风险控制预案，包括但不限于数据安全、评选争议处理等，其中：</p>
        <div class="dat-warning">
            <img :src="assetRoot + 'spec.svg'" alt="注意" />
            <p>
                活动全程将严格遵守 <strong>剑网3玩家协议</strong> 与
                <a :href="links.specification" target="_blank" rel="noopener noreferrer">魔盒平台的数据规范</a
                >，<br />以确保活动的安全性与公正性。
            </p>
        </div>
        <p class="dat-disclaimer">*本次活动解释权归剑网3魔盒所有。</p>
    </section>
</template>
