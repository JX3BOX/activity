import { createRouter, createWebHashHistory } from "vue-router";
import { getEditions } from "./topic";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { name: "index-2023", path: "/2023", component: () => import("./Index.vue") },
        { name: "index", path: "/:year(\\d{4})", component: () => import("./IndexNew.vue") },
        { path: "/:pathMatch(.*)*", component: () => import("./IndexNew.vue") },
    ],
});

router.beforeEach(async (to) => {
    let editions;
    try {
        editions = await getEditions();
    } catch {
        // 数据接口不可用时仍可进入页面查看加载错误。
        return to.path === "/2023" || /^\/20\d{2}$/.test(to.path) && Number(to.path.slice(1)) >= 2026
            ? true : { path: "/2026", query: to.query };
    }
    const latestYear = editions[0]?.year || 2026;
    if (!editions.some((edition) => to.path === `/${edition.year}`) && to.path !== `/${latestYear}`) {
        return { path: `/${latestYear}`, query: to.query };
    }
});

export default router;
