'use strict';
const { Router } = require('express');
const SubcribeRouter = new Router();
const subcribe = require('../controller/subcribe')
const jwtService = require('../service/jwtService')
const schema = require('../db/schema/invoice');

SubcribeRouter.get('/', jwtService.authExecptionJWT, subcribe.getAllSubcribeUser)
SubcribeRouter.get('/:subcribe_id', jwtService.authExecptionJWT, subcribe.getDetailSubcribeUser)

module.exports = SubcribeRouter