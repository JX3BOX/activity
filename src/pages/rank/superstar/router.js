import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch((err) => err);
};

const Join = () => import("@/views/Superstar/Join.vue");
const Nav = () => import("@/views/Superstar/Nav.vue");
const Introduce = () => import("@/views/Superstar/Introduce.vue");
const SignUp = () => import("@/views/Superstar/SignUp.vue");
const List = () => import("@/views/Superstar/List.vue");
const Video = () => import("@/views/Superstar/Video.vue");
const Dps = () => import("@/views/Superstar/Dps_v2.vue");

const routes = [
    { name: "nav", path: "/", component: Nav },
    {
        name: "detail",
        path: "/:id",
        redirect: { name: "introduce" },
        component: () => import("@/layouts/rank/SuperstarLayout.vue"),
        children: [
            { name: "introduce", path: "/:id/introduce", component: Introduce },
            { name: "signup", path: "/:id/signup", redirect: { name: "join" } },
            { name: "list", path: "/:id/list", component: List },
            { name: "video", path: "/:id/video", component: Video },
            { name: "dps", path: "/:id/dps", component: Dps },
            { name: "join", path: "/:id/join", component: Join },
        ],
    },
];

const router = new VueRouter({
    // mode: "history",
    base: "/superstar",
    routes,
});

export default router;
