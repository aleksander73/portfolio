const express = require('express');
const { cryptographyService, technologyService } = require('../services');
const { upload } = require('../middleware');

const router = express.Router();

router.get('/', async (req, res) => {
    const technologies = await technologyService.getTechnologies();
    res.send(technologies);
});

router.post('/add', cryptographyService.authorize, upload.single('icon'), async (req, res) => {
    try {
        const { name } = req.body;
        const icon = req.file.filename;
        await technologyService.addTechnology(name, icon);
        res.sendStatus(200);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
