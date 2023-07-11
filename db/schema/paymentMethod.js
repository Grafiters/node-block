require('dotenv').config()

const Joi = require('joi');
const model = require('../models')
const validation = require('./index')

function bodyPaymentMethod(req, res, next){
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        is_crypto: Joi.boolean().required(),
        gateway: Joi.string().required(),
    })

    const request = validation.validateRequest(req, next, schema, res)
    if(!request.status){
        return res.status(422).send(request)
    }

    next()
}

async function paramsPaymentMethod(req, res, next){
    const paramsSchema = Joi.object({
        package_id: Joi.number().integer().required(),
    })

    const request = validation.validateParamsRequest(req, next, paramsSchema, res)
    if(!request.status){
        return res.status(422).send(request)
    }
    const blockchain = await model.PaymentMethods.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!blockchain){
        return res.status(422).json({
            status: false,
            message: 'Payment method ID tidak ditemukan'
        })
    }

    next()
}

module.exports = {
    bodyPaymentMethod,
    paramsPaymentMethod,
}