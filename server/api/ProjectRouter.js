const express = require('express');
const { cryptographyService, githubService, projectService } = require('../services');

const router = express.Router();

router.get('/', async (req, res) => {
    const projects = await projectService.getProjects();
    res.send(projects);
});

router.post('/add', cryptographyService.authorize, async (req, res) => {
    try {
        const { name, description, features, highlights, githubRepo, technologies, technologyId, status, tags, pictures, ytVideoId, score, color } = req.body;
        
        const project = await projectService.addProject(name, description, features, highlights, githubRepo, technologies, technologyId, status, tags, pictures, ytVideoId, score, color);
        res.status(200).send(project);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.post('/edit', cryptographyService.authorize, async (req, res) => {
    try {
        const { _id, name, description, features, highlights, githubRepo, technologies, technologyId, status, tags, pictures, ytVideoId, score, color } = req.body;
        const success = await projectService.editProject(
            _id,
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
