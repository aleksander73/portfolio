const express = require('express');
const { cryptographyService, linkService } = require('../services');

const router = express.Router();

router.get('/', async (req, res) => {
    const links = await linkService.getLinks();
    res.send(links);
});

router.post('/add', cryptographyService.authorize, async (req, res) => {
    try {
        const { name, url, logo, priority } = req.body;
        const link = await linkService.addLink(name, url, logo, priority);
        res.sendStatus(200).send(link);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.post('/edit', cryptographyService.authorize, async (req, res) => {
    try {
        const { _id, name, url, logo, priority } = req.body;
        const success = await linkService.editLink(_id, name, url, logo, priority);
        res.status(200).send({ success });
    } catch(error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
