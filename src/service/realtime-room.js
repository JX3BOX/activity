import { $next } from "@jx3box/jx3box-common/js/api.js";

const domain = process.env.VUE_APP_REALTIME_API || "https://mqtt.jx3box.com";
const request = (options = {}) =>
    $next({ domain, serviceKey: "realtime", proxy: false, ...options });

export const getEventChatGroupId = (eventId) => `L${String(eventId).replace(/0/g, "A")}`;

export const joinEventChatGroup = (eventId, userId) =>
    request({ mute: true }).post("/api/client/group/join", {
        appid: "lover",
        group_id: getEventChatGroupId(eventId),
        userid: String(userId),
        remark: "进入赛事直播页",
    });

export const getEventChatHistory = (eventId, params) =>
    request({ mute: true }).get("/api/client/message/history", {
        params: { appid: "lover", group_id: getEventChatGroupId(eventId), ...params },
    });

export const isAlreadyGroupMemberError = (error) => {
    const data = error?.data || error?.response?.data;
    return Number(data?.code) === 400 && data?.msg === "已是群成员";
};
