import { createRouter, createWebHashHistory } from "vue-router";

const Index = () => import("./Index.vue");


const routes = [{ name: "index", path: "/:year?", component: Index }];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => {
        if (err.name !== "NavigationDuplicated") throw err;
    });
};

export default router;
