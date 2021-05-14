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
        const { name, description, features, githubRepo, technologies, technologyTag, ytVideoId, score } = req.body;
        const pictures = req.files.map(file => file.filename);
        await projectService.addProject(name, description, JSON.parse(features), githubRepo, JSON.parse(technologies), technologyTag, pictures, ytVideoId, score);
        res.sendStatus(200);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.post('/edit', upload.array('uploadedPictures'), async (req, res) => {
    try {
        const { _id, name, description, features, githubRepo, technologies, technologyTag, allPictures, deletedPictures, ytVideoId, score } = req.body;
        const uploadedPictures = req.files.map(file => file.filename);
        await projectService.editProject(
            _id,
            name,
            description,
            JSON.parse(features),
            githubRepo,
            JSON.parse(technologies),
            technologyTag,
            JSON.parse(allPictures),
            JSON.parse(deletedPictures),
            uploadedPictures,
            ytVideoId,
            score
        );
        res.sendStatus(200);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
