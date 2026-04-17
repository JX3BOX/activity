import { createRouter, createWebHashHistory } from "vue-router";

const Index = () => import("./Index.vue");
const Yaozong = () => import("./Yaozong.vue");
const Index_old = () => import("./Index_old.vue");


const routes = [
	{ name: "index", path: "/", component: Index },
	{ name: "yaozong", path: "/yaozong", component: Yaozong },
	{ name: "old", path: "/old", component: Index_old },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
