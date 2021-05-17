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
        const link = await linkService.addLink(name, url, logo, priority);
        res.sendStatus(200).send(link);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.post('/edit', cryptographyService.authorize, upload.single('uploadedLogo'), async (req, res) => {
    try {
        const { _id, name, url, logo, deletedLogo, priority } = req.body;
        const uploadedLogo = req.file ? req.file.filename : '';
        const success = await linkService.editLink(_id, name, url, logo, deletedLogo, uploadedLogo, priority);
        res.status(200).send({ success });
    } catch(error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
