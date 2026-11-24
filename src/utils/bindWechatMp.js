/**
 * 微信公众号绑定统一跳转。
 * 项目内不再展示绑定二维码，统一到魔盒个人中心的通知页完成绑定。
 */
export const WECHAT_MP_BIND_URL = "/dashboard/notice";

export function toBindWechatMp() {
    window.location.href = WECHAT_MP_BIND_URL;
}
