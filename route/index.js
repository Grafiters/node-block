const { Router} = require("express");
const MainRouter = new Router();

const UserRouter = require('./user.js');
const GeetestRouter = require('./captcha.js');
const AuthRouter = require('./auth.js');

MainRouter.use('/user', UserRouter);
MainRouter.use('/geetest', GeetestRouter);
MainRouter.use('/', AuthRouter);

module.exports = MainRouter;