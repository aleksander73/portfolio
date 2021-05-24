import apiClient from '../api/ApiClient'

class Storage {
    constructor() {
        this.projects = [];
        this.technologies = [];
        this.links = [];
        this.githubRepos = [];
    }

    async initialize() {
        this.projects = await apiClient.getProjects();
        this.technologies = await apiClient.getTechnologies();
        this.links = await apiClient.getLinks();
        this.githubRepos = await apiClient.getGithubRepos();
    }
}

export default new Storage();
