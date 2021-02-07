const express = require('express');
const DbManager = require('../../db/DbManager');

const router = express.Router();
router.get('/', async (req, res) => {
    const projects = await DbManager.getInstance().getProjectsCollection();
    res.send(await projects.find({}).toArray());
});

module.exports = router;
