const axios = require('axios');

class GithubService {
    async getPublicProjects() {
        const { data } = await axios.get('https://api.github.com/users/aleksander73/repos');
        return data;
    }
}

module.exports = Object.freeze(new GithubService());
