const SearchService = {
    delimiters: ['{', '}'],
    props: ['category'],
    template: '#searchServiceComponent',
};

console.log('asd');
const SelectService = {
    delimiters: ['{', '}'],
    props: ['category', 'service'],
    template: `asd`,
};
const routes = [
    {
        path: '/new/:category/:service',
        component: SelectService,
        props: true,
    },
    {
        path: '/new/:category',
        component: SearchService,
        props: true,
    },
];
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
})
const Form = {
  delimiters: ['{', '}'],
  data() {
    return {
      counter: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.counter++
    }, 1000)
  }
}

const form = Vue.createApp(Form);

form.use(router);

form.mount('#form');