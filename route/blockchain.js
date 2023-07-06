'use strict';
const { Router } = require('express');
const BlockchainRouter = new Router();
const blockchain = require('../controller/blockchain')
const jwtService = require('../service/jwtService')
const schema = require('../db/schema/blockchain')

BlockchainRouter.get('/', blockchain.getAllBlockchain)
BlockchainRouter.post('/add', jwtService.authAdminJWT, schema.bodyBlockchain, blockchain.addBlockchainData)
BlockchainRouter.post('/edit/:blockchain_id', jwtService.authAdminJWT, schema.paramsBlockchain, schema.bodyBlockchain, blockchain.updateBlockchainData)
BlockchainRouter.delete('/delete/:blockchain_id', jwtService.authAdminJWT, schema.paramsBlockchain, blockchain.deleteBlockchainData)

module.exports = BlockchainRouter