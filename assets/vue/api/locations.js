export default {
    async getNested() {
        const { data } = await axios.get('/api/crazy/location/v1.0.1/locations');
        return data;
    }
};