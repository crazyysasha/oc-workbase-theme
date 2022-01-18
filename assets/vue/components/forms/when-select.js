import servicesApi from "../../api/services.js";

export default {
    delimiters: ['{', '}'],
    template: '#whenSelectComponent',
    data() {
        return {
            parentService: null,
            whenFrom: null,
            whenTo: null,

        }
    },
    props: ['servicesSlugs', 'categorySlug', 'order'],
    async beforeCreate() {
        this.parentService = await servicesApi.getByIdOrSlug(this.$props.servicesSlugs[this.$props.servicesSlugs.length - 1]);
    },
    methods: {
        async submit() {
            if (this.isOnline == false && this.atCustomer == false && this.atCustomer) {
                alert('Выберите хоть что то');
                return;
            }
            this.loading = true;

            let slugs = Array.from(this.$props.servicesSlugs);

            slugs.push(this.model);

            await this.$store.dispatch('updateDraftedOrder', {
                id: this.$props.order.id,
                data: {
                    is_online: this.isOnline,
                    at_executor: this.atExecutor,
                    at_customer: this.atCustomer,
                },
            });

            let nextPage;

            if (this.order.at_customer) {
                nextPage = 'SelectAddress';
            } else {
                nextPage = 'WhenSelect';
            }




            this.loading = false;

            this.$router.push({
                name: nextPage,
                params: {
                    categorySlug: this.$props.categorySlug,
                    servicesSlugs: slugs,
                }
            });
        }
    },
};