import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import("./Index.vue");
const Yaozong = () => import("./Yaozong.vue");
const Index_old = () => import("./Index_old.vue");

Vue.use(VueRouter);

const routes = [
	{ name: "index", path: "/", component: Index },
	{ name: "yaozong", path: "/yaozong", component: Yaozong },
	{ name: "old", path: "/old", component: Index_old },
];

const router = new VueRouter({
	routes,
});

export default router;
