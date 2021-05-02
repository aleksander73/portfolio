const express = require('express');
const { Database } = require('../database');

const router = express.Router();
router.get('/', async (req, res) => {
    const projects = await Database.getInstance().getCollection('projects');
    res.send(projects);
});

module.exports = router;
