'use strict';
const { Router } = require('express');
const NodeBlockchainRouter = new Router();
const node = require('../controller/node')

NodeBlockchainRouter.get('/', node.getAllNodeBlockchain)
NodeBlockchainRouter.get('/:id', node.getAllNodeBlockchain)

module.exports = NodeBlockchainRouter