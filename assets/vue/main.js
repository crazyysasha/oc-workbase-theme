import store from "./store/index.js";
import router from "./router/index.js";

import App from "./app.js";
import { setDataToLocalStorage } from "./utils/storage.js";

store.subscribe((mutation, state) => {
    for (const key in state) {
        if (Object.hasOwnProperty.call(state, key)) {
            const element = state[key];
            setDataToLocalStorage(key, element);
        }
    }
});

Vue.createApp(App)
    .use(store)
    .use(router)
    .mount('#form');