import orders from "../api/orders.js";

export default {
    createDraftedOrder: async ({ commit }, { category, services }) => {
        try {
            commit('setDraftedOrder', await orders.create({ category, services }));
        } catch (error) {

        }
    },
    checkDraftedOrder: ({ dispatch, state }, { category, services }) => {
        
        if (!(category in state.draftedOrders)) {
            return dispatch('createDraftedOrder', { category, services });
        }

    },

    getCategoriesInLocalStorage: ({ commit }) => {
    },
};