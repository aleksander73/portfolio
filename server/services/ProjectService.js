const { Project } = require('../models');
const { Database } = require('../database');

class ProjectService {
    async getProjects(filter) {
        return Database.getInstance().getCollection('projects', filter);
    }

    async addProject(name, description, githubRepo, technologies, technologyTag, pictures, ytVideoId, score) {
        const project = new Project(name, description, githubRepo, technologies, technologyTag, pictures, ytVideoId, score);
        Database.getInstance().postDocument('projects', project);
    }
}

module.exports = Object.freeze(new ProjectService());
