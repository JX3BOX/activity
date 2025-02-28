import Vue from "vue";
import VueRouter from "vue-router";

const Birthday5 = () => import("./birthday5.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", redirect: { name: "birthday5" } },
    { name: "birthday5", path: "/5", component: Birthday5 },
];

const router = new VueRouter({
    routes,
});

export default router;
