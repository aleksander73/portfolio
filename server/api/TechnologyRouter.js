const express = require('express');
const { cryptographyService, technologyService } = require('../services');

const router = express.Router();

router.get('/', async (req, res) => {
    const technologies = await technologyService.getTechnologies();
    res.send(technologies);
});

router.post('/add', cryptographyService.authorize, async (req, res) => {
    try {
        const { name, icon } = req.body;
        const technology = await technologyService.addTechnology(name, icon);
        res.status(200).send(technology);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.post('/edit', cryptographyService.authorize, async (req, res) => {
    try {
        const { _id, name, icon } = req.body;
        const success = await technologyService.editTechnology(_id, name, icon);
        res.status(200).send({ success });
    } catch(error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
