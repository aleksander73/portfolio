const { Project } = require('../models');
const { Database } = require('../database');
const fs = require('fs');

class ProjectService {
    async getProjects(filter) {
        return await Database.getInstance().getCollection('projects', filter);
    }

    async addProject(name, description, features, highlights, githubRepo, technologies, technologyId, status, pictures, ytVideoId, score, color) {
        const project = new Project(name, description, features, highlights, githubRepo, technologies, technologyId, status, pictures, ytVideoId, score, color);
        const result = await Database.getInstance().postDocument('projects', project);
        return result.ops[0];
    }

    async editProject(_id, name, description, features, highlights, githubRepo, technologies, technologyId, status, allPictures, deletedPictures, uploadedPictures, ytVideoId, score, color) {
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
            pictures: allPictures.diff(deletedPictures).concat(uploadedPictures),
            ytVideoId,
            score,
            color
        });
        return Boolean(result.ok);
    }
}

module.exports = Object.freeze(new ProjectService());
