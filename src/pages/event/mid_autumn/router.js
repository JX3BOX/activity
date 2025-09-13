import Vue from "vue";
import VueRouter from "vue-router";

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const Index = () => import("./Index_v2.vue");
const Detail = () => import("./Detail_v2.vue");
const Poem = () => import("./Poem_Detail.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "poem", path: "/:year/poem/detail", component: Poem },
    { name: "detail", path: "/:year/:tab", component: Detail },
];

const router = new VueRouter({
    routes,
});

export default router;
