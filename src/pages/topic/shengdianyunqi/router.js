import { createRouter, createWebHashHistory } from "vue-router";

const Index = () => import("./Index.vue");
const Info = () => import("./info/Index.vue");


const routes = [
	{ name: "index", path: "/", component: Index },
	{ name: "info", path: "/shengdian", component: Info },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
