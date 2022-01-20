import servicesApi from "../../api/services.js";

export default {
    delimiters: ['{', '}'],
    data() {
        return {
            parentService: null,
            services: null,
            model: null,

        };
    },
    props: ['categorySlug', 'servicesSlugs', 'order'],
    template: `#selectServiceComponent`,
    async beforeCreate() {
        this.parentService = await servicesApi.getByIdOrSlug(this.$props.servicesSlugs[this.$props.servicesSlugs.length - 1]);
        if (this.parentService.children?.length  == 0) {
            this.$router.push({name: 'WhereSelect', params: this.$route.params});
        }          
    },
    methods: {
        async submit() {
            if (this.model == null) {
                alert('Выберите услугу');
                return;
            }
            this.loading = true;

            let slugs = Array.from(this.$props.servicesSlugs);

            slugs.push(this.model);

            await this.$store.dispatch('updateDraftedOrder', {
                id: this.$props.order.id,
                data: {
                    services: this.$props.servicesSlugs,
                },
            });

            let service = await servicesApi.getByIdOrSlug(this.model);
            let nextPage;
            if (service.children.length > 0) {
                nextPage = 'SelectService';
            } else {
                nextPage = 'WhereSelect';
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
    }
};
