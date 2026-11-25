<template>
    <!-- 魔盒七周年游乐园：打本梆梆锤 / 矿跑冲冲鸭 / 萌宠连连看 / 美人拼拼图 -->
    <div class="birthday7">
        <div class="backdrop" id="backdrop" aria-hidden="true"></div>
    <div class="stage" id="stage">
        <div class="page-bg"></div>
        <div class="title-art" aria-hidden="true">
            <img class="title-img active" data-title="1" :src="asset(`ui/title-game1.png`)" alt="" />
            <img class="title-img" data-title="2" :src="asset(`ui/title-game2.png`)" alt="" />
            <img class="title-img" data-title="3" :src="asset(`ui/title-game3.png`)" alt="" />
            <img class="title-img" data-title="4" :src="asset(`ui/title-game4.png`)" alt="" />
        </div>

        <header class="site-header">
            <button class="mobile-back-btn" id="mobileBackBtn" type="button" aria-label="返回">
                <svg class="back-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" /></svg>
            </button>
            <a class="brand" href="https://www.jx3box.com" aria-label="返回剑网3魔盒首页">
                <img class="brand-logo" :src="asset(`ui/logo.svg`)" alt="剑网3魔盒" />
            </a>
            <div class="event-title">
                <span class="event-line"></span><span class="event-star">✦</span><span>魔盒七周年庆主题乐园</span><span class="event-star">✦</span><span class="event-line"></span>
            </div>
            <div class="mobile-game-title" id="mobileGameTitle">打本梆梆锤</div>
            <button class="mobile-switch-btn" id="mobileSwitchBtn" type="button">切换游戏</button>
            <button class="close-btn" id="closeBtn" type="button" aria-label="关闭活动">×</button>
        </header>

        <div class="mobile-menu-backdrop" id="mobileMenuBackdrop"></div>
        <aside class="sidebar" aria-label="七周年游戏菜单">
            <nav class="side-menu">
                <button class="side-item active" data-game="1" type="button">
                    <span class="side-icon"><img :src="asset(`ui/icon-game1.svg`)" alt="" /></span>
                    <span class="side-copy">
                        <strong>打本梆梆锤</strong>
                        <small class="reward-line">
                            <span class="reward-claim" data-reward="1"><b role="button" tabindex="0">领取</b><span>7周年勋章</span></span>
                        </small>
                    </span>
                </button>
                <button class="side-item" data-game="2" type="button">
                    <span class="side-icon"><img :src="asset(`ui/icon-game2.svg`)" alt="" /></span>
                    <span class="side-copy">
                        <strong>矿跑冲冲鸭</strong>
                        <small class="reward-line">
                            <span class="reward-claim" data-reward="2"><b role="button" tabindex="0">领取</b><span>7周年称号</span></span>
                        </small>
                    </span>
                </button>
                <button class="side-item" data-game="3" type="button">
                    <span class="side-icon"><img :src="asset(`ui/icon-game3.svg`)" alt="" /></span>
                    <span class="side-copy">
                        <strong>萌宠连连看</strong>
                        <small class="reward-line">
                            <span class="reward-claim" data-reward="3"><b role="button" tabindex="0">领取</b><span>7周年头像框</span></span>
                        </small>
                    </span>
                </button>
                <button class="side-item" data-game="4" type="button">
                    <span class="side-icon"><img :src="asset(`ui/icon-game4.svg`)" alt="" /></span>
                    <span class="side-copy">
                        <strong>美人拼拼图</strong>
                        <small class="reward-line">
                            <span class="reward-claim" data-reward="4"><b role="button" tabindex="0">领取</b><span>7周年主题装扮</span></span>
                        </small>
                    </span>
                </button>
            </nav>
            <button class="claim-btn" id="claimBtn" type="button">
                <img :src="asset(`ui/get.svg`)" alt="一键领取" /><span class="claim-label">一键领取礼物</span>
            </button>
        </aside>

        <aside class="rule-card" aria-label="规则说明">
            <div class="rule-head"><span>✦</span>规则说明</div>
            <p id="ruleText"></p>
        </aside>

        <section class="live-card" id="liveCard" aria-label="七周年小游戏">
            <div class="game-stage" id="gameStage"></div>
            <footer class="game-footer">
                <div class="progress-wrap">
                    <div class="progress-meta"><span>本局进度</span><strong id="progressText">0/10</strong></div>
                    <div class="progress-track"><i class="progress-fill" id="progressFill"></i></div>
                </div>
                <div class="footer-actions" id="footerActions"></div>
            </footer>
        </section>

        <div class="toast" id="toast" role="status" aria-live="polite"></div>
        <div class="rules-overlay" id="rulesOverlay" aria-hidden="true">
            <div class="rules-card" role="dialog" aria-modal="true" aria-labelledby="rulesTitle">
                <span class="rules-kicker">HOW TO PLAY</span>
                <h2 id="rulesTitle">规则说明</h2>
                <p id="rulesBody"></p>
                <div class="rules-actions">
                    <button class="rules-start" id="rulesStart" type="button">开始游戏</button>
                    <button class="rules-never" id="rulesNever" type="button">不再提醒</button>
                </div>
            </div>
        </div>
        <div class="confetti-layer" id="confettiLayer" aria-hidden="true"></div>
        <div class="result-overlay" id="resultOverlay" aria-hidden="true">
            <div class="result-card" role="dialog" aria-modal="true" aria-labelledby="resultTitle">
                <span class="result-kicker" id="resultKicker">周年游乐园</span>
                <h2 id="resultTitle">完成</h2>
                <p id="resultDesc"></p>
                <div class="result-stats" id="resultStats"></div>
                <button class="result-btn" id="resultBtn" type="button">再玩一次</button>
            </div>
        </div>
        <div class="close-overlay" id="closeOverlay" aria-hidden="true">
            <div class="close-card" role="dialog" aria-modal="true" aria-labelledby="closeTitle">
                <span class="claim-kicker">LEAVE THE PARK?</span>
                <h2 id="closeTitle">返回魔盒首页？</h2>
                <p>是否直接领取所有奖励后返回魔盒首页？</p>
                <div class="close-actions">
                    <button class="close-cancel" id="closeCancel" type="button">先不返回</button>
                    <button class="close-confirm" id="closeConfirm" type="button">领取并返回</button>
                </div>
            </div>
        </div>
        <div class="claim-overlay" id="claimOverlay" aria-hidden="true">
            <div class="claim-card" role="dialog" aria-modal="true" aria-labelledby="claimTitle">
                <span class="claim-kicker">7TH ANNIVERSARY</span>
                <h2 id="claimTitle">奖励领取成功</h2>
                <p id="claimDesc"></p>
                <button class="claim-confirm" id="claimConfirm" type="button">收下啦~</button>
            </div>
        </div>
        <div class="mobile-note" id="mobileNote"><span>↻</span> 该设计为 1920 桌面版，建议横屏或使用电脑浏览</div>
        <div class="mobile-footer-logo" aria-hidden="true"><img :src="asset(`ui/logo.svg`)" alt="" /></div>
        </div>
        <canvas class="bg-particles" id="bgParticles" aria-hidden="true"></canvas>
    </div>
</template>

<script>
import { initGames, destroyGames } from "./birthday7/game.js";

const CDN = "https://cdn.jx3box.com/design/event/birthday/2026_7th/";

export default {
    name: "Birthday7",
    methods: {
        asset(src) {
            return CDN + src;
        },
    },
    mounted() {
        initGames();
    },
    beforeUnmount() {
        destroyGames();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/birthday/birthday7.less";
</style>
