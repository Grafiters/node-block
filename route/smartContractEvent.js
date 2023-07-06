'use strict';
const { Router } = require('express');
const SmartContractEventRouter = new Router();
const smartContract = require('../controller/smartContractAddress')
const jwtService = require('../service/jwtService')

SmartContractEventRouter.get('/', jwtService.authExecptionJWT, smartContract.getAllSmartContractEvent)
SmartContractEventRouter.post('/add', jwtService.authExecptionJWT, smartContract.createSmartContractEvent)
SmartContractEventRouter.get('/:address_id', jwtService.authExecptionJWT, smartContract.findSmartContractEventByID)
SmartContractEventRouter.get('/history', jwtService.authExecptionJWT, smartContract.getSmartContractEventHistory)
SmartContractEventRouter.delete('/delete/:address_id', jwtService.authExecptionJWT, smartContract.deleteSmartCotnractEvent)

module.exports = SmartContractEventRouter