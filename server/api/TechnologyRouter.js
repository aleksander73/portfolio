const express = require('express');
const { technologyService } = require('../services');
const { upload } = require('../middleware');

const router = express.Router();

router.get('/', async (req, res) => {
    const technologies = await technologyService.getTechnologies();
    res.send(technologies);
});

router.post('/add', upload.single('icon'), async (req, res) => {
    try {
        const { tag, name } = req.body;
        const icon = req.file.filename;
        await technologyService.addTechnology(tag, name, icon);
        res.sendStatus(200);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
