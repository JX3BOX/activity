import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import("./Index.vue");

Vue.use(VueRouter);

const routes = [{ name: "index", path: "/:year?", component: Index }];

const router = new VueRouter({
    routes,
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => {
        if (err.name !== "NavigationDuplicated") throw err;
    });
};

export default router;
