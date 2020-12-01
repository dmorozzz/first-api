const express = require('express');
const router = express.Router();
const userService = require('../service.js');
const { promisify } = require('util');

router.post('/registration', async (req, res, next) => {
    try {
        const userData = req.body;
        await userService.createUser(userData);
        req.session.username = userData.username;
        return res.status(201).json({status: 'OK', message: 'user has been created'});
    } catch (error) {
       return next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await userService.findUser(username);
        await user.comparePassword(password);
        req.session.username = username;
        return res.status(200).json({status: 'OK', data: username});
    } catch (error) {
        return next(error)
    }
})

router.get('/logout', async (req, res, next) => {
    try {
        await promisify(req.session.destroy);
        return res.status(200).json({status:'ok', message: 'user is logout'});
    } catch (error) {
        return next(error);
    }
})

module.exports = router;