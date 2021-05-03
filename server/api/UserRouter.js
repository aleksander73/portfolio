const express = require('express');
const { userService, cryptographyService } = require('../services');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const token = await userService.loginUser(req.body.username, req.body.password);
        res.cookie('authentication-token', token, { secure: process.env.NODE_ENV === 'production' });
        res.sendStatus(200);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('authentication-token');
    res.sendStatus(200);
});

router.get('/whoami', cryptographyService.authorize, async (req, res) => {
    try {
        const username = req.user.username;
        const user = await userService.getUserByUsername(username);
        res.status(200).send({
            user: userService.publicize(user)
        });
    } catch(error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
