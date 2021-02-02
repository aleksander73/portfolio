const express = require('express');
const dbManager = require('../../db/DbManager');

const router = express.Router();
router.get('/', async (req, res) => {
    const projects = await dbManager.getProjectsCollection();
    res.send(await projects.find({}).toArray());
});

module.exports = router;
