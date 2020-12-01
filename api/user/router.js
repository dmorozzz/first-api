const express = require('express');
const router = express.Router();
const userService = require('./service');
const { authenticationCheck } = require('./midlleware');

router.get('/', authenticationCheck, async (req, res) => {
    return res.status(200).json({username: req.username});
})

router.get('/:username', async (req, res, next) => {
    const { username } = req.params;
    try {
        const user = await userService.findUser(username);
        res.status(200).json(user);
    } catch (error) {
        return next(error);
    }

})

module.exports = router;