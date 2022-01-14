import mutations from './mutations.js';
import getters from './getters.js';
import actions from './actions.js';
import state from './state.js';


export default Vuex.createStore({
    state,
    mutations,
    actions,
    getters,
});
