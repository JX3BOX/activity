import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import("./Index.vue");
const Key = () => import("./Key.vue");
Vue.use(VueRouter);

const routes = [
    {
        name: "index",
        path: "/",
        component: Index,
    },
    {
        name: "key",
        path: "/:key",
        component: Key,
    },
];

let base = ''
if(process.env.NODE_ENV === 'development'){
    base = '/namespace'
}else if(location.origin.includes('jx3box.com')){
    base = '/event/namespace'
}else{
    base = '/'
}

const router = new VueRouter({
    mode: "history",
    base:  base,
    routes,
});

export default router;

