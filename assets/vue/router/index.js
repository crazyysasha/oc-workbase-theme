import {
    ExposeOrder,
    PriceSelect,
    SearchService, 
    SelectAddress,
    SelectRegion,
    SelectService, 
    WhenSelect,
    WhereSelect,
    MakeOrderForm, 
} from '../components/index.js';


export default VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {
            name: 'MakeOrderForm',
            path: '/',
            component: MakeOrderForm,
            children: [
                {
                    name: "SearchService",
                    path: ':categorySlug',
                    component: SearchService,
                    props: true,
                },
                {
                    name: 'SelectService',
                    path: ':categorySlug/:servicesSlugs+',
                    component: SelectService,
                    props: true,
                },
                {
                    name: 'WhereSelect',
                    path: ':categorySlug/:servicesSlugs+/where',
                    component: WhereSelect,
                    props: true,
                },
                {
                    name: 'SelectAddress',
                    path: ':categorySlug/:servicesSlugs+/address',
                    component: SelectAddress,
                    props: true,
                },
                {
                    name: 'SelectRegion',
                    path: ':categorySlug/:servicesSlugs+/region',
                    component: SelectRegion,
                    props: true,
                },
                {
                    name: 'WhenSelect',
                    path: ':categorySlug/:servicesSlugs+/when',
                    component: WhenSelect,
                    props: true,
                },
                {
                    name: 'Price',
                    path: ':categorySlug/:servicesSlugs+/price',
                    component: PriceSelect,
                    props: true,
                },
                {
                    name: 'Expose',
                    path: ':categorySlug/:servicesSlugs+/expose',
                    component: ExposeOrder,
                    props: true,
                },
            ],
        },
    ],
});
