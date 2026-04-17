import { createRouter, createWebHashHistory } from "vue-router";

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

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

export default router;
