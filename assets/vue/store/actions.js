import orders from "../api/orders.js";
import { getDataFromLocalStorage } from "../utils/storage.js";

export default {
    createDraftedOrder: async ({ commit }, { category, services }) => {
        try {
            commit('draftedOrder', await orders.create({ category, services }));
        } catch (error) {
            throw new Error(error);
        }
    },
    checkDraftedOrder: ({ dispatch, state }, { category, services }) => {
        
        if (!(category in state.draftedOrders)) {
            return dispatch('createDraftedOrder', { category, services });
        }

    },
    init: ({dispatch, state, commit}) => {
        let data = {draftedOrders: getDataFromLocalStorage('draftedOrders', {})};
        commit('initState', data);
    },
    getCategoriesInLocalStorage: ({ commit }) => {
    },
};