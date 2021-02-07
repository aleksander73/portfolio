import ApiService from './ApiService'

class Storage {
    static async initialize() {
        this.projects = await ApiService.getProjects();
        this.technologies = await ApiService.getTechnologies();
        this.paragraphs = await ApiService.getParagraphs();
    }

    static getProjects() {
        return this.projects;
    }

    static getTechnologies() {
        return this.technologies;
    }

    static getParagraph(key) {
        return this.paragraphs.find(p => p.key === key).value;
    }
}

export default Storage;
