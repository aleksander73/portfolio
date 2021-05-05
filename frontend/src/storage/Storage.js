import apiClient from '../api/ApiClient'

class Storage {
    constructor() {
        this.projects = [];
        this.technologies = [];
    }

    async initialize() {
        this.projects = await apiClient.getProjects();
        this.technologies = await apiClient.getTechnologies();
    }
}

export default new Storage();
