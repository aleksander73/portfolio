const express = require('express');
const DbManager = require('../db/DbManager');

const router = express.Router();
router.get('/', async (req, res) => {
    const projects = await DbManager.getInstance().getCollection('projects');
    res.send(projects);
});

module.exports = router;
