import { $team } from "@jx3box/jx3box-common/js/https.js";

export function getLoverEvent(id) {
    return $team().get(`/api/team/pvp-event/public/item/${id}`);
}
// 获取我的情缘
export function getMyLover() {
    return $team().get(`/api/team/my-lover/list`);
}
// 设置我的主情缘
export function setMyLover(id) {
    return $team().put(`/api/team/my-lover/item/${id}/star`);
}

// 报名
export function joinLover(eventId, data) {
    return $team().post(`/api/team/pvp-event/${eventId}/join-record`, data);
}

// 获取报名队伍
export function getJoinList(eventId, params) {
    return $team().get(`/api/team/pvp-event/${eventId}/public/join-record/list`, { params });
}

// 我参加的情缘活动
export function getMyJoinLover(eventId) {
    return $team().get(`/api/team/pvp-event/${eventId}/my/join-record`);
}

// 获取情缘活动进程
export function getLoverProgress(params) {
    return $team().get(`/api/team/pvp-event-process/public/list`, { params });
}
