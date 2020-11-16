const UserSchema = require('./schema');

const createUser = async userData => {
    const {username, password} = userData;
    
    const user = await UserSchema.findOne({username});

    if(user !== null) {
        throw new Error('user is already exist');
    }


    const newUser = new UserSchema({username, password});
    return await newUser.save();
}

module.exports = {
    createUser
}