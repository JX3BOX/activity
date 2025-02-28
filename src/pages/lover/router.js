import Vue from "vue";
import VueRouter from "vue-router";

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
    { name: "index", path: "/", redirect: "/info" },
    { name: "info", path: "/info", component: Info },
    { name: "join", path: "/join", component: Join },
    { name: "vote", path: "/vote", component: Vote },
    { name: "live", path: "/live", component: Live },
    { name: "process", path: "/process", component: Process },
    { name: "activity", path: "/activity", component: Activity },
];

const router = new VueRouter({
    // mode: "history",
    base: "/lover",
    routes,
});

export default router;
