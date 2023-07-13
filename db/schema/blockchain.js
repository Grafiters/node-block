require('dotenv').config()

const Joi = require('joi');
const model = require('../models')
const validation = require('./index')

function bodyBlockchain(req, res, next){
    const schema = Joi.object({
        blockchain_name: Joi.string().required(),
        height: Joi.number().integer().required(),
        network: Joi.string().required(),
        version: Joi.string().required(),
        location: Joi.string().required()
    })

    const request = validation.validateRequest(req, next, schema, res)
    if(!request.status){
        return res.status(422).send(request)
    }
    next()
}

async function paramsBlockchain(req, res, next){
    const paramsSchema = Joi.object({
        blockchain_id: Joi.number().integer().required(),
    })

    const request = validation.validateParamsRequest(req, next, paramsSchema, res)
    if(!request.status){
        return res.status(422).send(request)
    }
    
    const blockchain = await model.Blockchain.findOne({
        where: {
            id: req.params.blockchain_id
        }
    })
    if(!blockchain){
        return res.status(422).send({
            status: false,
            message: 'Blockchain ID tidak ditemukan'
        })
    }

    next()
}

module.exports = {
    paramsBlockchain,
    bodyBlockchain,
}