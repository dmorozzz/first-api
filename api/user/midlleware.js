const { OperationError } = require('../error/operation');

const authenticationCheck = async (req, res, next) => {
    const isLogged = req.session.username ? true : false;

    if (!isLogged) {
        const error = new OperationError(401, 'user is not authorized') 
        return next(error);
    }
    
    req.username = req.session.username;
    
    return next();
}

module.exports = {
    authenticationCheck
}