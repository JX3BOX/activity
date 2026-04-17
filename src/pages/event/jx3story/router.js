import { createRouter, createWebHashHistory } from "vue-router";
import { isMiniProgram, isApp } from "@jx3box/jx3box-common/js/utils";
const Mini = () => import("./new/Mini.vue");
const Index = () => import("./new/Index.vue");
const Detail = () => import("./new/Detail.vue");

const router = createRouter({
    routes: [
        {
            path: "/",
            name: "Index",
            component: isMiniProgram() || isApp() ? Mini : Index,
        },
        {
            path: "/detail",
            name: "Detail",
            meta: { key: "detail" },
            component: Detail,
        },
    ],
});

export default router;
