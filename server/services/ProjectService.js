const { Project } = require('../models');
const { Database } = require('../database');
const fs =require('fs');

class ProjectService {
    async getProjects(filter) {
        return Database.getInstance().getCollection('projects', filter);
    }

    async addProject(name, description, features, githubRepo, technologies, technologyTag, pictures, ytVideoId, score) {
        const project = new Project(name, description, features, githubRepo, technologies, technologyTag, pictures, ytVideoId, score);
        Database.getInstance().postDocument('projects', project);
    }

    async editProject(_id, name, description, features, githubRepo, technologies, technologyTag, allPictures, deletedPictures, uploadedPictures, ytVideoId, score) {
        deletedPictures.forEach(picture => fs.unlinkSync(`${__dirname}/../uploads/${picture}`));
        Database.getInstance().updateDocument('projects', _id, {
            name,
            description,
            features,
            githubRepo,
            technologies,
            technologyTag,
            pictures: allPictures.diff(deletedPictures).concat(uploadedPictures),
            ytVideoId,
            score
        });
    }
}

module.exports = Object.freeze(new ProjectService());
