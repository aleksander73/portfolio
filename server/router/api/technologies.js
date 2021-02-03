const express = require('express');
const dbManager = require('../../db/DbManager');

const router = express.Router();
router.get('/', async (req, res) => {
    const technologies = await dbManager.getTechnologiesCollection();
    res.send(await technologies.find({}).toArray());
});

module.exports = router;
