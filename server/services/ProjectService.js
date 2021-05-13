const { Project } = require('../models');
const { Database } = require('../database');

class ProjectService {
    async getProjects(filter) {
        return Database.getInstance().getCollection('projects', filter);
    }

    async addProject(name, description, features, githubRepo, technologies, technologyTag, pictures, ytVideoId, score) {
        const project = new Project(name, description, features, githubRepo, technologies, technologyTag, pictures, ytVideoId, score);
        Database.getInstance().postDocument('projects', project);
    }

    async editProject(_id, name, description, features, githubRepo, technologies, technologyTag, ytVideoId, score) {
        Database.getInstance().updateDocument('projects', _id, {
            name,
            description,
            features,
            githubRepo,
            technologies,
            technologyTag,
            ytVideoId,
            score
        });
    }
}

module.exports = Object.freeze(new ProjectService());
