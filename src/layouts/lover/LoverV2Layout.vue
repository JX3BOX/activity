<template>
    <div class="p-lover-v2">
        <CommonHeader></CommonHeader>
        <header class="m-lover-v2-hero">
            <div class="m-lover-v2-hero__content wp">
                <div class="u-title-panel">
                    <h1 class="u-visually-hidden">情缘杯第二季</h1>
                    <p class="u-kicker">剑网 3 魔盒 · 情缘杯第二季</p>
                    <strong class="u-event-heading">以情缘之名，共赴五人赛场</strong>
                    <p class="u-desc">集结情缘、搭子与独狼侠士，组成五人战队，共赴这一程江湖之约。</p>
                    <div class="m-lover-v2-hero__meta">
                        <el-tag effect="dark">{{ phaseMap[event?.phase] || "赛事筹备中" }}</el-tag>
                        <span class="u-date"><small>报名截止</small>{{ formatDateTime(event?.registration_end_at) }}</span>
                        <span class="u-date"><small>阵容锁定</small>{{ formatDateTime(event?.team_lock_at) }}</span>
                    </div>
                </div>

                <div class="m-lover-v2-title-lockup" aria-hidden="true">
                    <img :src="titleImage" alt="" />
                    <span class="u-title-season">第二季</span>
                </div>
            </div>
            <nav class="m-lover-v2-nav" aria-label="情缘杯页面导航">
                <div class="wp m-lover-v2-nav__inner">
                    <router-link
                        v-for="item in menus"
                        :key="item.route"
                        class="u-nav-item"
                        :class="{ active: activeMenu === item.route }"
                        :to="{ name: item.route, params: { slug } }"
                    >
                        {{ item.label }}
                        <span v-if="item.route === 'v2-mate-hall' && invitationCount" class="u-count">
                            {{ invitationCount }}
                        </span>
                    </router-link>
                </div>
            </nav>
        </header>

        <main class="m-lover-v2-main wp">
            <section v-if="contextError" class="m-lover-v2-context-error m-lover-v2-panel">
                <div>
                    <strong>个人参赛状态暂时没有加载成功</strong>
                    <span>公开内容仍可正常浏览；报名、邀请与控制台按钮会在状态恢复后显示。</span>
                </div>
                <el-button type="primary" plain :loading="contextLoading" @click="retryContext">重新加载</el-button>
            </section>
            <slot></slot>
        </main>
        <CommonFooter></CommonFooter>
    </div>
</template>

<script>
import { formatDateTime, phaseMap } from "@/utils/lover-v2";
import fallbackHero from "@/assets/img/lover/v2/hero-v5.webp";
import titleImage from "@/assets/img/lover/v2/title.webp";

const cssUrl = (value) => `url(${JSON.stringify(value)})`;

export default {
    name: "LoverV2Layout",
    data: function () {
        return {
            phaseMap,
            titleImage,
            menus: [
                { label: "活动首页", route: "v2-info" },
                { label: "报名参赛", route: "v2-register" },
                { label: "组队大厅", route: "v2-mate-hall" },
                { label: "我的战队", route: "v2-team" },
                { label: "赛事进程", route: "v2-schedule" },
                { label: "在线直播", route: "v2-live" },
            ],
        };
    },
    computed: {
        event() {
            return this.$store.state.v2_event;
        },
        slug() {
            return this.$store.state.slug;
        },
        activeMenu() {
            if (["v2-solo-draw", "v2-timeline"].includes(this.$route.name)) return "v2-team";
            if (this.$route.name === "v2-match") return "v2-schedule";
            return this.$route.name;
        },
        invitationCount() {
            return this.$store.state.v2_context?.incoming_invitation_count || 0;
        },
        contextError() {
            return this.$store.state.v2_context_error;
        },
        contextLoading() {
            return this.$store.state.v2_context_loading;
        },
    },
    methods: {
        formatDateTime,
        async retryContext() {
            await this.$store.dispatch("loadV2Context", { force: true }).catch(() => null);
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/lover/v2.less";
</style>
