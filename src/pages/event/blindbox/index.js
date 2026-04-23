import { createApp } from "vue";
import ElementPlus from "element-plus";
import "@jx3box/jx3box-common/css/element.css";
import "@jx3box/jx3box-common/css/normalize.css";

import JX3BOX_UI from "@jx3box/jx3box-common-ui";
import * as filters from "@/utils/filters.js";

import router from "./router.js";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(JX3BOX_UI);

Object.keys(filters).forEach((key) => {
	app.config.globalProperties[key] = filters[key];
});


app.mount("#app");
