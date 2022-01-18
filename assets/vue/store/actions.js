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
    updateDraftedOrder: async ({commit}, {id, data}) => {
        try {
            commit('draftedOrder', await orders.update(id, data));
        } catch (error) {
            throw new Error(error);
        }
    },
    checkDraftedOrder: async ({ dispatch, state }, { category, services }) => {
        
        if (!(category in state.draftedOrders)) {
            return await dispatch('createDraftedOrder', { category, services });
        }

    },
    init: ({dispatch, state, commit}) => {
        let data = {draftedOrders: getDataFromLocalStorage('draftedOrders', {})};
        commit('initState', data);
    },
    getCategoriesInLocalStorage: ({ commit }) => {
    },
};