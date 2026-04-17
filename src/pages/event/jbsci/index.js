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

import { createApp } from "vue";
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

// 全局过滤器
import * as filters from "@/utils/filters.js";

import reporter from "@jx3box/jx3box-common/js/reporter";

// 数据与路由
import router from "./router.js";
import "@/assets/css/event/jbsci/font.css";

import MobileApp from "./MobileApp.vue";
import DesktopApp from "./App.vue";

const App = isMiniProgram() || isApp() || isPhone() ? MobileApp : DesktopApp;

const app = createApp(App);
app.use(router);

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

// 注册全局过滤器
Object.keys(filters).forEach((key) => {
    app.config.globalProperties.$filters = filters;
});

reporter.install(app);
app.mount("#app");
