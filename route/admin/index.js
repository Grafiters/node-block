const { Router} = require("express");
const AdminRouter = new Router();

const UsersRouter = require('./user.js');
const PackageRouter = require('./package.js')
const NodeRouter = require('./node.js')
const BlockchainRouter = require('./blockchain.js')
const invoiceRouter = require('./invoice.js')
const PaymentMethodRouter = require('./paymentMethod.js')

AdminRouter.use('/users', UsersRouter)
AdminRouter.use('/package', PackageRouter)
AdminRouter.use('/invoice', invoiceRouter)
AdminRouter.use('/blockchain', BlockchainRouter)
AdminRouter.use('/node', NodeRouter)
AdminRouter.use('/payment-method', PaymentMethodRouter)

module.exports = AdminRouter