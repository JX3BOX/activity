import { createRouter, createWebHashHistory } from "vue-router";
import { watch } from "vue";
import { isApp, initAppEnv, responsiveAppMode } from "@/utils/env";

initAppEnv({ appMaxWidth: 1133 });

const Index = () => import("./Index.vue");
const Index_App = () => import("./Index_App.vue");
const Detail = () => import("./Detail.vue");
const Info = () => import("./Detail_App.vue");
const Poem = () => import("./PoemDetail.vue");

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "index-app", path: "/index", component: Index_App },
    { name: "list", path: "/list", component: Info },
    { name: "detail", path: "/:year/:tab", component: Detail },
    { name: "poem", path: "/:year/poem/detail", component: Poem },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// 两套布局使用不同路由，切换尺寸时同步保留年份、栏目及其他参数。
function getModeRoute(to) {
    if (isApp()) {
        if (to.name === "index") return { name: "index-app", query: to.query };
        if (to.name === "detail" || to.name === "poem") {
            return {
                name: "list",
                query: { ...to.query, year: to.params.year, tab: to.name === "poem" ? "poem" : to.params.tab },
            };
        }
    } else {
        if (to.name === "index-app") return { name: "index", query: to.query };
        if (to.name === "list") {
            const { year, tab, ...query } = to.query;
            return year
                ? { name: "detail", params: { year, tab: tab || "intro" }, query }
                : { name: "index", query };
        }
    }
}

router.beforeEach((to) => getModeRoute(to));
watch(responsiveAppMode, () => {
    const target = getModeRoute(router.currentRoute.value);
    if (target) router.replace(target);
});

const originalPush = router.push.bind(router);
router.push = (location) => originalPush(location).catch((err) => err);

export default router;
