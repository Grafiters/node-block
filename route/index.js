const { Router} = require("express");
const MainRouter = new Router();

const UserRouter = require('./user.js');
const GeetestRouter = require('./captcha.js');
const AuthRouter = require('./auth.js');
const BlogRouter = require('./blog.js');

MainRouter.use('/blog', BlogRouter);

MainRouter.use('/geetest', GeetestRouter);
MainRouter.use('/user', UserRouter);
MainRouter.use('/', AuthRouter);

module.exports = MainRouter;