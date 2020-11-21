const userRouter = require('./router');
const { authenticationUserRouter } = require('./authentication');

userRouter.use('/authentication', authenticationUserRouter);

module.exports = {
    userRouter,
    authenticationUserRouter
}