import axios from 'axios';

class ApiService {
    static async getProjects() {
        return axios.get('/api/projects').then((res) => {
            return res.data;
        });
    }

    static async getTechnologies() {
        return axios.get('/api/technologies').then((res) => {
            return res.data;
        });
    }
}

export default ApiService;
