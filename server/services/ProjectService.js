const { Project } = require('../models');
const { cache } = require('../cache');
const { Database } = require('../database');
const fs = require('fs');

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

    async addProject(name, description, features, highlights, githubRepo, technologies, technologyId, status, tags, pictures, ytVideoId, score, color) {
        const project = new Project(name, description, features, highlights, githubRepo, technologies, technologyId, status, tags, pictures, ytVideoId, score, color);
        const result = await Database.getInstance().postDocument('projects', project);
        cache.set('projects', await Database.getInstance().getCollection('projects'));
        return result.ops[0];
    }

    async editProject(_id, name, description, features, highlights, githubRepo, technologies, technologyId, status, tags, allPictures, deletedPictures, uploadedPictures, ytVideoId, score, color) {
        deletedPictures.forEach(picture => fs.unlinkSync(`${__dirname}/../uploads/${picture}`));
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
            pictures: allPictures.diff(deletedPictures).concat(uploadedPictures),
            ytVideoId,
            score,
            color
        });
        cache.set('projects', await Database.getInstance().getCollection('projects'));
        return Boolean(result.ok);
    }
}

module.exports = Object.freeze(new ProjectService());
