import servicesApi from "../../api/services.js";

export default {
    delimiters: ['{', '}'],
    data() {
        return {
            parentService: null,
            services: null,
            model: null,
            name: '',
        };
    },
    props: ['categorySlug', 'servicesSlugs', 'order'],
    template: `#selectServiceComponent`,
    async beforeCreate() {
        this.parentService = await servicesApi.getByIdOrSlug(this.$props.servicesSlugs[this.$props.servicesSlugs.length - 1]);
        if (this.parentService.children?.length == 0) {
            this.$router.push({ name: 'WhereSelect', params: this.$route.params });
        }
    },
    watch: {
        // model(value) {
        //     if (value == 'entry') {
        //         this.$refs.entryField.focus();
        //     }

        // }
    },
    methods: {
        async submit() {
            if (this.model == null) {
                alert('Выберите услугу');
                return;
            } else if (this.model == 'entry' && this.name.length == 0) {
                alert('Введите название вашей услуги');
                return;
            }
            this.loading = true;

            let slugs = Array.from(this.$props.servicesSlugs);
            if (this.model != 'entry') {
                slugs.push(this.model);
            }

            await this.$store.dispatch('updateDraftedOrder', {
                id: this.$props.order.id,
                data: {
                    services: slugs,
                    name: this.name,
                },
            });
            let service;
            if (this.model != 'entry') {
                this.service = await servicesApi.getByIdOrSlug(this.model);
            }

            let nextPage;

            if (service?.children.length > 0) {
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
