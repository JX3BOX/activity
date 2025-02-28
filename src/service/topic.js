import { $cms, $team } from "@jx3box/jx3box-common/js/https";

function getTopic(topic) {
    return $cms({ mute: true }).get("/api/cms/topic", {
        params: {
            type: topic,
            status: 1,
        },
    });
}

function getFbRank(id, server = "") {
    return $team({ mute: true }).get(`/api/team/race/achieve/${id}/top100?server=${server}&event_id=1`);
}
function getToken() {
    return $team().get("/api/team/role-bind-token");
}
function getRoles(params) {
    return $team().get("/api/team/my-game-roles", {
        params: params,
    });
}

function getAllMyRoles() {
    return $team().get(`/api/team/my-game-roles?nopage`);
}
function getHonorApi(eventName, params) {
    // 0 正确 非0 错误
    return $team().post(`/api/team/website/events/${eventName}/collect-rewards`, params);
}
export { getTopic, getFbRank, getToken, getHonorApi, getRoles, getAllMyRoles };
