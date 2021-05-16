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
        const technology = await technologyService.addTechnology(name, icon);
        res.status(200).send(technology);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.post('/edit', cryptographyService.authorize, upload.single('uploadedIcon'), async (req, res) => {
    try {
        const { _id, name, icon, deletedIcon } = req.body;
        const uploadedIcon = req.file ? req.file.filename : '';
        const success = await technologyService.editTechnology(_id, name, icon, deletedIcon, uploadedIcon);
        res.status(200).send({ success });
    } catch(error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
