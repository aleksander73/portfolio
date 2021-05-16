const express = require('express');
const { cryptographyService, projectService } = require('../services');
const { upload } = require('../middleware');

const router = express.Router();

router.get('/', async (req, res) => {
    const projects = await projectService.getProjects();
    res.send(projects);
});

router.post('/add', cryptographyService.authorize, upload.array('pictures'), async (req, res) => {
    try {
        const { name, description, features, highlights, githubRepo, technologies, technologyId, status, ytVideoId, score, color } = req.body;
        const pictures = req.files.map(file => file.filename);
        const project = await projectService.addProject(name, description, JSON.parse(features), JSON.parse(highlights), githubRepo, JSON.parse(technologies), technologyId, status, pictures, ytVideoId, score, color);
        res.status(200).send(project);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.post('/edit', cryptographyService.authorize, upload.array('uploadedPictures'), async (req, res) => {
    try {
        const { _id, name, description, features, highlights, githubRepo, technologies, technologyId, status, allPictures, deletedPictures, ytVideoId, score, color } = req.body;
        const uploadedPictures = req.files.map(file => file.filename);
        const success = await projectService.editProject(
            _id,
            name,
            description,
            JSON.parse(features),
            JSON.parse(highlights),
            githubRepo,
            JSON.parse(technologies),
            technologyId,
            status,
            JSON.parse(allPictures),
            JSON.parse(deletedPictures),
            uploadedPictures,
            ytVideoId,
            score,
            color
        );
        res.status(200).send({ success });
    } catch(error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
