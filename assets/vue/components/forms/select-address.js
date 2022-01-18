import servicesApi from "../../api/services.js";

export default {
    delimiters: ['{', '}'],
    template: '#selectAddressComponent',
    data() {
        return {
            parentService: null,
            address: '',
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



            await this.$store.dispatch('updateDraftedOrder', {
                id: this.$props.order.id,
                data: {
                    address: this.address
                },
            });

            let nextPage;

            if (this.order.at_executor) {
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