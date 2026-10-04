import { createRouter, createWebHashHistory } from "vue-router";

import { isEmbeddedApp, syncAppEnv } from "@/utils/env";

syncAppEnv();
const Index = isEmbeddedApp() ? () => import("./Index_App.vue") : () => import("./Index.vue");

export default createRouter({
    history: createWebHashHistory(),
    routes: [{ name: "index", path: "/", component: Index }],
});
