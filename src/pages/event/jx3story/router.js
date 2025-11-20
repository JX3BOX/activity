import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "Index",
            component: () => import("./new/Index.vue"),
        },
        {
            path: "/detail",
            name: "Detail",
            meta: { key: "detail" },
            component: () => import("./new/Detail.vue"),
        },
    ],
});

export default router;
