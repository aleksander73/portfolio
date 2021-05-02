const express = require('express');
const DbManager = require('../../db/DbManager');

const router = express.Router();
router.get('/', async (req, res) => {
    const technologies = await DbManager.getInstance().getCollection('technologies');
    res.send(technologies);
});

module.exports = router;
