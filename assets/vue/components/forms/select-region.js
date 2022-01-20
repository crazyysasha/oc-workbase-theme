import locationsApi from "../../api/locations.js";
import servicesApi from "../../api/services.js";

export default {
    delimiters: ['{', '}'],
    template: '#selectRegionComponent',
    data() {
        return {
            loading: false,
            parentService: null,
            locations: null,
            selected: [],
            isActive: false
        }
    },
    props: ['servicesSlugs', 'categorySlug', 'order'],
    async beforeCreate() {
        this.parentService = await servicesApi.getByIdOrSlug(this.$props.servicesSlugs[this.$props.servicesSlugs.length - 1]);
    },
    async mounted() {
        this.locations = await locationsApi.getNested();
    },
    methods: {
        async submit() {
            if (this.selected.length == 0) {
                alert('Выберите хоть что то');
                return;
            }
            this.loading = true;

            await this.$store.dispatch('updateDraftedOrder', {
                id: this.$props.order.id,
                data: {
                    exit_locations: this.selected,
                },
            });

            let nextPage;

            nextPage = 'WhenSelect';

            this.loading = false;

            this.$router.push({
                name: nextPage,
                params: {
                    categorySlug: this.$props.categorySlug,
                    servicesSlugs: this.servicesSlugs,
                }
            });
        }
    },
};