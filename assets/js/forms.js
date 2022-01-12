
const SearchService = {
    delimiters: ['{', '}'],
    props: ['categorySlug'],
    template: '#searchServiceComponent',
    data() {
        return {
            search: '',
            category: null,
            windowHeight: window.innerHeight,
            serviceList: null,
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
            this.serviceList =  res.data;
        }
        
    },
    created() {
        this.fetchCategory();
        this.$watch('search', (val) => {
            
        });
    },
    mounted() {
        console.log('mounted');
    },
};

const SelectService = {
    delimiters: ['{', '}'],
    props: ['categorySlug', 'service'],
    template: `#selectServiceComponent`,
};


const routes = [
    {
        path: '/vue/:categorySlug',
        component: SearchService,
        props: true,
    },
    {
        path: '/vue/:categorySlug/:service+',
        component: SelectService,
        props: true,
    },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})
const Form = {
    delimiters: ['{', '}'],
}

Vue.createApp(Form).use(router).mount('#form');