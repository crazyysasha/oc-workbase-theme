export default {
    setDraftedOrders: function (state, payload) {
        state.draftedOrders = payload;
    },
    setDraftedOrder: (state, payload) => {
        state.draftedOrders[payload.category.slug] = payload;
    }
};