import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import("./Index_v2.vue");
const Detail = () => import("./Detail_v2.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "detail", path: "/detail", component: Detail },
];

const router = new VueRouter({
    routes,
});

export default router;
