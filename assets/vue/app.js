import { getDataFromLocalStorage, setDataToLocalStorage } from "./utils/storage.js";

export default {
    delimiters: ['{', '}'],
    template: '<router-view></router-view>',
    async created() {
        this.$store.commit('setDraftedOrders', getDataFromLocalStorage('draftedOrders', {}));
    },
    mounted() { },
    computed: {
        draftedOrders() {
            return this.$store.getters.draftedOrders;
        }
    },
    watch: {
        draftedOrders(value) {
            console.log(value);
            setDataToLocalStorage('draftedOrders', value);
        },
    }
};