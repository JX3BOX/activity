import { use, registerTheme } from "echarts/core";
import { BarChart, PieChart } from "echarts/charts";
import {
    TooltipComponent,
    MarkPointComponent,
    MarkLineComponent,
    DataZoomComponent,
    LegendComponent,
    TitleComponent,
    GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

import jx3DarkTheme from "@/assets/data/rank/echartsTheme.json";

import { createApp } from "vue";
import App from "./Rank.vue";

import router from "./router";
import store from "./store";

import { createHead } from "@vueuse/head";
import { createJx3boxUiI18n, getJx3boxUiAvailableLocales, install as JX3BOX_UI } from "@jx3box/jx3box-ui";
import { mergeAppLocaleMessages } from "@/locale";
import { initRouterI18nHead } from "@/router/i18n-head";

import "@jx3box/jx3box-common/css/normalize.css";
import "@jx3box/jx3box-common/css/font.css";
import "@jx3box/jx3box-common/css/element-plus-theme.scss";
import "@jx3box/jx3box-common/css/element-fonticon.css";

import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import zhTw from "element-plus/es/locale/lang/zh-tw";
import vi from "element-plus/es/locale/lang/vi";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "@/assets/css/tailwind.css";

use([
    BarChart,
    PieChart,
    TooltipComponent,
    MarkPointComponent,
    MarkLineComponent,
    DataZoomComponent,
    LegendComponent,
    TitleComponent,
    GridComponent,
    CanvasRenderer,
]);
registerTheme("jx3box-dark", jx3DarkTheme);

const app = createApp(App);

app.use(router);
app.use(store);

import ECharts from "vue-echarts"; // 在 webpack 环境下指向 components/ECharts.vue
app.component("v-chart", ECharts);
import Katex from "@/utils/katex";
app.directive("katex", Katex);

const head = createHead();
app.use(head);

const langKey = (localStorage.getItem("lang") || "zh-cn").toLowerCase();
const langMap = {
    "zh-cn": "zh-CN",
    "en-us": "en-US",
    "zh-tw": "zh-TW",
    vi: "vi",
};
const preferredLocale = langMap[langKey] || "zh-CN";
const supportedLocales = getJx3boxUiAvailableLocales();
const locale = supportedLocales.includes(preferredLocale) ? preferredLocale : "zh-CN";

const i18n = createJx3boxUiI18n({ locale });
mergeAppLocaleMessages(i18n);
i18n.global.missingWarn = false;
i18n.global.fallbackWarn = false;
app.use(i18n);

initRouterI18nHead(router, i18n, head);

app.use(JX3BOX_UI);

const elementLocaleMap = {
    "zh-CN": zhCn,
    "en-US": en,
    "zh-TW": zhTw,
    vi,
};
app.use(ElementPlus, {
    locale: elementLocaleMap[locale] || zhCn,
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount("#app");
