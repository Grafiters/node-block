'use strict';
const { Router } = require('express');
const PaymentMethodRouter = new Router();
const payment = require('../controller/paymentMethod')
const jwtService = require('../service/jwtService')
const schema = require('../db/schema/paymentMethod');

PaymentMethodRouter.get('/', payment.getAllPaymentMethod)
PaymentMethodRouter.get('/:id', schema.paramsPaymentMethod, payment.getPaymentMethodByID)

module.exports = PaymentMethodRouter