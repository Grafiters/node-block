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

    validation.validateRequest(req, next, schema, res)
    next()
}

async function paramsBlockchain(req, res, next){
    const paramsSchema = Joi.object({
        blockchain_id: Joi.number().integer().required(),
    })

    validation.validateParamsRequest(req, next, paramsSchema, res)
    const blockchain = await model.Blockchain.findOne({
        where: {
            id: req.params.blockchain_id
        }
    })
    if(!blockchain){
        return res.status(422).json({
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