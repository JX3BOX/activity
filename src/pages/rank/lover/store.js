import Vue from "vue";
import Vuex from "vuex";
import { getBreadcrumb } from "@jx3box/jx3box-common/js/api_misc";
import { getLoverEvent, getMyJoinLover } from "@/service/rank/lover";

Vue.use(Vuex);

let store = {
    state: {
        loverId: "",
        info: {},
        my_join: {},
    },
    getters: {},
    mutations: {
        SET_LOVER_ID: (state, ID) => {
            state.loverId = ID;
        },
        SET_LOVER_EVENT: (state, data) => {
            state.info = data;
        },
        SET_MY_JOIN: (state, data) => {
            state.info.my_join = data;
        },
    },
    actions: {
        async loadLoverId({ commit, dispatch }) {
            try {
                const res = await getBreadcrumb("event-lover-id");
                commit("SET_LOVER_ID", res);
                dispatch("loadLoverEvent");
            } catch (error) {
                console.log(error);
            }
        },
        async loadLoverEvent({ commit, state }) {
            try {
                const res = await (state.loverId && getLoverEvent(state.loverId));
                commit("SET_LOVER_EVENT", res?.data?.data || {});
            } catch (error) {
                console.log(error);
            }
        },
        async getMyEventStatus({ commit, state }) {
            try {
                const res = await (state.loverId && getMyJoinLover(state.loverId));
                commit("SET_MY_JOIN", res?.data?.data || {});
            } catch (error) {
                console.log(error);
            }
        },
    },
    modules: {},
};

export default new Vuex.Store(store);
