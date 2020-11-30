const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { OperationError } = require('../error/operation');

const saltRound = process.env.SALT_WORK_FACTOR;


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
    
}, { timestamps: true })


userSchema.pre('save', async function(next) {
    const user = this;

    if(!user.isModified('password')) {
        return next();
    }

    try {
        const salt =  await bcrypt.genSalt(parseInt(saltRound, 10));
        user.password = await bcrypt.hash(user.password, salt);
        return next();
    } catch (error) {
        const operationError = new OperationError(500, error.message);
        return next(operationError);
    }
    
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await  bcrypt.compare(candidatePassword, this.password)

    if(!isMatch) {
        const operationError = new OperationError(400, 'password is wrong')
        throw operationError;
    }
};

module.exports = mongoose.model('User', userSchema);

