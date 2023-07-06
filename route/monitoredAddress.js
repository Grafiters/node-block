'use strict';
const { Router } = require('express');
const MonitoredAddressRouter = new Router();
const monitoredAddress = require('../controller/monitoredAddress')
const jwtService = require('../service/jwtService')

MonitoredAddressRouter.get('/', jwtService.authExecptionJWT, monitoredAddress.getAllMonitoredAddress)
MonitoredAddressRouter.post('/add', jwtService.authExecptionJWT, monitoredAddress.createMonitoredAddress)
MonitoredAddressRouter.get('/history', jwtService.authExecptionJWT, monitoredAddress.getMonitoredAddressHistory)
MonitoredAddressRouter.get('/:address_id', jwtService.authExecptionJWT, monitoredAddress.findMonitoredAddressByID)
MonitoredAddressRouter.delete('/delete/:address_id', jwtService.authExecptionJWT, monitoredAddress.deleteMonitoredAddress)

module.exports = MonitoredAddressRouter