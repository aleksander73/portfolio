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
        await projectService.addProject(name, description, JSON.parse(features), JSON.parse(highlights), githubRepo, JSON.parse(technologies), technologyId, status, pictures, ytVideoId, score, color);
        res.sendStatus(200);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.post('/edit', cryptographyService.authorize, upload.array('uploadedPictures'), async (req, res) => {
    try {
        const { _id, name, description, features, highlights, githubRepo, technologies, technologyId, status, allPictures, deletedPictures, ytVideoId, score, color } = req.body;
        const uploadedPictures = req.files.map(file => file.filename);
        await projectService.editProject(
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
        res.sendStatus(200);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
