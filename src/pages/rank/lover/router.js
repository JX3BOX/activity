import { createRouter, createWebHistory } from "vue-router";
import store from "./store.js";
import { isLoverV2Event } from "@/utils/lover-v2";

const Lover = () => import("./Lover.vue");
const Info = () => import("@/views/Lover/Info.vue");
const Join = () => import("@/views/Lover/Join.vue");
const Vote = () => import("@/views/Lover/Vote.vue");
const Live = () => import("@/views/Lover/Live.vue");
const Process = () => import("@/views/Lover/Process.vue");
const Arena = () => import("@/views/Lover/Arena.vue");
const Activity = () => import("@/views/Lover/Activity.vue");
const Card = () => import("@/views/Lover/Card.vue");
const Draw = () => import("@/views/Lover/Draw.vue");
const List = () => import("@/views/Lover/List.vue");
const V2Info = () => import("@/views/Lover/v2/Info.vue");
const V2Register = () => import("@/views/Lover/v2/Register.vue");
const V2MateHall = () => import("@/views/Lover/v2/MateHall.vue");
const V2Team = () => import("@/views/Lover/v2/Team.vue");
const V2SoloDraw = () => import("@/views/Lover/v2/SoloDraw.vue");
const V2Schedule = () => import("@/views/Lover/v2/Schedule.vue");
const V2Live = () => import("@/views/Lover/v2/Live.vue");
const V2Match = () => import("@/views/Lover/v2/Match.vue");
const V2Timeline = () => import("@/views/Lover/v2/Timeline.vue");
const V2Leaderboard = () => import("@/views/Lover/v2/Leaderboard.vue");
const V2Stories = () => import("@/views/Lover/v2/Stories.vue");

const routes = [
    { name: "list", path: "/", component: List },
    { name: "info", path: "/:slug/info", component: Info },
    { name: "join", path: "/:slug/join", component: Join },
    { name: "vote", path: "/:slug/vote", component: Vote },
    { name: "live", path: "/:slug/live", component: Live },
    { name: "process", path: "/:slug/process", component: Process },
    { name: "arena", path: "/:slug/arena", component: Arena },
    { name: "activity", path: "/:slug/activity", component: Activity },
    { name: "card", path: "/card/:slug?", component: Card },
    { name: "draw", path: "/draw/:slug?", component: Draw },
    { name: "v2-info", path: "/:slug/v2/info", component: V2Info, meta: { loverV2: true } },
    { name: "v2-register", path: "/:slug/v2/register", component: V2Register, meta: { loverV2: true } },
    { name: "v2-mate-hall", path: "/:slug/v2/mate-hall", component: V2MateHall, meta: { loverV2: true } },
    { name: "v2-team", path: "/:slug/v2/teams", component: V2Team, meta: { loverV2: true } },
    { name: "v2-solo-draw", path: "/:slug/v2/solo-draw", component: V2SoloDraw, meta: { loverV2: true } },
    { name: "v2-schedule", path: "/:slug/v2/schedule", component: V2Schedule, meta: { loverV2: true } },
    { name: "v2-live", path: "/:slug/v2/live", component: V2Live, meta: { loverV2: true } },
    {
        name: "v2-leaderboard",
        path: "/:slug/v2/leaderboards",
        component: V2Leaderboard,
        meta: { loverV2: true },
    },
    { name: "v2-stories", path: "/:slug/v2/stories", component: V2Stories, meta: { loverV2: true } },
    {
        name: "v2-match",
        path: "/:slug/v2/matches/:matchId",
        component: V2Match,
        meta: { loverV2: true },
    },
    {
        name: "v2-timeline",
        path: "/:slug/v2/teams/:teamId/timeline",
        component: V2Timeline,
        meta: { loverV2: true },
    },
];

const router = createRouter({
    history: createWebHistory("/lover"),
    routes,
});

router.beforeEach(async (to, from) => {
    const isSameV2Event =
        to.meta.loverV2 &&
        from.meta.loverV2 &&
        to.params.slug === from.params.slug;
    if (isSameV2Event) {
        // 同一届赛事的页签切换不依赖重新取数；业务动作完成后由对应页面主动刷新权限快照。
        if (to.name === "v2-register") {
            store.dispatch("loadLoverRelationNet").catch((error) => {
                console.error("[lover-router.loadLoverRelationNet]", error);
            });
        }
        return true;
    }

    await Promise.all([store.dispatch("loadDefaultEventId"), store.dispatch("loadEvents")]);
    // 访问列表不需要 slug，也不预加载登录态资源。
    if (to.name === "list") return true;

    if (to.params.slug) {
        store.commit("SET_SLUG", to.params.slug);
    }

    const currentEvent = store.getters.currentEvent;
    if (!currentEvent) {
        const defaultSlug = store.getters.defaultEventSlug;
        if (!defaultSlug) return true;
        if (["card", "draw"].includes(to.name)) return { name: to.name, params: { slug: defaultSlug } };
        return { name: "info", params: { slug: defaultSlug } };
    }

    if (isLoverV2Event(currentEvent)) {
        if (!to.meta.loverV2) return { name: "v2-info", params: { slug: currentEvent.slug } };
        await store.dispatch("loadV2Event");
        if (to.name === "v2-register") await store.dispatch("loadLoverRelationNet");
        // 首次进入时等待权限快照；V2 内部切页复用已有快照，避免导航被网络请求阻塞。
        await store.dispatch("loadV2Context").catch(() => null);
        return true;
    }

    if (to.meta.loverV2) return { name: "info", params: { slug: currentEvent.slug } };
    await Promise.all([
        store.dispatch("loadLoverRelationNet"),
        store.dispatch("loadEvent"),
        store.dispatch("loadJoinRecord"),
    ]);

    return true;
});

export default router;
