const express = require('express');
const router = express.Router();
const userService = require('./service.js');

router.post('/registration', async (req, res) => {
    try {
        const userData = req.body;
        const user = await userService.createUser(userData);
        return res.status(201).json({status: 'OK', message: 'user has been created'});
    } catch (error) {
        const errorMessage = new Error(error);
        console.log(error)
        return res.status(400).json({status: 'Bad request', message: errorMessage})
    }
});

router.post('/login', async (req, res) => {

})

module.exports = router;