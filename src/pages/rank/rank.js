Vue.config.productionTip = false;

// 第三方UI组件
import Vue from "vue";
import ElementUI from "element-ui";
Vue.use(ElementUI);

// 通用UI模块
import JX3BOX_UI from "@jx3box/jx3box-common-ui";
import "@jx3box/jx3box-common/css/element.css";
import "@jx3box/jx3box-common/css/normalize.css";
Vue.use(JX3BOX_UI);

// 数据与路由
import router from "./router";
import store from "./store";

import ECharts from "vue-echarts"; // 在 webpack 环境下指向 components/ECharts.vue

// 手动引入 ECharts 各模块来减小打包体积
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/markLine";
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";

import jx3DarkTheme from "@/assets/data/rank/echartsTheme.json";

import reporter from "@jx3box/jx3box-common/js/reporter";
reporter.install(Vue);


Vue.component("v-chart", ECharts);
ECharts.registerTheme("jx3box-dark", jx3DarkTheme);
import Katex from "vue-katex-auto-render";
Vue.directive("katex", Katex);
import App from "./Rank.vue";
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
