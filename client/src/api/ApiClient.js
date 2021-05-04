import axios from 'axios';

class ApiClient {
    async getProjects() {
        const { data } = await axios.get('/api/projects');
        return data;
    }

    async getTechnologies() {
        const { data } = await axios.get('/api/technologies');
        return data;
    }

    async loginUser(username, password) {
        try {
            const { status } = await axios.post('/api/user/login', { username, password });
            return status === 200;
        } catch (error) {
            return false;
        }
    }

    async getLoggedInUser() {
        try {
            const { data } = await axios.get('/api/user/whoami');
            return data.user;
        } catch(error) {
            return null;
        }
    }
}

export default Object.freeze(new ApiClient());
