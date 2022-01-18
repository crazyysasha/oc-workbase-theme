import categoriesApi from "../../api/categories.js";
import servicesApi from "../../api/services.js";

export default {
    delimiters: ['{', '}'],
    props: ['categorySlug', 'formData', 'order'],
    template: '#searchServiceComponent',
    data() {
        return {
            service: null,
            search: '',
            category: null,
            windowHeight: window.innerHeight,
            serviceList: null,
            results: null,
            open: false,
            loading: false,
        };
    },
    async created() {
        this.category = await categoriesApi.getByIdOrSlug(this.categorySlug);
        this.serviceList = await servicesApi.get({ category: this.category.id, });
    },
    methods: {
        debouncedSearch: _.debounce(async function (data) {
            this.results = (await servicesApi.get(data));
        }, 500),
        searchHandler(e) {

            this.debouncedSearch({
                // category: this.category.id,
                search: e.target.value,
            });
        },
        setService(service) {
            this.search = service.name;
            this.service = service;
        },
        async submit() {
            if (this.service == null) {
                alert('Выберите услугу');
                return;
            }
            this.loading = true;
            await this.$store.dispatch('updateDraftedOrder', {
                id: this.$props.order.id,
                data: {
                    services: [this.service.slug],
                },
            });
            
            this.loading = false;

            this.$router.push(`/vue/${this.category.slug}/${this.service.slug}`);
        }
    },
    mounted() {
        if (this.$props.order.services[0]) {
            console.log(this.$props.order.services[0]);
            this.setService(this.$props.order.services[0]);

        }

    },
};
