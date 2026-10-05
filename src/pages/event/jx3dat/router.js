import { createRouter, createWebHashHistory } from "vue-router";

const Index = () => import("./Index.vue");
// const Index = () => import("./new/Index.vue");

const routes = [
    { name: "index", path: "/", alias: "/new", component: Index },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
