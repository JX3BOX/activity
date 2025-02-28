import { $pay } from "@jx3box/jx3box-common/js/https";


// 获取中奖历史
function getMyHistory(params) {
    return $pay().get(`/api/lucky-draw/my/history`, { params });
}

// 获取我的中奖
function getMyLucky(id) {
    return $pay().get(`/api/lucky-draw/my/history/${id}/details`);
}

// 所有抽奖列表
function getLuckyList(params) {
    return $pay().get(`/api/lucky-draw/public/list`, { params });
}
// 获取活动详情
function getBlindBox(id) {
    return $pay().get(`/api/lucky-draw/public/details`, { params: { id } });
}

// 抽奖
function goodLucky(id, batch) {
    return $pay().post(`/api/lucky-draw/public/item/${id}/try-my-lucky?batch=${batch}`);
}


export {
    getMyHistory,
    getBlindBox,
    getMyLucky,
    goodLucky,
    getLuckyList
};