'use strict';
const { Router } = require('express');
const ApiKeysRouter = new Router();
const apiKeys = require('../controller/apikeys')
const jwtService = require('../service/jwtService')
const schema = require('../db/schema/apiKeys')

ApiKeysRouter.get('/', jwtService.authExecptionJWT, apiKeys.apiKeysUser)
ApiKeysRouter.post('/generate', jwtService.authExecptionJWT, schema.bodyApiKeys, apiKeys.createApiKeysUser)
ApiKeysRouter.delete('/delete/:api_key_id', jwtService.authExecptionJWT, schema.paramsApiKeys, apiKeys.deleteApiKeysUser)

ApiKeysRouter.get('/usage-statistic', jwtService.authExecptionJWT, schema.bodyStatitic, apiKeys.usageStatistic)
ApiKeysRouter.get('/usage-statistic/chart', jwtService.authExecptionJWT, schema.bodyStatitic, apiKeys.usageStatisticByApiKeyChart)
ApiKeysRouter.get('/usage-statistic/:api_key', jwtService.authExecptionJWT, schema.paramsApiKeys, schema.bodyStatitic, apiKeys.usageStatisticByApiKey)

module.exports = ApiKeysRouter