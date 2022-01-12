const SearchService = {
    delimiters: ['{', '}'],
    props: ['category'],
    template: '#searchServiceComponent',
};

const SelectService = {
    delimiters: ['{', '}'],
    props: ['category', 'service'],
    template: `#selectServiceComponent`,
};
const routes = [
    {
        path: '/vue/:category',
        component: SearchService,
        props: true,
    },
    {
        path: '/vue/:category/:service',
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

const form = Vue.createApp(Form);

form.use(router);

form.mount('#form');