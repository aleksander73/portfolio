import ApiService from './ApiService'

class Storage {
    static async initialize() {
        this.projects = await ApiService.getProjects();
        this.technologies = await ApiService.getTechnologies();
    }

    static getProjects() {
        return this.projects;
    }

    static getTechnologies() {
        return this.technologies;
    }
}

export default Storage;
