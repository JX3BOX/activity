<script setup>
import { assetRoot, links } from "./config";
</script>
<template>
    <div class="dat-process">
        <div class="dat-documents">
            <a class="dat-frame" :href="links.guide" target="_blank" rel="noopener noreferrer"
                ><img :src="assetRoot + 'guide.svg'" alt="" />在线数据构建应用 · <em>使用指南</em></a
            >
            <a class="dat-frame" :href="links.specification" target="_blank" rel="noopener noreferrer"
                ><img :src="assetRoot + 'spec.svg'" alt="" />在线数据构建应用 · <em>使用规范</em></a
            >
        </div>
        <section class="dat-step">
            <h2>［ 1 ］报名阶段</h2>
            <p class="dat-date">2026年9月28日 —— 2026年11月2日</p>
            <p>玩家在剑网3数据大师赛活动期间新增或更新订阅号，且开启接受打赏，将自动视为报名成功。</p>
            <p>玩家在比赛期间进行数据制作，且数据范围限定为新副本和 PVP 数据，以及新版本内容相关。</p>
            <a class="dat-frame dat-entry" :href="links.entry" target="_blank" rel="noopener noreferrer"
                ><img :src="assetRoot + 'entry.svg'" alt="" />订阅与发布入口</a
            >
        </section>
        <section class="dat-step">
            <h2>［ 2 ］评选阶段</h2>
            <p class="dat-date">2026年9月28日 —— 2026年11月2日</p>
            <p>评审时间与活动时间相同，最终将在活动结束的2026年11月2日之后的10天内对活动数据结算并进行获奖公示。</p>
            <p>本次评审将采取 玩家投票 + 特邀评审人 的评分方式。</p>
            <p class="dat-scoring-intro">截止日后评审根据玩家提交的数据进行评选，评分维度包括：</p>
            <div class="dat-scoring">
                <article class="dat-frame">
                    <h3>① 玩家投票</h3>
                    <p>
                        ［魔盒认证用户评分］根据魔盒账号等级，每次投票时，1级记为1分，2级记为2分，3-4级记为4分，5级及以上记为8分；
                    </p>
                    <p>［数据下载量］数据下载量累计达到3000次及以上时获取最多100分，每30次下载记为1分。</p>
                    <p class="dat-note">*注：仅通过账号认证的账号可参与投票。</p>
                </article>
                <article class="dat-frame">
                    <h3>② 评审人评分</h3>
                    <p>由魔盒邀请资深剑网3玩家对数据进行评分，评分维度包含：</p>
                    <ul>
                        <li>数据合理性</li>
                        <li>数据更新勤奋程度</li>
                        <li>数据完成度</li>
                        <li>玩家欢迎程度</li>
                        <li>创新性</li>
                    </ul>
                    <p class="dat-note">*注：每项最多记 20 分。</p>
                </article>
            </div>
            <p class="dat-note">* 特殊奖项将主要由评审人作为唯一评定选项。</p>
        </section>
        <section class="dat-step">
            <h2>［ 3 ］结果公示</h2>
            <p class="dat-date">2026年11月2日</p>
            <p>在魔盒（jx3box）上公布最终的评选结果，同时优秀作品获得网站流量扶持与实物奖励；</p>
            <p>我们鼓励玩家踊跃参与，奖项除前3名的同时，还设置了特殊奖项，详情查看活动奖励页。</p>
        </section>
    </div>
</template>
