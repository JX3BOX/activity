import { $team, $cms } from "@jx3box/jx3box-common/js/https.js";
function getTop100(params,event_id = 1) {
    return $team().get(`/api/team/race/achieve/${params.achieve_id}/top100`, {
        params: {
            server: params.server,
            event_id
        },
    });
}

function getTopTotal(achieve_arr) {
    return $team().get(`/api/team/race/achieve/finish/process`, {
        params: {
            ids: achieve_arr,
            // _no_cache
        },
    });
}

function getMountDpsRace(achieveId, query) {
    return $team().get(`/api/team/achieve/${achieveId}/mount/top`, {
        params: query
    })
}

// 获取综合排名
function getMixRank(params){
    return $team().get(`/api/team/achieve-mix/top`, {
        params,
    })
}

/**
 * 获取百强团队新秀
 * @param {number} event_id 活动id
 * @param {*} params
 * @param {*} params._no_cache 是否缓存
 */
function getEventNewbie(event_id, params) {
    return $team().get(`/api/team/race/events/${event_id}/youngster`, {
        params: params,
    });
}

/**
 * 获取成就绑定boss列表
 * @param {*} params
 */
function getBossAid(params) {
    return $cms().get(`/api/cms/team/boss_aid`, {
        params: params,
    });
}


export {
    getTop100,
    getTopTotal,
    getMountDpsRace,
    getMixRank,
    getEventNewbie,
    getBossAid
};
