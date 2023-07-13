'use strict';
const { Router } = require('express');
const PaymentMethodRouter = new Router();
const payment = require('../../controller/admin/paymentMethod')
const jwtService = require('../../service/jwtService')
const schema = require('../../db/schema/paymentMethod');

PaymentMethodRouter.get('/', payment.getAllPaymentMethod)
PaymentMethodRouter.get('/:id', schema.paramsPaymentMethod, payment.getPaymentMethodByID)
PaymentMethodRouter.post('/add', jwtService.authAdminJWT, schema.bodyPaymentMethod, payment.addPaymentMethod)
PaymentMethodRouter.post('/edit/:id', jwtService.authAdminJWT, schema.paramsPaymentMethod, schema.bodyPaymentMethod, payment.updatePaymentMethod)
PaymentMethodRouter.delete('/delete/:id', jwtService.authAdminJWT, schema.paramsPaymentMethod, payment.deletePaymentMethod)

module.exports = PaymentMethodRouter