const express = require('express');
const { cryptographyService, linkService } = require('../services');
const { upload } = require('../middleware');

const router = express.Router();

router.get('/', async (req, res) => {
    const links = await linkService.getLinks();
    res.send(links);
});

router.post('/add', cryptographyService.authorize, upload.single('logo'), async (req, res) => {
    try {
        const { name, url, priority } = req.body;
        const logo = req.file.filename;
        await linkService.addLink(name, url, logo, priority);
        res.sendStatus(200);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
