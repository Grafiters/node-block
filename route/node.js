'use strict';
const { Router } = require('express');
const NodeBlockchainRouter = new Router();
const node = require('../controller/node')
const jwtService = require('../service/jwtService')
const schema = require('../db/schema/node');

NodeBlockchainRouter.get('/', jwtService.authExecptionJWT, node.getAllNodeBlockchain)
NodeBlockchainRouter.post('/add', jwtService.authExecptionJWT, node.addNodeBlockchain)
NodeBlockchainRouter.post('/edit/:node_id', jwtService.authExecptionJWT, schema.requestCreateSchema, node.updateNodeBlockchain)
NodeBlockchainRouter.delete('/delete/:node_id', jwtService.authExecptionJWT, node.deleteNodeBlockchain)

module.exports = NodeBlockchainRouter