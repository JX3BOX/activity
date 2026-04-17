import { createRouter, createWebHashHistory } from "vue-router";

const Index = () => import("./Index.vue");
const Cangjian = () => import("./cangjian/index.vue");



const routes = [
    { name: "index", path: "/", component: Index },
    { name: "cangjian", path: "/cangjian", component: Cangjian }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
