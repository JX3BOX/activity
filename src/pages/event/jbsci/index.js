Vue.config.productionTip = false;
import { isMiniProgram, isApp } from "@jx3box/jx3box-common/js/utils";
const isPhone = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
// 检测小程序环境并动态添加viewport元标签
if (isMiniProgram() || isApp() || isPhone()) {
    const viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.head.appendChild(viewportMeta);

    isApp() && localStorage.setItem("__env", "app");
}

// 第三方UI组件
import Vue from "vue";
import ElementUI from "element-ui";
Vue.use(ElementUI);

// import VueClipboard from 'vue-clipboard2'
// Vue.use(VueClipboard)

// 通用UI模块
import JX3BOX_UI from "@jx3box/jx3box-common-ui";
import "@jx3box/jx3box-common/css/element.css";
import "@jx3box/jx3box-common/css/normalize.css";
Vue.use(JX3BOX_UI);
// import Comments from "@jx3box/jx3box-comment-ui"
// Vue.use(Comments)

// 全局过滤器
import * as filters from "@/utils/filters.js";
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});
import reporter from "@jx3box/jx3box-common/js/reporter";
reporter.install(Vue);

// 数据与路由
import router from "./router.js";
import "@/assets/css/event/jbsci/font.css";

import MobileApp from "./MobileApp.vue";
import DesktopApp from "./App.vue";

const App = isMiniProgram() || isApp() || isPhone() ? MobileApp : DesktopApp;

new Vue({
    router,
    // store,
    render: (h) => h(App),
}).$mount("#app");
