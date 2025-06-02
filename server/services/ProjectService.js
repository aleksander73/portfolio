const { Project } = require('../models');
const { cache } = require('../cache');
const { Database } = require('../database');

class ProjectService {
    async getProjects(filter) {
        const cached = cache.get('projects');
        if(cached) {
            return cached;
        } else {
            const projects = await Database.getInstance().getCollection('projects', filter);
            cache.set('projects', projects);
            return projects;
        }
    }

    async getProjectByID(id) {
        const project = await Database.getInstance().getDocumentByID('projects', id);
        return project;
    }

    async addProject(name, description, features, highlights, githubRepo, technologies, technologyId, status, tags, pictures, ytVideoId, score, color) {
        const project = new Project(name, description, features, highlights, githubRepo, technologies, technologyId, status, tags, pictures, ytVideoId, score, color);
        const result = await Database.getInstance().postDocument('projects', project);
        cache.set('projects', await Database.getInstance().getCollection('projects'));
        return result.ops[0];
    }

    async editProject(_id, name, description, features, highlights, githubRepo, technologies, technologyId, status, tags, pictures, ytVideoId, score, color) {
        const { result } = await Database.getInstance().updateDocument('projects', _id, {
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
        });
        cache.set('projects', await Database.getInstance().getCollection('projects'));
        return Boolean(result.ok);
    }
}

module.exports = Object.freeze(new ProjectService());
