const express = require('express');
const dbManager = require('../../db/DbManager');

const router = express.Router();
router.get('/', async (req, res) => {
    const paragraphs = await dbManager.getParagraphsCollection();
    res.send(await paragraphs.find({}).toArray());
});

module.exports = router;
