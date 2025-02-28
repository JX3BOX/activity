import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import("./Index.vue");
const Cangjian = () => import("./cangjian/index.vue");


Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "cangjian", path: "/cangjian", component: Cangjian }
];

const router = new VueRouter({
    routes,
});

export default router;
