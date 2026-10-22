import { $cms, $team } from "@jx3box/jx3box-common/js/api";

function getTopic(topic) {
    return $cms({ mute: true }).get("/api/cms/topic", {
        params: {
            type: topic,
            status: 1,
        },
    });
}

function getPvxTopics() {
    return $cms({ mute: true }).get("/api/cms/pvx/topic").then((res) => {
        const data = res?.data?.data;
        if (!data) return res;
        const topics = data.std || [];
        const current = topics.find((item) => item.key === "cangshengzhushi");
        // Keep the new page discoverable before the CMS catalogue is updated.
        // Preserve CMS metadata when the entry is available there.
        data.std = [
            {
                name: "苍生铸世",
                key: "cangshengzhushi",
                ...current,
                year: "2026",
                date: "10-29",
                time: "2026.10.29",
                link: "/topic/cangshengzhushi#/",
            },
            ...topics.filter((item) => item.key !== "cangshengzhushi"),
        ];
        return res;
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
export { getTopic, getPvxTopics, getFbRank, getToken, getHonorApi, getRoles, getAllMyRoles };
