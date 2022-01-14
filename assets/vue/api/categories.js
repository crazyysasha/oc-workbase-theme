export async function getCategoryBySlug(slug) {
    return axios.get(`/api/crazy/freelancer/v1.0.1/categories/${slug}`);
}
