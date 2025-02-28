import { $team } from "@jx3box/jx3box-common/js/https.js";

function getVideos(event_id, params) {
    return $team().get(`/api/team/video/event/${event_id}`, {
        params: params,
    });
}

function deleteVideo(id) {
    return $team().delete(`/api/team/video/${id}`);
}

function updateVideo(id, data) {
    return $team().put(`/api/team/video/${id}`, data);
}

function addVideo(data) {
    return $team().post(`/api/team/video`, data);
}

function getLives(event_id, params) {
    return $team().get(`/api/team/rank/events/${event_id}/live-tv-list`, {
        params: params,
    });
}

export {
    getLives,
    getVideos,
    deleteVideo,
    addVideo,
    updateVideo,
};
