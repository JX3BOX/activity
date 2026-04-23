import { createRouter, createWebHashHistory } from "vue-router";

const Index = () => import("./Index.vue");
const Detail = () => import("./Detail.vue");
const Poem = () => import("./PoemDetail.vue");

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "poem", path: "/:year/poem/detail", component: Poem },
    { name: "detail", path: "/:year/:tab", component: Detail },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const originalPush = router.push.bind(router);
router.push = (location) => originalPush(location).catch((err) => err);

export default router;
