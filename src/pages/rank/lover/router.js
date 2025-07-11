import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store.js";

Vue.use(VueRouter);
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch((err) => err);
};

const Info = () => import("@/views/Lover/Info.vue");
const Join = () => import("@/views/Lover/Join.vue");
const Vote = () => import("@/views/Lover/Vote.vue");
const Live = () => import("@/views/Lover/Live.vue");
const Process = () => import("@/views/Lover/Process.vue");
const Activity = () => import("@/views/Lover/Activity.vue");

const routes = [
    {
        name: "index",
        path: "/",
        redirect: { name: "info" }, // 默认重定向到 info 页面
    },
    { name: "info", path: "/:slug/info", component: Info },
    { name: "join", path: "/:slug/join", component: Join },
    { name: "vote", path: "/:slug/vote", component: Vote },
    { name: "live", path: "/:slug/live", component: Live },
    { name: "process", path: "/:slug/process", component: Process },
    { name: "activity", path: "/:slug/activity", component: Activity },
];

const router = new VueRouter({
    mode: "history",
    base: "/lover",
    routes,
});

router.beforeEach(async (to, from, next) => {
    await Promise.all([
        store.dispatch("loadDefaultEventId"),
        store.dispatch("loadEvents"),
        store.dispatch("loadLoverRelationNet"),
    ]);
    await Promise.all([
        store.dispatch("loadEvent", to.params.slug),
        store.dispatch("loadJoinRecord", to.params.slug),
    ]);
    // 如果没有slug参数直接跳转到默认slug的info页面
    if (!to.params.slug) {
        const defaultSlug = store.getters.defaultEventSlug;
        if (defaultSlug) {
            next({ name: "info", params: { slug: defaultSlug } });
            return;
        }
    }
    next();
});

export default router;
