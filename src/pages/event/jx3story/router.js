import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "Index",
            component: () => import("./Index.vue"),
        },
        {
            path: "/event",
            name: "Event",
            meta: { key: "event" },
            component: () => import("./Detail.vue"),
        },
        {
            path: "/vote",
            name: "Vote",
            meta: { key: "vote" },
            component: () => import("./Detail.vue"),
        },
        {
            path: "/article",
            name: "Article",
            component: () => import("./Article.vue"),
        },
    ],
});

export default router;
