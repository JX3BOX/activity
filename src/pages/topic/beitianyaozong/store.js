import { createStore } from "vuex";

let store = {
    state: {
        client: location.href.includes("origin") ? "origin" : "std",
    },
    mutations: {
        switchClient: function(state, val) {
            state.client = val || "std";
        },
    },
    getters: {},
    actions: {},
    modules: {},
};

export default createStore(store);
