const express = require('express');
const DbManager = require('../../db/DbManager');

const router = express.Router();
router.get('/', async (req, res) => {
    const technologies = await DbManager.getInstance().getTechnologiesCollection();
    res.send(await technologies.find({}).toArray());
});

module.exports = router;
