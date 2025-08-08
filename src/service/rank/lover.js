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
    // return $team().get(`/api/team/pvp-event/${eventId}/public/join-record/list`);
}

// 批量创建赛程
export function batchCreateProcess(data) {
    return $team().post(`/api/team/pvp-event-process/manage/batch`, data);
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
    // return $team().get(`/api/team/pvp-event-process/manage/list`, { params });
    return new Promise((resolve) => {
        const mockData = {
            data: {
                code: 0,
                msg: "",
                data: {
                    list: [],
                    page: {
                        index: 1,
                        pageSize: 1000,
                        total: 0,
                        pageTotal: 1,
                    },
                },
            },
        };
        const getProcessRecord = (id, payload) => ({
            id: id,
            event_id: 1,
            round: 1,
            position: Math.ceil(id / 2),
            team1_id: (id - 1) * 2 + 1,
            team2_id: (id - 1) * 2 + 2,
            team1_conf: [
                {
                    user_id: 541896,
                    pz_id: 544,
                },
                {
                    user_id: 541898,
                    pz_id: 545,
                },
            ],
            team2_conf: [
                {
                    user_id: 541897,
                    pz_id: 544,
                },
                {
                    user_id: 541899,
                    pz_id: 545,
                },
            ],
            team1_card: Math.floor(Math.random() * 5) + 1,
            team2_card: Math.floor(Math.random() * 5) + 1,
            winner_id: 0,
            next_match_id: 0,
            created_at: "2025-08-07 15:13:45",
            updated_at: "2025-08-07 15:13:45",
            team1_record: getJoinRecord((id - 1) * 2 + 1),
            team2_record: getJoinRecord((id - 1) * 2 + 2),
            team1_teammates: [
                {
                    id: 541896,
                    display_name: "路人甲",
                    avatar: "",
                    user_avatar_frame: "",
                    sign: 0,
                    wechat_unionid: "",
                },
                {
                    id: 541898,
                    display_name: "路人乙",
                    avatar: "",
                    user_avatar_frame: "",
                    sign: 0,
                    wechat_unionid: "",
                },
            ],
            team2_teammates: [
                {
                    id: 541897,
                    display_name: "路人丙",
                    avatar: "",
                    user_avatar_frame: "",
                    sign: 0,
                    wechat_unionid: "",
                },
                {
                    id: 541899,
                    display_name: "路人丁",
                    avatar: "",
                    user_avatar_frame: "",
                    sign: 0,
                    wechat_unionid: "",
                },
            ],
            ...payload,
        });
        const getJoinRecord = (id) => ({
            id,
            event_id: 1,
            user_id: Math.floor(Math.random() * 10000),
            team_name: `Team ${id}`,
            server: "Server",
            remark: "",
            status: 1,
            votes: 0,
            created_at: "2025-08-07 10:50:44",
            updated_at: "2025-08-07 10:50:44",
            live_url: "",
            live_platform: "",
            teammates: [541896, 541898],
            images: [
                `https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/main/icons/outline/number-${id}-small.svg`,
            ],
        });
        for (let i = 1; i <= 16; i++) {
            mockData.data.data.list.push(getProcessRecord(i));
        }
        mockData.data.data.list.push(
            getProcessRecord(17, {
                winner_id: 33,
                round: 5,
            })
        );

        resolve(mockData);
    });
}

export function setProcessCardId(processId, payload) {
    return $team().post(`/api/team/pvp-event-process/manage/item/${processId}/set-card-id`, payload);
}
