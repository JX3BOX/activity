import { $next } from "@jx3box/jx3box-common/js/api";

function getVoteInfo(id) {
    return $next().get(`/api/next2/vote-program/program/${id}/public`);
}

function getUserVoteStatus(eventId) {
    return $next().get(`/api/next2/vote-program/user/votes/${eventId}`);
}

function submitVote(id, data) {
    return $next().post(`/api/next2/vote-program/program/${id}/vote`, data);
}

export { getVoteInfo, getUserVoteStatus, submitVote };
