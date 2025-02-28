import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import("./Index.vue");
const Info = () => import("./info/Index.vue");

Vue.use(VueRouter);

const routes = [
	{ name: "index", path: "/", component: Index },
	{ name: "info", path: "/shengdian", component: Info },
];

const router = new VueRouter({
	routes,
});

export default router;
