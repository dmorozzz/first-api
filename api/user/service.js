const UserSchema = require('./schema');
const { OperationError } = require('../error/operation');

const isUserExist = async username => {
    const user =  await UserSchema.findOne({username});
    return user ? true : false; 
}

const createUser = async userData => {
    const {username, password} = userData;
    
    if(isUserExist(username)) {
        throw new OperationError(400, 'user is already exist');
    }

    const newUser = new UserSchema({username, password});
    
    return await newUser.save();
}

const findUser = async username => {
    const user = await UserSchema.findOne({username});

    if(!user) {
        throw new OperationError(400, 'user not found');
    }

    return user;
}

module.exports = {
    createUser, 
    findUser
}