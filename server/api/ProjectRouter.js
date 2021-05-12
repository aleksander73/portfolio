const express = require('express');
const { projectService } = require('../services');
const { upload } = require('../middleware');

const router = express.Router();

router.get('/', async (req, res) => {
    const projects = await projectService.getProjects();
    res.send(projects);
});

router.post('/add', upload.array('pictures'), async (req, res) => {
    try {
        const { name, description, githubRepo, technologies, technologyTag, ytVideoId, score } = req.body;
        const pictures = req.files.map(file => file.filename);
        await projectService.addProject(name, description, githubRepo, JSON.parse(technologies), technologyTag, pictures, ytVideoId, score);
        res.sendStatus(200);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
