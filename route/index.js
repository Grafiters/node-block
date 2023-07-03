const { Router} = require("express");
const MainRouter = new Router();

const UserRouter = require('./user.js');
const GeetestRouter = require('./captcha.js');
const AuthRouter = require('./auth.js');
const BlogRouter = require('./blog.js');
const BlockchainRouter = require('./blockchain.js');
const NodeBlockchainRouter = require('./node.js');

MainRouter.use('/node', NodeBlockchainRouter);
MainRouter.use('/blockchain', BlockchainRouter);
MainRouter.use('/geetest', GeetestRouter);
MainRouter.use('/blog', BlogRouter);
MainRouter.use('/user', UserRouter);
MainRouter.use('/', AuthRouter);

module.exports = MainRouter;