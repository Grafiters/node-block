'use strict';
const { Router } = require('express');
const BlockchainRouter = new Router();
const blockchain = require('../controller/blockchain')
const jwtService = require('../service/jwtService')

BlockchainRouter.get('/', blockchain.getAllBlockchain)
BlockchainRouter.post('/add', jwtService.authAdminJWT, blockchain.addBlockchainData)
BlockchainRouter.post('/edit/:blockchain_id', jwtService.authAdminJWT, blockchain.updateBlockchainData)
BlockchainRouter.delete('/delete/:blockchain_id', jwtService.authAdminJWT, blockchain.deleteBlockchainData)

module.exports = BlockchainRouter