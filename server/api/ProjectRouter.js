const express = require('express');
const { cryptographyService, githubService, projectService } = require('../services');
const { upload } = require('../middleware');

const router = express.Router();

router.get('/', async (req, res) => {
    const projects = await projectService.getProjects();
    res.send(projects);
});

router.post('/add', cryptographyService.authorize, upload.array('pictures'), async (req, res) => {
    try {
        const { name, description, features, highlights, githubRepo, technologies, technologyId, status, tags, ytVideoId, score, color } = req.body;
        const pictures = req.files.map(file => file.filename);
        const project = await projectService.addProject(name, description, JSON.parse(features), JSON.parse(highlights), githubRepo, JSON.parse(technologies), technologyId, status, JSON.parse(tags), pictures, ytVideoId, score, color);
        res.status(200).send(project);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.post('/edit', cryptographyService.authorize, upload.array('uploadedPictures'), async (req, res) => {
    try {
        const { _id, name, description, features, highlights, githubRepo, technologies, technologyId, status, tags, allPictures, deletedPictures, ytVideoId, score, color } = req.body;
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
            JSON.parse(tags),
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

router.get('/github', async (req, res) => {
    const githubRepos = await githubService.getPublicProjects();
    res.send(githubRepos);
});

module.exports = router;
