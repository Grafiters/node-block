'use strict';
const { Router } = require('express');
const InvocieRouter = new Router();
const invoice = require('../controller/invoice')
const jwtService = require('../service/jwtService')
const schema = require('../db/schema/invoice');

InvocieRouter.get('/', jwtService.authExecptionJWT, invoice.getAllinvoiceUser)
InvocieRouter.get('/:id', jwtService.authExecptionJWT, invoice.getInvoiceUserByID)
InvocieRouter.post('/create', jwtService.authExecptionJWT, invoice.addInvoiceUser)
// InvocieRouter.post('/edit/:id', jwtService.authExecptionJWT, invoice.updatePaymentMethod)
InvocieRouter.delete('/delete/:id', jwtService.authExecptionJWT, invoice.deleteInvoiceUser)

module.exports = InvocieRouter