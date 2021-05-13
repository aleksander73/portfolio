import axios from 'axios';

class ApiClient {
    async getProjects() {
        const { data } = await axios.get('/api/projects');
        return data;
    }

    async addProject(name, description, features, githubRepo, technologies, technologyTag, pictures, ytVideoId, score) {
        try {
            const data = new FormData();
            data.append('name', name);
            data.append('description', description);
            data.append('features', JSON.stringify(features));
            data.append('githubRepo', githubRepo);
            data.append('technologies', JSON.stringify(technologies));
            data.append('technologyTag', technologyTag);
            pictures.forEach(picture => {
                data.append('pictures', picture);
            });
            data.append('ytVideoId', ytVideoId);
            data.append('score', score);
            const { status } = await axios.post('/api/projects/add', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return status === 200;
        } catch (error) {
            return false;
        }
    }

    async editProject(_id, name, description, features, githubRepo, technologies, technologyTag, ytVideoId, score) {
        try {
            const data = new FormData();
            data.append('_id', _id);
            data.append('name', name);
            data.append('description', description);
            data.append('features', JSON.stringify(features));
            data.append('githubRepo', githubRepo);
            data.append('technologies', JSON.stringify(technologies));
            data.append('technologyTag', technologyTag);
            data.append('ytVideoId', ytVideoId);
            data.append('score', score);
            const { status } = await axios.post('/api/projects/edit', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return status === 200;
        } catch (error) {
            return false;
        }
    }

    async getTechnologies() {
        const { data } = await axios.get('/api/technologies');
        return data;
    }

    async addTechnology(tag, name, icon) {
        try {
            const data = new FormData();
            data.append('tag', tag);
            data.append('name', name);
            data.append('icon', icon);
            const { status } = await axios.post('/api/technologies/add', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return status === 200;
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
            const data = new FormData();
            data.append('name', name);
            data.append('url', url);
            data.append('logo', logo);
            data.append('priority', priority);
            const { status } = await axios.post('/api/links/add', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return status === 200;
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
