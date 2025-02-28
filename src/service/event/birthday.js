import { $cms, $pay, $next } from "@jx3box/jx3box-common/js/https";

// 检查用户是否拥有该勋章
function medalCheck(params) {
    return $cms().get("/api/cms/user/medal/check", {
        params,
    });
}

// 领取生日勋章
function medalReceive(data) {
    return $cms().post("/api/cms/user/medal/receive", data);
}

// 检查用户是否拥有某装扮
function decorationCheck(params) {
    return $cms().get("/api/cms/user/decoration/check", {
        params,
    });
}

// 领取某个装扮
function decorationReceive(data) {
    return $cms().post("/api/cms/user/decoration/receive", data);
}

// 领取会员
function receiveVip(params) {
    return $cms().get("/api/cms/user/vip/receive", {
        params,
    })
}

function getWechatQrcode() {
    return $cms().get(`/api/cms/wechat/mp/bind`);
}

// 获取签约作者列表
function superAuthor(params) {
    return $cms().get("/api/cms/user/list/super_author", {
        params,
    });
}
// 获取用户信息
function getMyInfo() {
    return $cms().get(`/api/cms/user/my/info`, {
        params: {
            __no_cache: 1,
        },
    });
}
// ------------------------------------------------------------
// 获取地址列表
function getAddress(params) {
    return $pay().get(`/api/mall/ship-address`, { params });
}
// 添加地址
function addAddress(data) {
    return $pay().post(`/api/mall/ship-address`, data);
}
// -------------------------------------------------
// 同步年费会员福利可领取的次数
function mallGoodsAwardChanceSync(id, data) {
    return $pay().post(`/api/jx3box/event/${id}/pay-order-award/mall-goods-award/chance/sync`, data);
}
// 获取用户可以进行领取的年费会员福利列表
function mallGoodsAwardChanceList(id, params) {
    return $pay().get(`/api/jx3box/event/${id}/pay-order-award/mall-goods-award/chance/list`, { params });
}
// 领取年费会员福利
function mallGoodsAwardApply(id, recordId, data) {
    return $pay().post(`/api/jx3box/event/${id}/pay-order-award/mall-goods-award/award/${recordId}/apply`, data);
}
// 积分兑换会员
function pointsExchangeVip(id, params) {
    return $pay().get(`/api/jx3box/event/${id}/points-exchange-vip`, { params });
}
// 积分兑换会员-已领取次数
function pointsExchangeVipChance(id, params) {
    return $pay().get(`/api/jx3box/event/${id}/points-exchange-vip/chance`, { params });
}
// 活跃会员已领取VIP次数
function activityUserApplyVipChance(id, params) {
    return $pay().get(`/api/jx3box/event/${id}/activity-user/apply-vip/chance`, { params });
}
// 活跃会员领取VIP
function activityUserApplyVipApplyVip(id, params) {
    return $pay().get(`/api/jx3box/event/${id}/activity-user/apply-vip`, { params });
}
// 老用户已领取VIP次数
function oldUserApplyVipChance(id, params) {
    return $pay().get(`/api/jx3box/event/${id}/old-user/apply-vip/chance`, { params });
}
// 老用户领取VIP
function oldUserApplyVip(id, params) {
    return $pay().get(`/api/jx3box/event/${id}/old-user/apply-vip`, { params });
}
// -------------------------------------------------
// 获取周年福利商品详情
function eventRecordItem(id, params) {
    return $next().get(`/api/next2/event-record/item/${id}`, { params });
}

// 获取周年赠礼次数
function getEventGiftRecord(id) {
    return $pay().get(`/api/jx3box/event/${id}/pay-order-award/mall-goods-award/chance/list`, {
        params: {
            got: 0,
        }
    });

}

export {
    medalCheck,
    medalReceive,
    superAuthor,
    decorationCheck,
    decorationReceive,
    addAddress,
    getAddress,
    getMyInfo,
    pointsExchangeVip,
    activityUserApplyVipChance,
    activityUserApplyVipApplyVip,
    oldUserApplyVipChance,
    oldUserApplyVip,
    eventRecordItem,
    mallGoodsAwardChanceSync,
    mallGoodsAwardChanceList,
    mallGoodsAwardApply,
    getEventGiftRecord,
    pointsExchangeVipChance,

    receiveVip,
    getWechatQrcode
};
