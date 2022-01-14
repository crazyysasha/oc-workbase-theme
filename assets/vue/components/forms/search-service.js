export default {
    delimiters: ['{', '}'],
    props: ['categorySlug'],
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
        };
    },
    methods: {
        async fetchExmpleServices() {
            let res = await (await fetch(`/api/crazy/freelancer/v1.0.1/services?category=${this.category.id}&root=1`)).json();
            this.serviceList = res.data;
        },
        // debouncedSearch: debounce(async (params) => {
        //     let res = await (await fetch(`/api/crazy/freelancer/v1.0.1/services?category=${params.category}&search=${this.search}`)).json();
        //     this.results = res.data;
        // }, 500),
        async searchServicesFetch() {
            // this.debouncedSearch();
            let res = await (await fetch(`/api/crazy/freelancer/v1.0.1/services?category=${this.category.id}&search=${this.search}`)).json();
            this.results = res.data;
        },
        setService(service) {
            this.service = service;
            this.search = service.name;
        },
        submit() {
            if (this.service == null) {
                alert('Выберите услугу');
                return;
            }
            this.$router.push(`/vue/${this.category.slug}/${this.service.slug}`);
        }
    },
    async beforeCreate() {
        try {
            this.$store.dispatch('checkDraftedOrder', {
                category: this.$route.params.categorySlug
            });

        } catch (error) {

        }

    },
    mounted() {
        this.search = this.$store
            .getters.categoryByIdOrSlug[this.$props.categorySlug]
            ?.services?.get
            ?.name;
    },
};
