export default {
    draftedOrders: function (state, payload) {
        state.draftedOrders = payload;
    },
    draftedOrder: (state, payload) => {
        state.draftedOrders[payload.category.slug] = payload;
    },
    initState: function(state, payload) {
        for (const key in payload) {
            state[key] = payload[key];
        }
    }
};