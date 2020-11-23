const authenticationCheck = async (req, res, next) => {
    if (!req.session.username) {
        return res.status(401).json({message: 'user is not authorized'});
        next();
    }

    req.username = req.session.username;
    next();
}


module.exports = {
    authenticationCheck
}