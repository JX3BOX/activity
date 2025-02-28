import { $team } from "@jx3box/jx3box-common/js/https.js";

function joinEvent(data) {
    return $team().post(`/api/team/rank/join`, data);
}

function hasJoined(event_id, uid) {
    return $team().get(`/api/team/rank/my-records`, {
        params: {
            event_id: event_id,
            // uid : uid
        },
    });
}

function getMyJoin(eventId) {
    return $team().get(`/api/pvp-event/${eventId}/my/join-record`);
}
function joinLover(eventId, data) {
    return $team().post(`/api/pvp-event/${eventId}/join-record`, data);
}
function joinRecord(params) {
    return $team().get(`/pvp-event/{eventId}/my/join-record`, { params });
}

export { joinEvent, hasJoined, getMyJoin, joinLover, joinRecord };
