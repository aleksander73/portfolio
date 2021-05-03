const express = require('express');
const { Database } = require('../database');

const router = express.Router();
router.get('/', async (req, res) => {
    const technologies = await Database.getInstance().getCollection('technologies');
    res.send(technologies);
});

module.exports = router;
