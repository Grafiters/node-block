const { Router} = require("express");
const MainRouter = new Router();
const authJWT = require('../service/jwtService')

const AdminRouter = require('./admin/index.js')
const UserRouter = require('./user.js');
const AuthRouter = require('./auth.js');
const BlogRouter = require('./blog.js');
const InvocieRouter = require('./invoice.js');
const PackageRouter = require('./package.js');
const GeetestRouter = require('./captcha.js');
const ApiKeysRouter = require('./apiKeys.js');
const SubcribeRouter = require('./subcribe.js');
const NodeBlockchainRouter = require('./node.js');
const BlockchainRouter = require('./blockchain.js');
const PaymentMethodRouter = require('./paymentMethod.js');
const MonitoredAddressRouter = require('./monitoredAddress.js');
const SmartContractEventRouter = require('./smartContractEvent.js');

MainRouter.use('/monitored-addresses', /* #swagger.tags = ['Monitoring Address'] #swagger.summary = "Monitoring Address Service"*/ MonitoredAddressRouter);
MainRouter.use('/monitored-event', /* #swagger.tags = ['Monitoring Event'] #swagger.summary = "Monitoring Event Service"*/ SmartContractEventRouter);
MainRouter.use('/payment-method', /* #swagger.tags = ['Public'] #swagger.summary = "Payment Method Service"*/ PaymentMethodRouter);
MainRouter.use('/blockchain', /* #swagger.tags = ['Public'] #swagger.summary = "Blockchain Service"*/ BlockchainRouter);
MainRouter.use('/node', /* #swagger.tags = ['Public'] #swagger.summary = "Node Blockchain Service"*/ NodeBlockchainRouter);
MainRouter.use('/subcribe', /* #swagger.tags = ['Subcribe'] #swagger.summary = "Subcribe Service"*/ SubcribeRouter);
MainRouter.use('/api-keys', /* #swagger.tags = ['Api-Keys'] #swagger.summary = "Api-Keys Service"*/ ApiKeysRouter);
MainRouter.use('/invoice', /* #swagger.tags = ['Invoice'] #swagger.summary = "Invoice Service"*/ InvocieRouter);
MainRouter.use('/package', /* #swagger.tags = ['Public'] #swagger.summary = "Package Service"*/ PackageRouter);
MainRouter.use('/geetest', /* #swagger.tags = ['Public'] #swagger.summary = "Geetest Service"*/ GeetestRouter);
MainRouter.use('/blog', /* #swagger.tags = ['Public'] #swagger.summary = "Blog Service"*/ BlogRouter);
MainRouter.use('/user',/* #swagger.tags = ['User'] #swagger.summary = "User Service"*/ UserRouter);
MainRouter.use('/', /* #swagger.tags = ['Auth'] #swagger.summary = "User Service"*/ AuthRouter);

MainRouter.use('/admin', /* #swagger.tags = ['Admin'] #swagger.summary = "Admin Akses"*/ authJWT.authAdminJWT, AdminRouter);

module.exports = MainRouter;