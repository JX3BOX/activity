import { createRouter, createWebHashHistory } from "vue-router";

const Index = () => import("./Index.vue");


const routes = [{ name: "index", path: "/", component: Index }];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
