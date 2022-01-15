export default {
    delimiters: ['{', '}'],
    data() {
        return {
            service: null,
        };
    },
    props: ['categorySlug', 'service'],
    template: `#selectServiceComponent`,
};
