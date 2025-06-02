import axios from 'axios';

class ApiClient {
    async getProjects() {
        const { data } = await axios.get('/api/projects');
        return data;
    }

    async getProjectByID(id) {
        if(!id) {
            return null;
        }

        const { data } = await axios.get(`/api/projects/id?id=${id}`);
        return data;
    }

    async addProject(name, description, features, highlights, githubRepo, technologies, technologyId, status, tags, pictures, ytVideoId, score, color) {
        try {
            const data = {
                name,
                description,
                features,
                highlights,
                githubRepo,
                technologies,
                technologyId,
                status,
                tags,
                pictures,
                ytVideoId,
                score,
                color
            };

            const res = await axios.post('/api/projects/add', data);
            return res.data;
        } catch (error) {
            return null;
        }
    }

    async editProject(_id, name, description, features, highlights, githubRepo, technologies, technologyId, status, tags, pictures, ytVideoId, score, color) {
        try {
            const data = {
                _id,
                name,
                description,
                features,
                highlights,
                githubRepo,
                technologies,
                technologyId,
                status,
                tags,
                pictures,
                ytVideoId,
                score,
                color
            };

            const res = await axios.post('/api/projects/edit', data);
            return res.data.success
        } catch (error) {
            return false;
        }
    }

    async getGithubRepos() {
        const { data } = await axios.get('/api/projects/github');
        return data;
    }

    async getTechnologies() {
        const { data } = await axios.get('/api/technologies');
        return data;
    }

    async getTechnologyByID(id) {
        if(!id) {
            return null;
        }
        
        const { data } = await axios.get(`/api/technologies/id?id=${id}`);
        return data;
    }

    async addTechnology(name, icon) {
        try {
            const data = {
                name,
                icon
            };
            const res = await axios.post('/api/technologies/add', data);
            return res.data;
        } catch (error) {
            return null;
        }
    }

    async editTechnology(_id, name, icon) {
        try {
            const data = {
                _id,
                name,
                icon
            };

            const res = await axios.post('/api/technologies/edit', data);
            return res.data.success;
        } catch (error) {
            return false;
        }
    }

    async getLinks() {
        const { data } = await axios.get('/api/links');
        return data;
    }

    async addLink(name, url, logo, priority) {
        try {
            const data = {
                name,
                url,
                logo,
                priority
            };
            const { status } = await axios.post('/api/links/add', data);
            return status === 200;
        } catch (error) {
            return false;
        }
    }

    async editLink(_id, name, url, logo, priority) {
        try {
            const data = {
                _id,
                name,
                url,
                logo,
                priority
            };
            const res = await axios.post('/api/links/edit', data);
            return res.data.success;
        } catch (error) {
            return false;
        }
    }

    async loginUser(username, password) {
        try {
            const { status } = await axios.post('/api/user/login', { username, password });
            return status === 200;
        } catch (error) {
            return false;
        }
    }

    async logoutUser() {
        const { status } = await axios.post('/api/user/logout');
        return status;
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
