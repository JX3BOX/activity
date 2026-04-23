import { createRouter, createWebHashHistory } from "vue-router";

const Index = () => import("./Index.vue");
const routes = [{ name: "index", path: "/:year?", component: Index }];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const originalPush = router.push.bind(router);
router.push = (location) =>
    originalPush(location).catch((err) => {
        if (err?.name !== "NavigationDuplicated") throw err;
        return err;
    });

export default router;
