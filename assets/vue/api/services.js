export default {
    async get(params) {
        const { data } = (await axios.get('/api/crazy/freelancer/v1.0.1/services', {
            params: params,
        })).data;

        return data;
    },
    async getByIdOrSlug(idOrSlug) {
        return (await axios.get(`/api/crazy/freelancer/v1.0.1/services/${idOrSlug}`)).data;
    }
}; 