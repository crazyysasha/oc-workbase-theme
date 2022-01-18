export default {
    async create({ category, services }) {
        return (await axios.post('/api/crazy/freelancer/v1.0.1/orders', {
            category: category,
            services: services,
        })).data;
    },
    async update(id, data) {
        
        return (await axios.post(`/api/crazy/freelancer/v1.0.1/orders/${id}`, data)).data;
    }
}