import { $next, $cms } from "@jx3box/jx3box-common/js/https";
// 【用户】获取最新的一个公开的投票活动详情
export function getNewProgram(params) {
    return $next().get(`/api/next2/vote-program/program/public/latest`, { params });
}
//获取公开投票的详情
export function getProgramDetail(id) {
    return $next().get(`/api/next2/vote-program/program/${id}/public`);
}
// /vote-program/program/{id}/public/vote-item/{voteItemId}

// 用户获取公开的投票活动【单项】详情
export function getProgramItem(id, voteItemId) {
    return $next().get(`/api/next2/vote-program/program/${id}/public/vote-item/${voteItemId}`);
}

export function getVoteItemQrcode(id, params) {
    return $cms().get(`/api/cms/vote/program/item/${id}/qrcode`, {
        params,
    });
}

export function getVoteJudges() {
    return $cms()
        .get(`/api/cms/manage/www/block/load`, {
            params: {
                slug: "mid_autumn_2024",
                app: "std",
            },
        })
        .then((res) => {
            return res.data.data.items;
        });
}

// 用户投票
export function userPoll(id, params) {
    return $next().post(`/api/next2/vote-program/program/${id}/vote`, params);
}
