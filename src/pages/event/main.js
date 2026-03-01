Vue.config.productionTip = false;
Vue.config.devtools = true;
import { isMiniProgram, isApp } from "@jx3box/jx3box-common/js/utils";

// 检测小程序环境并动态添加viewport元标签
if (isMiniProgram() || isApp()) {
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

// 通用UI模块
import JX3BOX_UI from "@jx3box/jx3box-common-ui";
import "@jx3box/jx3box-common/css/element.css";
import "@jx3box/jx3box-common/css/normalize.css";
Vue.use(JX3BOX_UI);

import reporter from "@jx3box/jx3box-common/js/reporter";
reporter.install(Vue);

// 数据与路由
// import router from "./router";
// import store from "./store";
// 导入两个组件
import MobileApp from "./MobileApp.vue";
import DesktopApp from "./App.vue";

// 根据条件选择使用哪个组件
const App = isMiniProgram() || isApp() ? MobileApp : DesktopApp;
new Vue({
    // router,
    // store,
    render: (h) => h(App),
}).$mount("#app");
