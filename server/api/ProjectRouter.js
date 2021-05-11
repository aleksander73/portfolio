const express = require('express');
const { Database } = require('../database');
const { upload } = require('../middleware');
const router = express.Router();

router.get('/', async (req, res) => {
    const projects = await Database.getInstance().getCollection('projects');
    res.send(projects);
});

router.post('/add', upload.array('pictures'), (req, res) => {
    res.send(req.files);
});

module.exports = router;
