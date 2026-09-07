/**
 * 诗词赏鉴列表 / 详情弹层共用的头像处理
 */
import { showAvatar } from "@jx3box/jx3box-common/js/utils";

// 兜底头像：直接取公共库的 default_avatar（即 showAvatar 传空值时的返回值，
// 等价于 jx3box.json 里的 "https://cdn.jx3box.com/image/common/avatar.png"），避免重复硬编码
const DEFAULT_AVATAR = showAvatar("");

/**
 * 统一头像地址：空值由 showAvatar 返回官方默认头像，并处理好协议与 OSS 尺寸
 * @param {string} url 头像地址
 */
export function normalizeAvatar(url) {
    return showAvatar(url, "m");
}

// 头像加载失败（链接失效）时替换为默认头像，避免重复触发
export function onAvatarError(e) {
    e.target.src = DEFAULT_AVATAR;
    e.target.onerror = null;
}

const IMAGE_URL_RE = /https?:\/\/[^"']*\.(?:jpg|jpeg|gif|png)/gi;

/**
 * 将诗词正文整理为非空文本行，并移除正文中混入的图片地址。
 * PC 列表、App 列表和 App 详情共用。
 */
export function getPoemTextLines(value) {
    return String(value || "")
        .split(/\n/)
        .map((line) => line.replace(IMAGE_URL_RE, "").trim())
        .filter(Boolean);
}
