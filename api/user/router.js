const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    if(!req.session.username) {
        return res.status(401).json('user is not logged');
    }

    return res.status(200).json({username: res.session.username});
})

router.get('/:username', async (req, res) => {
    const { username } = req.params;

})

module.exports = router;