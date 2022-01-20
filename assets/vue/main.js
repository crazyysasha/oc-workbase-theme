import store from "./store/index.js";
import router from "./router/index.js";

import App from "./app.js";
import { setDataToLocalStorage } from "./utils/storage.js";
import services from "./api/services.js";



/* TODO: я хз, временно работает, но нужно написать по человечи */
store.subscribe((mutation, state) => {

    setDataToLocalStorage('draftedOrders', state.draftedOrders || {});
});

console.log('asd');


Vue.createApp(App)
    .use(store)
    .use(router)
    .mount('#form');