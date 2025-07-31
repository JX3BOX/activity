import { $team, $cms } from "@jx3box/jx3box-common/js/https.js";

export function getMyProfile() {
    return $cms().get("/api/cms/user/my/profile");
}

// 获取活动列表
export function getLoverEvents(id) {
    return $team().get(`/api/team/pvp-event/public/list`);
}

// 获取详情
export function getLoverEvent(id) {
    return $team({ mute: true }).get(`/api/team/pvp-event/public/item/${id}`);
}

// 获取“情缘”类型的关系网
export function getLoverRelationNet() {
    return $team().get(`/api/team/relation-net/members/by-type/lover`);
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

// 获取入围队伍
export function getSelectedList(eventId) {
    return $team().get(`/api/team/pvp-event/${eventId}/public/join-record/selected/list`);
}

// 我参加的情缘活动
export function getMyJoinRecord(eventId) {
    return $team().get(`/api/team/pvp-event/${eventId}/my/join-record`);
}

// 获取情缘活动进程
export function getLoverProgress(params) {
    return $team().get(`/api/team/pvp-event-process/public/list`, { params });
}

export function vote(eventId, recordId, data) {
    return $team().post(`/api/team/pvp-event/${eventId}/public/join-record/item/${recordId}/vote`, data);
}

export function getVoteStatus(eventId, recordId, voteId) {
    return $team().get(`/api/team/pvp-event/${eventId}/public/join-record/item/${recordId}/vote/item/${voteId}/status`);
}

// 获取我的投票记录
export function getMyVoteRecords(params) {
    return $team().get(`/api/team/pvp-event/my/vote-log`, { params });
}

export function getEventCardList(params) {
    return $team().get(`/api/team/pvp-event-card/public/list`, { params });
}

export function pickCard(eventId, processId) {
    return $team().get(`/api/team/pvp-event-card/manage/event/${eventId}/process/${processId}/pick`);
}

export function getProcessListManage(params) {
    return $team().get(`/api/team/pvp-event-process/manage/list`, { params });
}

export function setProcessCardId(processId, payload) {
    return $team().post(`/api/team/pvp-event-process/manage/item/${processId}/set-card-id`, payload);
}
