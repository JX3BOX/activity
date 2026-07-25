import { $next } from "@jx3box/jx3box-common/js/api.js";

const domain =
    process.env.VUE_APP_LOVER_API ||
    (process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:7104"
        : typeof window !== "undefined"
          ? window.location.origin
          : "");

const request = (options = {}) => $next({ domain, serviceKey: "lover", ...options });
const publicRequest = (options = {}) => {
    const client = request(options);
    // 公开接口不需要登录态；清掉 Basic Auth，避免本地残留 token 让 jwt_optional 请求反而被拒绝。
    delete client.defaults.auth;
    client.defaults.withCredentials = false;
    return client;
};
const base = (eventId) => `/api/lover/v2/events/${eventId}`;

export const getV2Event = (eventId) => publicRequest().get(base(eventId));
export const getV2Context = (eventId) => request({ mute: true }).get(`${base(eventId)}/me`);

export const createRegistration = (eventId, data) => request().post(`${base(eventId)}/registrations`, data);
export const updateRegistration = (eventId, id, data) =>
    request().put(`${base(eventId)}/registrations/${id}`, data);
export const cancelRegistration = (eventId, id) => request().delete(`${base(eventId)}/registrations/${id}`);

export const getMateHall = (eventId, params) => request().get(`${base(eventId)}/mate-hall`, { params });
export const getMateUnitHall = (eventId, params) => request().get(`${base(eventId)}/mate-unit-hall`, { params });
export const getInvitations = (eventId, params) => request().get(`${base(eventId)}/invitations/me`, { params });
export const sendMateInvitation = (eventId, registrationId) =>
    request().post(`${base(eventId)}/mate-invitations`, { target_registration_id: registrationId });
export const sendTeamInvitation = (eventId, teamId, unitId) =>
    request().post(`${base(eventId)}/teams/${teamId}/invitations`, { target_unit_id: unitId });
export const acceptInvitation = (eventId, invitationId) =>
    request().post(`${base(eventId)}/invitations/${invitationId}/accept`, {});
export const rejectInvitation = (eventId, invitationId) =>
    request().post(`${base(eventId)}/invitations/${invitationId}/reject`, {});
export const dissolveUnit = (eventId, unitId) => request().delete(`${base(eventId)}/units/${unitId}`);

export const getMyTeam = (eventId) => request().get(`${base(eventId)}/teams/me`);
export const getTeams = (eventId, params) => publicRequest().get(`${base(eventId)}/teams`, { params });
export const getAllTeams = async (eventId) => {
    const pageSize = 100;
    const firstRes = await getTeams(eventId, { page: 1, page_size: pageSize });
    const firstPage = firstRes.data.data;
    const totalPages = Math.ceil(Number(firstPage.count || 0) / Number(firstPage.page_size || pageSize));
    if (totalPages <= 1) return firstPage.list || [];
    const rest = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, index) =>
            getTeams(eventId, { page: index + 2, page_size: pageSize })
        )
    );
    return [firstRes, ...rest].flatMap((res) => res.data.data.list || []);
};
export const removeTeamUnit = (eventId, teamId, unitId) =>
    request().delete(`${base(eventId)}/teams/${teamId}/units/${unitId}`);
export const drawSolo = (eventId, teamId) => request().post(`${base(eventId)}/teams/${teamId}/solo-draws`, {});
export const getSoloDraws = (eventId, teamId, params) =>
    request().get(`${base(eventId)}/teams/${teamId}/solo-draws`, { params });

export const getStages = (eventId, params) => publicRequest().get(`${base(eventId)}/stages`, { params });
export const getStage = (eventId, stageId) => publicRequest().get(`${base(eventId)}/stages/${stageId}`);
export const getMatches = (eventId, stageId, params) =>
    publicRequest().get(`${base(eventId)}/stages/${stageId}/matches`, { params });
export const getAllStageMatches = async (eventId, stageId) => {
    const pageSize = 100;
    const firstRes = await getMatches(eventId, stageId, { page: 1, page_size: pageSize });
    const firstPage = firstRes.data.data;
    const totalPages = Math.ceil(Number(firstPage.count || 0) / Number(firstPage.page_size || pageSize));
    if (totalPages <= 1) return firstPage.list || [];
    const rest = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, index) =>
            getMatches(eventId, stageId, { page: index + 2, page_size: pageSize })
        )
    );
    return [firstRes, ...rest].flatMap((res) => res.data.data.list || []);
};
export const getMatch = (eventId, matchId) => publicRequest().get(`${base(eventId)}/matches/${matchId}`);
export const setMatchReady = (eventId, matchId, ready) =>
    request().post(`${base(eventId)}/matches/${matchId}/ready`, { ready });

export const getMatchTeamConfig = (eventId, matchId) =>
    request().get(`${base(eventId)}/matches/${matchId}/team-config`);
export const saveMatchMemberConfig = (eventId, matchId, member) =>
    request().put(`${base(eventId)}/matches/${matchId}/team-config/member`, { member });
export const lockMatchTeamConfig = (eventId, matchId) =>
    request().post(`${base(eventId)}/matches/${matchId}/team-config/lock`, {});

export const getEventCards = (eventId, params) => publicRequest().get(`${base(eventId)}/cards`, { params });
export const getAllEventCards = async (eventId) => {
    const pageSize = 100;
    const firstRes = await getEventCards(eventId, { page: 1, page_size: pageSize });
    const firstPage = firstRes.data.data;
    const totalPages = Math.ceil(Number(firstPage.count || 0) / Number(firstPage.page_size || pageSize));
    if (totalPages <= 1) return firstPage.list || [];
    const rest = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, index) =>
            getEventCards(eventId, { page: index + 2, page_size: pageSize })
        )
    );
    return [firstRes, ...rest].flatMap((res) => res.data.data.list || []);
};
export const getCardDraws = (eventId, matchId, params) =>
    publicRequest().get(`${base(eventId)}/matches/${matchId}/card-draws`, { params });
export const drawCard = (eventId, matchId) => request().post(`${base(eventId)}/matches/${matchId}/card-draws`, {});
export const getTeamTimeline = (eventId, teamId, params) =>
    publicRequest().get(`${base(eventId)}/teams/${teamId}/timeline`, { params });
export const getMyLogs = (eventId, params) => request().get(`${base(eventId)}/logs/me`, { params });
