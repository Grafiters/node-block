const { Router } = require('express');
const BlockchainRouter = new Router();
const blockchainController = require('../../controller/admin/blockchain')
const jwtService = require('../../service/jwtService')
const schema = require('../../db/schema/blockchain')

BlockchainRouter.get('/', jwtService.authAdminJWT, blockchainController.getAllBlockchain)
BlockchainRouter.get('/:id', jwtService.authAdminJWT, blockchainController.getAllBlockchainByID)
BlockchainRouter.post('/add', jwtService.authAdminJWT, schema.bodyBlockchain, blockchainController.addBlockchainData)
BlockchainRouter.post('/edit/:blockchain_id', jwtService.authAdminJWT, schema.paramsBlockchain, schema.bodyBlockchain, blockchainController.updateBlockchainData)
BlockchainRouter.delete('/delete/:blockchain_id', jwtService.authAdminJWT, schema.paramsBlockchain, blockchainController.deleteBlockchainData)

module.exports = BlockchainRouter