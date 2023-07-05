'use strict';
const { Router } = require('express');
const ApiKeysRouter = new Router();
const apiKeys = require('../controller/apikeys')
const jwtService = require('../service/jwtService')

ApiKeysRouter.get('/', jwtService.authExecptionJWT, apiKeys.apiKeysUser)
ApiKeysRouter.post('/generate', jwtService.authExecptionJWT, apiKeys.createApiKeysUser)
ApiKeysRouter.delete('/delete/:api_key_id', jwtService.authExecptionJWT, apiKeys.deleteApiKeysUser)
ApiKeysRouter.get('/usage-statistic', jwtService.authExecptionJWT, apiKeys.usageStatistic)
ApiKeysRouter.get('/usage-statistic/chart', jwtService.authExecptionJWT, apiKeys.usageStatisticByApiKeyChart)
ApiKeysRouter.get('/usage-statistic/:api_key', jwtService.authExecptionJWT, apiKeys.usageStatisticByApiKey)

module.exports = ApiKeysRouter