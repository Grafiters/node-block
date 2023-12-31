require('dotenv').config()

const Joi = require('joi');
const validation = require('./index')
const model = require('../models')

async function requestCreateSchema(req, res, next){
    const schema = Joi.object({
        blockchain_id: Joi.string().required(),
        connection_speed: Joi.string().required(),
        api_interface: Joi.string().required(),
        endpoint: Joi.string().required(),
        documentation_link: Joi.string().required()
    });

    const request = validation.validateRequest(req, next, schema, res);    
    if(!request.status){
        return res.status(422).send(request)
    }

    const blockchain = await model.Blockchain.findOne({where: {id: req.body.blockchain_id}})
    if(!blockchain){
        return res.status(422).send({
            status: false,
            message: 'Blockchain ID tidak ditemukan'
        })
    }

    next()
}

async function requestParams(req, res, next){
    const paramsSchema = Joi.object({
        node_id: Joi.number().integer().required(),
    })
    const request = validation.validateParamsRequest(req, next, paramsSchema, res)

    if(!request.status){
        return res.status(422).send(request)
    }
    const node = await model.Node.findOne({
        where: {
            id: req.params.node_id
        }
    })

    if(!node){
        return res.status(422).send({
            status: false,
            message: 'Node Blockchain ID tidak ditemukan'
        })
    }

    next()
}

module.exports = {
    requestCreateSchema
}