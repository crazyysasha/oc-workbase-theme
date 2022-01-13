
const SearchService = {
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
        async fetchCategory() {

            let res = await (await fetch(`/api/crazy/freelancer/v1.0.1/categories/${this.$props.categorySlug}`)).json();

            this.category = res;
            this.fetchExmpleServices();
        },
        async fetchExmpleServices() {
            let res = await (await fetch(`/api/crazy/freelancer/v1.0.1/services?category=${this.category.id}&root=1`)).json();
            this.serviceList = res.data;
        },
        async searchServicesFetch() {

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
    created() {
        this.fetchCategory();
        this.$watch('search', (val) => {
            this.searchServicesFetch();
        });
    },
    mounted() {
        console.log('mounted');
    },
};

const SelectService = {
    delimiters: ['{', '}'],
    data() {
        return {
            service: null,
        };
    },
    props: ['categorySlug', 'service'],
    template: `#selectServiceComponent`,
};
const aboutPage = {
    delimiters: ['{','}'],
    data() {
        return {
            isEditable: false,
        };
    },
};

const routes = [
    {
        name: 'searchService',
        path: '/vue/:categorySlug',
        component: SearchService,
        props: true,
    },
    {
        name: 'selectService',
        path: '/vue/:categorySlug/:service+',
        component: SelectService,
        props: true,
    },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const store = new Vuex.createStore({
    state: {
        draftedOrders: {},
    },

    mutations: {
    },
});

const Form = {
    delimiters: ['{', '}'],
    mounted() {
        console.log(this.$store.state.draftedOrders);
        console.log(this.$router.params);
    }
}

Vue.createApp(Form)
    .use(store)
    .use(router)
    .mount('#form');