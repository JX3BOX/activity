import { createRouter, createWebHistory } from "vue-router";

const Nav = () => import("@/views/Superstar/Nav.vue");
const Introduce = () => import("@/views/Superstar/Introduce2.vue");
const Join = () => import("@/views/Superstar/Join2.vue");
const List = () => import("@/views/Superstar/List2.vue");
const Dps = () => import("@/views/Superstar/Dps2.vue");
const Video = () => import("@/views/Superstar/Video2.vue");

const routes = [
    { name: "nav", path: "/", component: Nav },
    {
        name: "detail",
        path: "/:id",
        redirect: { name: "introduce" },
        component: () => import("@/layouts/rank/SuperstarLayout.vue"),
        children: [
            { name: "introduce", path: "/:id/introduce", component: Introduce },
            { name: "join", path: "/:id/join", component: Join },
            { name: "list", path: "/:id/list", component: List },
            { name: "dps", path: "/:id/dps", component: Dps },
            { name: "video", path: "/:id/video", component: Video },
        ],
    },
];

const router = createRouter({
    history: createWebHistory("/superstar"),
    routes,
});

export default router;
