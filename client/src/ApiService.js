import axios from 'axios';

const serverUrl = 'http://localhost:5000';

class ApiService {
    static async getProjects() {
        axios.get(serverUrl + '/api/projects').then((res) => {
            console.log(res.data);
        });
    }
}

export default ApiService;
