import { $team, $cms } from "@jx3box/jx3box-common/js/https.js";

export function getDesc(event_id) {
    return $team().get(`/api/team/team-gift/event/${event_id}`);
}
export function getGifts(params) {
    return $team().get(`/api/team/team-gift-record/list/public`, { params });
}
export function createGift(payload) {
    return $team().post(`/api/team/team-gift-record`, payload);
}
export function getUserInfo() {
    return $cms().get("/api/cms/user/my/info", {
        params: {
            __no_cache: 1,
        },
    });
}
