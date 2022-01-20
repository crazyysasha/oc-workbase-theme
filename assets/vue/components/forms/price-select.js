import servicesApi from "../../api/services.js";

export default {
    delimiters: ['{', '}'],
    template: '#priceSelectComponent',
    data() {
        return {
            parentService: null,
            price: '',
            priceFrom: '',
            priceUpTo: '',
            isChecked: false,
            units: { 1: 'За час', 24: 'За сутки' },
            unit: 1,
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
                    price_from: this.priceFrom,
                    price_up_to: this.priceUpTo,
                    unit: this.unit,
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