document.addEventListener('alpine:initializing', () => {
    Alpine.data('dropdown', (data = {}) => ({
        open: data?.open ?? false,

    }))
});
