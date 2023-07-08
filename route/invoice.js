'use strict';
const { Router } = require('express');
const InvocieRouter = new Router();
const invoice = require('../controller/invoice')
const jwtService = require('../service/jwtService')
const schema = require('../db/schema/invoice');

// InvocieRouter.get('/xendit/invoice', invoice.xenditListInvoice)
// InvocieRouter.post('/xendit/invoice/create', invoice.xenditCreateInvoice)
InvocieRouter.get('/', jwtService.authExecptionJWT, invoice.getAllinvoiceUser)
InvocieRouter.get('/:id', jwtService.authExecptionJWT, schema.paramsInvoice,invoice.getInvoiceUserByID)
InvocieRouter.post('/create', jwtService.authExecptionJWT, schema.bodyInvoice, invoice.addInvoiceUser)
// InvocieRouter.post('/edit/:id', jwtService.authExecptionJWT, invoice.updatePaymentMethod)
InvocieRouter.delete('/delete/:id', jwtService.authExecptionJWT, schema.paramsInvoice, invoice.deleteInvoiceUser)

module.exports = InvocieRouter