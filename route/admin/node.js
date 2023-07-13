'use strict';
const { Router } = require('express');
const NodeBlockchainRouter = new Router();
const node = require('../../controller/admin/node')
const schema = require('../../db/schema/node');

NodeBlockchainRouter.get('/:blockchain_id', node.getAllNodeBlockchain)
NodeBlockchainRouter.post('/add', node.addNodeBlockchain)
NodeBlockchainRouter.post('/edit/:node_id', schema.requestCreateSchema, node.updateNodeBlockchain)
NodeBlockchainRouter.delete('/delete/:node_id', node.deleteNodeBlockchain)

module.exports = NodeBlockchainRouter