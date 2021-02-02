const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();
router.get('/', (req, res) => {
    res.send('projects::get-route');
});

module.exports = router;
