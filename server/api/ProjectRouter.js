const express = require('express');
const { projectService } = require('../services');
const { upload } = require('../middleware');

const router = express.Router();

router.get('/', async (req, res) => {
    const projects = await projectService.getProjects();
    res.send(projects);
});

router.post('/add', upload.array('pictures'), async (req, res) => {
    const { name, description, githubRepo, technologies, technologyTag, ytVideoId } = req.body;
    await projectService.addProject(name, description, githubRepo, JSON.parse(technologies), technologyTag, req.files.map(file => file.filename), ytVideoId);
    res.status(200).send();
});

module.exports = router;
