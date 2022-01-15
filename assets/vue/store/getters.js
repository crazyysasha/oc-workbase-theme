export default {
    draftedOrderByCategory: state => category => {
        return state.draftedOrders[category];
    },
    draftedOrders: state => state.draftedOrders,
    categoryByIdOrSlug: state => idOrSlug => {
        return state.categories.find(element => {
            return element.id == idOrSlug || element.slug == idOrSlug;
        });
    }
};