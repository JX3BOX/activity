import { createRouter, createWebHashHistory } from "vue-router";
import { isApp } from "@/utils/env";

const Index = () => import("./Index.vue");
const Index_App = () => import("./Index_App.vue");
const Detail = () => import("./Detail.vue");
const Info = () => import("./Detail_App.vue");
const Poem = () => import("./PoemDetail.vue");

const EmptyView = { render: () => null };

const routes = isApp() ?
    [
        // 重定向时保留 query，避免 __env=app 在跳转中丢失
        { name: "index", path: "/", redirect: (to) => ({ path: "/index", query: to.query }) },
        { name: "index-app", path: "/index", component: Index_App },
        { name: "list", path: "/list", component: Info },
    ] :
    [
        { name: "index", path: "/", component: Index },
        { name: "detail", path: "/:year/:tab", component: Detail },
        { name: "poem", path: "/:year/poem/detail", component: Poem },
    ];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const originalPush = router.push.bind(router);
router.push = (location) => originalPush(location).catch((err) => err);

export default router;
