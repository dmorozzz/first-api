const express = require('express');
const router = express.Router();
const userServise = require('./service');

router.get('/', async (req, res) => {
    if(!req.session.username) {
        return res.status(401).json('user is not logged');
    }

    return res.status(200).json({username: req.session.username});
})

router.get('/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await userServise.findUser(username);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Oops... Something went wrong'});
    }

})

module.exports = router;