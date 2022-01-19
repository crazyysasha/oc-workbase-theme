import servicesApi from "../../api/services.js";

export default {
    delimiters: ['{', '}'],
    template: '#whereSelectComponent',
    data() {
        return {
            parentService: null,
            isOnline: false,
            atExecutor: false,
            atCustomer: false,
        }
    },
    props: ['servicesSlugs', 'categorySlug', 'order'],
    async beforeCreate() {
        this.parentService = await servicesApi.getByIdOrSlug(this.$props.servicesSlugs[this.$props.servicesSlugs.length - 1]);
    },
    methods: {
        async submit() {
            if (this.isOnline == false && this.atCustomer == false && this.atExecutor == false) {
                alert('Выберите хоть что то');
                return;
            }
            this.loading = true;

            await this.$store.dispatch('updateDraftedOrder', {
                id: this.$props.order.id,
                data: {
                    is_online: this.isOnline,
                    at_executor: this.atExecutor,
                    at_customer: this.atCustomer,
                },
            });

            let order = this.$store.getters.draftedOrderByCategory(this.categorySlug);

            let nextPage;
            if (order.at_customer || order.at_customer == 1) {
                nextPage = 'SelectAddress';
            } else if (order.at_executor || order.at_executor == 1) {
                nextPage = 'SelectRegion';
            } else {
                nextPage = 'WhenSelect';
            }

            this.loading = false;

            this.$router.push({
                name: nextPage,
                params: {
                    categorySlug: this.$props.categorySlug,
                    servicesSlugs: this.servicesSlugs,
                }
            });
        }
    },
};