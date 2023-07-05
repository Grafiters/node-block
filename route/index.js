const { Router} = require("express");
const MainRouter = new Router();

const UserRouter = require('./user.js');
const AuthRouter = require('./auth.js');
const BlogRouter = require('./blog.js');
const InvocieRouter = require('./invoice.js');
const PackageRouter = require('./package.js');
const GeetestRouter = require('./captcha.js');
const NodeBlockchainRouter = require('./node.js');
const BlockchainRouter = require('./blockchain.js');
const PaymentMethodRouter = require('./paymentMethod.js');
const ApiKeysRouter = require('./apiKeys.js');

MainRouter.use('/payment-method', PaymentMethodRouter);
MainRouter.use('/api-keys', ApiKeysRouter);
MainRouter.use('/blockchain', BlockchainRouter);
MainRouter.use('/node', NodeBlockchainRouter);
MainRouter.use('/invoice', InvocieRouter);
MainRouter.use('/package', PackageRouter);
MainRouter.use('/geetest', GeetestRouter);
MainRouter.use('/blog', BlogRouter);
MainRouter.use('/user', UserRouter);
MainRouter.use('/', AuthRouter);

module.exports = MainRouter;