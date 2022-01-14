import store from "./store/index.js";
import router from "./router/index.js";

import App from "./app.js";



Vue.createApp(App)
    .use(store)
    .use(router)
    .mount('#form');