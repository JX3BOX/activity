import { $pay } from "@jx3box/jx3box-common/js/api";

export function getRedeemItem(id) {
    return $pay({ mute: true }).get(`/api/mall/items/${id}`);
}

export function createRedeemOrder(id, remark) {
    return $pay({ mute: true }).post(`/api/mall/order/item/${id}/count/1/to/0`, { remark });
}

export function payRedeemOrder(id) {
    return $pay({ mute: true }).post(`/api/mall/my/orders/${id}/pay`);
}
