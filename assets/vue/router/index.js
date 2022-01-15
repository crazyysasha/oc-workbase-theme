import {SearchService, SelectService }  from '../components/index.js';


export default VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {
            name: 'searchService',
            path: '/vue/:categorySlug',
            component: SearchService,
            props: true,
        },
        {
            name: 'selectService',
            path: '/vue/:categorySlug/:servicesSlugs+',
            component: SelectService,
            props: true,
        },
    ],
});
