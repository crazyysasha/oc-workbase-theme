import servicesApi from "../../api/services.js";

export default {
    delimiters: ['{', '}'],
    template: '#whenSelectComponent',
    data() {
        return {
            parentService: null,
            started_at: '',
            ended_at: '',

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
                    started_at: this.started_at,
                    ended_at: this.ended_at,
                },
            });

            let nextPage;
            nextPage = 'Price';
            
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