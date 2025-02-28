import { $cms } from "@jx3box/jx3box-common/js/https";


// 获取微信二维码
export function getWechatQrcode() {
    return $cms().get(`/api/cms/wechat/mp/bind`);
}
