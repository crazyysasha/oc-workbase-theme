export default {
    delimiters: ['{', '}'],
    template:'#exposeOrderComponent',
    props: ['servicesSlugs', 'categorySlug', 'order'],

    methods: {
        submit() {
            window.location.href = '/';
        }
    },
}