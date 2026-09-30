import { createRouter, createWebHashHistory } from "vue-router";

const Index = () => import("./Index.vue");

export default createRouter({
    history: createWebHashHistory(),
    routes: [{ name: "index", path: "/", component: Index }],
});
