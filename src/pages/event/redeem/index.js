import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createJx3boxUiI18n, install as JX3BOX_UI } from "@jx3box/jx3box-ui";

import "@jx3box/jx3box-common/css/normalize.css";
import "@jx3box/jx3box-common/css/font.css";
import "@jx3box/jx3box-common/css/element-plus-theme.scss";
import "@jx3box/jx3box-common/css/element-fonticon.css";

import App from "./App.vue";

let viewport = document.querySelector('meta[name="viewport"]');
if (!viewport) {
    viewport = document.createElement("meta");
    viewport.setAttribute("name", "viewport");
    document.head.appendChild(viewport);
}
viewport.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no");

const app = createApp(App);
const i18n = createJx3boxUiI18n({ locale: "zh-CN" });

app.use(createHead());
app.use(i18n);
app.use(JX3BOX_UI);
app.use(ElementPlus, { locale: zhCn });

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount("#app");
