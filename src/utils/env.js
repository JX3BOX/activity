/**
 * 环境判断工具
 * 供活动和百强页面复用，支持入口按需启用响应式 App 布局。
 */

import { ref } from "vue";

const responsiveAppMode = ref(false);
const ENV_KEY = "__env";
const APP_VALUE = "app";

/**
 * 解析当前 url 上的参数（query + hash 中的 query）
 * 本项目使用 hash 路由，__env=app 常被拼在 `#/` 之后（如 /event/xxx/#/?__env=app），
 * 此时 window.location.search 为空，必须一并解析 hash 部分，否则 app 环境判断失效。
 * @returns {URLSearchParams}
 */
function getUrlParams() {
    if (typeof window === "undefined") return new URLSearchParams();
    const search = window.location.search || "";
    const hash = window.location.hash || "";
    const hashQuery = hash.includes("?") ? hash.slice(hash.indexOf("?") + 1) : "";
    return new URLSearchParams([search, hashQuery].filter(Boolean).join("&"));
}

/**
 * 判断当前环境是否为 app
 * 1. url（含 hash 路由里的 query）包含 __env=app
 * 2. 或 localStorage 中 __env === "app"
 * 3. 或当前入口启用的响应式断点命中
 * @returns {boolean}
 */
export function isApp() {
    return responsiveAppMode.value || isEmbeddedApp();
}

// 仅判断 App 入口，避免把手机浏览器的响应式布局当作原生 App。
export function isEmbeddedApp() {
    return getUrlParams().get(ENV_KEY) === APP_VALUE || localStorage.getItem(ENV_KEY) === APP_VALUE;
}

/**
 * 把 url 上的 __env 同步进 localStorage
 * hash 路由下站内跳转（如 / -> /index 重定向）可能丢掉 query，
 * 同步后刷新/跳转仍能保持 app 环境。
 * 显式传入非 app 的值（如 __env=web）时清除缓存标记。
 */
export function syncAppEnv() {
    if (typeof window === "undefined") return;
    const env = getUrlParams().get(ENV_KEY);
    if (env === APP_VALUE) {
        localStorage.setItem(ENV_KEY, APP_VALUE);
    } else if (env) {
        localStorage.removeItem(ENV_KEY);
    }
}

/**
 * App 环境下注入移动端渲染所需的环境：
 * 1. 设置 viewport meta 为移动端（避免 webview 按桌面宽度缩放，这是「PC 缩小」的根因）
 * 2. 给 <html> 添加 v-app 根类（供 App 专属样式作用域使用）
 * 应在各活动 index.js 入口处、createApp 之前调用。
 */
export function applyAppEnv() {
    if (!isApp()) return;

    applyMobileViewport();
    document.documentElement.classList.add("v-app");
}

function applyMobileViewport() {
    const viewport =
        document.querySelector('meta[name="viewport"]') || document.createElement("meta");
    viewport.name = "viewport";
    viewport.content =
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
    if (!viewport.parentNode) {
        document.head.appendChild(viewport);
    }
}

/**
 * 初始化 App 内嵌环境。
 * 各页面入口应在 createApp 前调用，避免重复维护同步和注入顺序。
 * appMaxWidth 可选：小于等于该宽度时使用 App 布局，随窗口尺寸更新。
 */
export function initAppEnv({ appMaxWidth } = {}) {
    syncAppEnv();
    // 仅由需要响应式 App 布局的入口启用，不把屏幕尺寸写入环境缓存。
    if (appMaxWidth) {
        // 先设置真实设备视口，避免移动浏览器的默认桌面视口干扰断点。
        applyMobileViewport();
        const media = window.matchMedia(`(max-width: ${appMaxWidth}px)`);
        const update = () => {
            responsiveAppMode.value = media.matches;
            document.documentElement.classList.toggle("v-app", isApp());
        };
        update();
        if (media.addEventListener) media.addEventListener("change", update);
        else media.addListener(update);
    }
    applyAppEnv();
}
