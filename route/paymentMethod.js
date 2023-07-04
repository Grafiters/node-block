'use strict';
const { Router } = require('express');
const PaymentMethodRouter = new Router();
const payment = require('../controller/paymentMethod')
const jwtService = require('../service/jwtService')
const schema = require('../db/schema/node');

PaymentMethodRouter.get('/', payment.getAllPaymentMethod)
PaymentMethodRouter.get('/:id', payment.getPaymentMethodByID)
PaymentMethodRouter.post('/add', jwtService.authAdminJWT, payment.addPaymentMethod)
PaymentMethodRouter.post('/edit/:id', jwtService.authAdminJWT, payment.updatePaymentMethod)
PaymentMethodRouter.delete('/delete/:id', jwtService.authAdminJWT, payment.deletePaymentMethod)

module.exports = PaymentMethodRouter