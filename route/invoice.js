'use strict';
const { Router } = require('express');
const InvocieRouter = new Router();
const invoice = require('../controller/invoice')
const jwtService = require('../service/jwtService')
const schema = require('../db/schema/invoice');


// PENDING
// InvocieRouter.get('/', jwtService.authExecptionJWT, invoice.getAllPaymentMethod)
// InvocieRouter.get('/:id', jwtService.authExecptionJWT, invoice.getPaymentMethodByID)
InvocieRouter.post('/create', jwtService.authExecptionJWT, schema.invoiceCreate, invoice.addInvoiceUser)
// InvocieRouter.post('/edit/:id', jwtService.authExecptionJWT, invoice.updatePaymentMethod)
// InvocieRouter.delete('/delete/:id', jwtService.authExecptionJWT, invoice.deletePaymentMethod)

module.exports = InvocieRouter