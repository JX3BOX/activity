import Vue from "vue";
import Vuex from "vuex";
import { getBreadcrumb } from "@jx3box/jx3box-common/js/api_misc";
import { getLoverEvents, getLoverEvent, getLoverRelationNet, getMyJoinRecord } from "@/service/rank/lover";
import User from "@jx3box/jx3box-common/js/user";
import { uniqBy } from "lodash";

Vue.use(Vuex);

let events_loading = false;
let default_event_id_loading = false;
let lover_net_loading = false;
let join_record_loading = false;

let store = {
    state: {
        events: [],
        default_event_id: "",

        event_loading: false,
        event: "",
        slug: "",

        lover_net: "",
        join_record: "",
    },
    getters: {
        defaultEventSlug: (state) => {
            let event = state.events.find((item) => item.id === state.default_event_id);
            if (!event) {
                event = state.events[0]; // 如果没有找到默认活动，则返回第一个活动
            }
            return event ? event.slug : "";
        },
        currentEvent: (state) => {
            if (state.slug) {
                const event = state.events.find((item) => item.slug === state.slug);
            }
            return state.events.find((item) => item.slug === state.slug) || "";
        },
        currentEventId: (state, getters) => {
            return getters.currentEvent ? getters.currentEvent.id : "";
        },
    },
    mutations: {
        SET_DEFAULT_LOVER_ID: (state, ID) => {
            state.loverId = ID;
        },
        SET_SLUG: (state, slug) => {
            state.slug = slug;
        },
        SET_MY_JOIN: (state, data) => {
            state.info.my_join = data;
        },
        SET_EVENTS: (state, data) => {
            state.events = data;
        },
        SET_EVENT: (state, data) => {
            state.event = data;
        },
    },
    actions: {
        async loadEvents({ state, commit }) {
            if (state.events.length > 0 || events_loading) return; // 如果已经加载过，则不再加载
            events_loading = true;
            const resp = await getLoverEvents();
            const events = resp.data.data.list.sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
            });
            commit("SET_EVENTS", events);
            console.log("情缘活动列表初始化完成");
        },
        async loadDefaultEventId({ state, commit }) {
            if (state.default_event_id || default_event_id_loading) return; // 如果已经加载过，则不再加载
            default_event_id_loading = true;
            const res = await getBreadcrumb("event-lover-id");
            commit("SET_DEFAULT_LOVER_ID", res);
            console.log("默认活动加载完毕");
        },
        async loadEvent({ commit, state, getters }) {
            if (state.events_loading) return;
            if (state.event.slug == state.slug) return;
            if (!state.slug) state.slug = getters.defaultEventSlug; // 如果没有slug，则使用默认活动的slug
            if (!state.slug) return;

            state.event_loading = true;
            try {
                const res = await getLoverEvent(getters.currentEventId);
                commit("SET_EVENT", res.data.data);
                console.log("情缘活动加载完毕:", res.data.data.slug);
            } catch (error) {
                console.error("加载活动失败:", error);
            } finally {
                state.event_loading = false;
            }
        },
        async loadLoverRelationNet({ state }) {
            if (lover_net_loading || state.lover_net) return; // 如果已经加载过，则不再加载
            if (!User.isLogin()) return; // 未登录不查询
            lover_net_loading = true;
            const members_resp = await getLoverRelationNet();
            const info = members_resp.data?.data;
            info.members = uniqBy(info.members, "user_info.id"); // 去重
            state.lover_net = info;
            console.log("当前情缘关系加载完毕");
        },
        async loadJoinRecord({ state, getters }, { force } = {}) {
            if (!force) {
                if (!User.isLogin()) return; // 未登录不查询
                if (!getters.currentEventId) return; // 如果没有当前活动ID，则不查询
                if (join_record_loading) return; // 如果已经加载过，则不再加载
                if (state.join_record?.event_id == getters.currentEventId) return; // 如果当前活动的报名记录已经加载，则不再加载
            }
            join_record_loading = true;
            try {
                const join_record_resp = await getMyJoinRecord(getters.currentEventId);
                const join_record = join_record_resp.data?.data;
                if (!join_record.event_id) {
                    console.log("当前报名记录加载完毕: 未参赛");
                } else {
                    state.join_record = join_record;
                    console.log("当前报名记录加载完毕");
                }
            } catch (e) {
                console.error("加载报名记录失败:", e);
                state.join_record = ""; // 如果加载失败，清空当前报名记录
            } finally {
                join_record_loading = false;
            }
        },
    },
    modules: {},
};

export default new Vuex.Store(store);
