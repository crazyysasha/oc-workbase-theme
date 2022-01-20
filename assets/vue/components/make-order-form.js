import store from "../store/index.js";

export default {
    template: "#makeOrderFormComponent",
    data() {
        return {
            loading: true,
            order: null,
        };
    },
    created() {
        this.order = this.$store.getters.draftedOrderByCategory(this.$route.params.categorySlug);
    },
    async beforeRouteEnter(to, from, next) {

        store.dispatch('checkDraftedOrder', {
            category: to.params.categorySlug,
            services: to.params.servicesSlugs,
        }).then(next(vm => vm.loading = false));
    },
    methods: {
        submitForm() {
            this.$store.dispatch('updateOrder', {
                category: this.$route.params.categorySlug,
                formData: this.formData,
            });
        }
    }
};