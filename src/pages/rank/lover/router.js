import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store.js";

Vue.use(VueRouter);
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch((err) => err);
};

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

const routes = [
    { name: "list", path: "/list", component: List },
    {
        name: "index",
        path: "/",
        component: Lover,
        children: [
            { name: "info", path: "/:slug/info", component: Info },
            { name: "join", path: "/:slug/join", component: Join },
            { name: "vote", path: "/:slug/vote", component: Vote },
            { name: "live", path: "/:slug/live", component: Live },
            { name: "process", path: "/:slug/process", component: Process },
            { name: "arena", path: "/:slug/arena", component: Arena },
            { name: "activity", path: "/:slug/activity", component: Activity },
        ],
    },
    { name: "card", path: "/card/:slug?", component: Card },
    { name: "draw", path: "/draw/:slug?", component: Draw },
];

const router = new VueRouter({
    mode: "history",
    base: "/lover",
    routes,
});

router.beforeEach(async (to, from, next) => {
    // 如果没有slug参数直接跳转到默认slug的info页面
    await Promise.all([
        store.dispatch("loadDefaultEventId"),
        store.dispatch("loadEvents"),
        store.dispatch("loadLoverRelationNet"),
    ]);
    if (to.params.slug) {
        store.commit("SET_SLUG", to.params.slug);
        await Promise.all([store.dispatch("loadEvent"), store.dispatch("loadJoinRecord")]);
    }
    // 访问列表不需要slug
    if (to.name === "list") {
        return next();
    }
    if (!store.state.event) {
        // 如果slug对应的活动不存在，则跳转到默认活动
        const defaultSlug = store.getters.defaultEventSlug;
        if (defaultSlug) {
            if (["card", "draw"].includes(to.name)) {
                next({ name: to.name, params: { slug: defaultSlug } });
                return;
            }
            next({ name: "info", params: { slug: defaultSlug } });
            return;
        }
    }

    next();
});

export default router;
