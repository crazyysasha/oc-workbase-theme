
document.addEventListener('alpine:initializing', () => {
    Alpine.data('brandsList', (data = {}) => ({
        url: data.url,
        brands: [],
        loading: true,
        init() {

        }
    }))
});