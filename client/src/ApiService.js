import axios from 'axios';

const serverUrl = 'http://localhost:5000';

class ApiService {
    static async getProjects() {
        return axios.get(serverUrl + '/api/projects').then((res) => {
            return res.data;
        });
    }

    static async getTechnologies() {
        return axios.get(serverUrl + '/api/technologies').then((res) => {
            return res.data;
        });
    }
}

export default ApiService;
