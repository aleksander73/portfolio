import apiClient from '../api/ApiClient'

class Storage {
    constructor() {
        this.projects = [];
        this.technologies = [];
        this.links = [];
    }

    async initialize() {
        this.projects = await apiClient.getProjects();
        this.technologies = await apiClient.getTechnologies();
        this.links = await apiClient.getLinks();
    }
}

export default new Storage();
