'use strict';
const { Router } = require('express');
const BlockchainRouter = new Router();
const blockchain = require('../controller/blockchain')

BlockchainRouter.get('/', blockchain.getAllBlockchain)
BlockchainRouter.get('/:id', blockchain.getAllBlockchainByID)

module.exports = BlockchainRouter