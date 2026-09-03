/**
 * 环境判断工具
 * 供 src/pages/event 下各活动项目复用（判断是否为 App 内嵌环境）
 */

/**
 * 判断当前环境是否为 app
 * 1. url 包含 __env=app
 * 2. 或 localStorage 中 __env === "app"
 * @returns {boolean}
 */
export function isApp() {
    return (
        new URLSearchParams(window.location.search).get("__env") === "app" ||
        localStorage.getItem("__env") === "app"
    );
}

/**
 * App 环境下注入移动端渲染所需的环境：
 * 1. 设置 viewport meta 为移动端（避免 webview 按桌面宽度缩放，这是「PC 缩小」的根因）
 * 2. 给 <html> 添加 v-app 根类（供 App 专属样式作用域使用）
 * 应在各活动 index.js 入口处、createApp 之前调用。
 */
export function applyAppEnv() {
    if (!isApp()) return;

    const viewport =
        document.querySelector('meta[name="viewport"]') || document.createElement("meta");
    viewport.name = "viewport";
    viewport.content =
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    if (!viewport.parentNode) {
        document.head.appendChild(viewport);
    }

    document.documentElement.classList.add("v-app");
}
