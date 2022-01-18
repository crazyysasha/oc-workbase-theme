export default {
    async getByIdOrSlug(idOrSlug) {
        const { data } = await axios.get(`/api/crazy/freelancer/v1.0.1/categories/${idOrSlug}`);
        return data;
    }
};
