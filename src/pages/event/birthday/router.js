import { createRouter, createWebHashHistory } from "vue-router";

const Birthday5 = () => import("./birthday5.vue");


const routes = [
    { name: "index", path: "/", redirect: { name: "birthday5" } },
    { name: "birthday5", path: "/5", component: Birthday5 },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
