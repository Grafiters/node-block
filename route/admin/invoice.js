'use strict';
const { Router } = require('express');
const InvocieRouter = new Router();
const invoice = require('../../controller/admin/invoice')
const jwtService = require('../../service/jwtService')
const schema = require('../../db/schema/invoice');

InvocieRouter.get('/', jwtService.authExecptionJWT, invoice.getAllinvoiceUser)
InvocieRouter.get('/:id', jwtService.authExecptionJWT, invoice.getInvoiceUserByID)
InvocieRouter.delete('/delete/:id', jwtService.authExecptionJWT, schema.paramsInvoice, invoice.deleteInvoiceUser)

module.exports = InvocieRouter