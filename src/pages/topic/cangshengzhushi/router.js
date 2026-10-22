import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
    history: createWebHashHistory(),
    routes: [{ name: "index", path: "/", component: () => import("./Index.vue") }],
});
