import { $team } from "@jx3box/jx3box-common/js/https.js";

function createEvent(data) {
    return $team().post(`/api/team/rank/events`);
}

function updateEvent(id, data) {
    return $team().put(`/api/team/rank/events/${id}`, data);
}

function activeEvent(id) {
    return $team().put(`/api/team/rank/events/${id}/active`);
}

function stopEvent(id) {
    return $team().put(`/api/team/rank/events/${id}/stop`);
}

function getEvent(id) {
    return $team().get(`/api/team/rank/events/` + id);
}

function getEvents(params) {
    return $team().get(`/api/team/rank/events`, {
        params: params,
    });
}

// 从slug获取id
function getIdFromSlug(slug) {
    return $team().get(`/api/team/rank/events/item?slug=${slug}`);
}

export {
    createEvent,
    updateEvent,
    activeEvent,
    stopEvent,
    getEvent,
    getEvents,
    getIdFromSlug,
};
