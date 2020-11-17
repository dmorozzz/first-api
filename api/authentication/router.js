const express = require('express');
const session = require('express-session');
const router = express.Router();
const userService = require('./service.js');
const {promisify} = require('util');

router.post('/registration', async (req, res) => {
    try {
        const userData = req.body;
        const user = await userService.createUser(userData);
        req.session.username = userData.username;
        return res.status(201).json({status: 'OK', message: 'user has been created'});
    } catch (error) {
        const errorMessage = new Error(error);
        console.log(error);
        return res.status(400).json({status: 'Bad request', message: errorMessage})
    }
});

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await userService.findUser(username);
        await user.comparePassword(password);
        req.session.username = username;
        return res.status(200).json({status: 'OK', data: username});
    } catch (error) {
        console.log(error)
        return res.status(401).json({message: error});
    }
})


router.get('/logout', async (req, res) => {
    try {
        await promisify(req.session.destroy);
        return res.status(200).json({status:'ok', message: 'user is logout'});
    } catch (error) {
        return res.status(500).json({message: error});
    }
})

module.exports = router;