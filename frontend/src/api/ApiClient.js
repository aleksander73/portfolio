import axios from 'axios';

class ApiClient {
    async getProjects() {
        const { data } = await axios.get('/api/projects');
        return data;
    }

    async addProject(name, description, features, highlights, githubRepo, technologies, technologyTag, status, tags, pictures, ytVideoId, score, color) {
        try {
            const data = new FormData();
            data.append('name', name);
            data.append('description', description);
            data.append('features', JSON.stringify(features));
            data.append('highlights', JSON.stringify(highlights));
            data.append('githubRepo', githubRepo);
            data.append('technologies', JSON.stringify(technologies));
            data.append('technologyTag', technologyTag);
            data.append('status', status);
            data.append('tags', JSON.stringify(tags));
            pictures.forEach(picture => {
                data.append('pictures', picture);
            });
            data.append('ytVideoId', ytVideoId);
            data.append('score', score);
            data.append('color', color);
            const res = await axios.post('/api/projects/add', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return res.data;
        } catch (error) {
            return null;
        }
    }

    async editProject(_id, name, description, features, highlights, githubRepo, technologies, technologyId, status, tags, allPictures, deletedPictures, uploadedPictures, ytVideoId, score, color) {
        try {
            const data = new FormData();
            data.append('_id', _id);
            data.append('name', name);
            data.append('description', description);
            data.append('features', JSON.stringify(features));
            data.append('highlights', JSON.stringify(highlights));
            data.append('githubRepo', githubRepo);
            data.append('technologies', JSON.stringify(technologies));
            data.append('technologyId', technologyId);
            data.append('status', status);
            data.append('tags', JSON.stringify(tags));
            data.append('allPictures', JSON.stringify(allPictures));
            data.append('deletedPictures', JSON.stringify(deletedPictures));
            uploadedPictures.forEach(picture => {
                data.append('uploadedPictures', picture);
            });
            data.append('ytVideoId', ytVideoId);
            data.append('score', score);
            data.append('color', color);
            const res = await axios.post('/api/projects/edit', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
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

    async addTechnology(name, icon) {
        try {
            const data = new FormData();
            data.append('name', name);
            data.append('icon', icon);
            const res = await axios.post('/api/technologies/add', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return res.data;
        } catch (error) {
            return null;
        }
    }

    async editTechnology(_id, name, icon, deletedIcon, uploadedIcon) {
        try {
            const data = new FormData();
            data.append('_id', _id);
            data.append('name', name);
            data.append('icon', icon);
            data.append('deletedIcon', deletedIcon);
            data.append('uploadedIcon', uploadedIcon);
            const res = await axios.post('/api/technologies/edit', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
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

    async editLink(_id, name, url, logo, deletedLogo, uploadedLogo, priority) {
        try {
            const data = new FormData();
            data.append('_id', _id);
            data.append('name', name);
            data.append('url', url);
            data.append('logo', logo);
            data.append('deletedLogo', deletedLogo);
            data.append('uploadedLogo', uploadedLogo);
            data.append('priority', priority);
            const res = await axios.post('/api/links/edit', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
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
