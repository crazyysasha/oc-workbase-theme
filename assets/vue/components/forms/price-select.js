import servicesApi from "../../api/services.js";

export default {
    delimiters: ['{', '}'],
    template: '#priceSelectComponent',
    data() {
        return {
            parentService: null,
            price: '',
            isChecked: false,
            paymentTpye: 'Per day',
            isActive: false,

        }
    },
    props: ['servicesSlugs', 'categorySlug', 'order'],
    async beforeCreate() {
        this.parentService = await servicesApi.getByIdOrSlug(this.$props.servicesSlugs[this.$props.servicesSlugs.length - 1]);
    },
    methods: {
        async submit() {

            this.loading = true;

            await this.$store.dispatch('updateDraftedOrder', {
                id: this.$props.order.id,
                data: {
                    price: this.price,
                },
            });

            let nextPage;
            nextPage = 'Expose';

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