import Vue from "vue";
import VueRouter from "vue-router";
import { isMiniProgram } from "@jx3box/jx3box-common/js/utils";
Vue.use(VueRouter);
const Mini = () => import("./new/Mini.vue");
const Index = () => import("./new/Index.vue");
const Detail = () => import("./new/Detail.vue");

const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "Index",
            component: isMiniProgram() ? Mini : Index,
        },
        {
            path: "/detail",
            name: "Detail",
            meta: { key: "detail" },
            component: Detail,
        },
    ],
});

export default router;
