import { getDataFromLocalStorage, setDataToLocalStorage } from "./utils/storage.js";

export default {
    delimiters: ['{', '}'],
    template: '<router-view></router-view>',
    async created() {
        this.$store.dispatch('init');
    },
    mounted() { },
    computed: {

    },
    watch: {
    }
};