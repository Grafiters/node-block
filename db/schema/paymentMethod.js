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

    validation.validateRequest(req, next, schema, res)

    next()
}

async function paramsPaymentMethod(req, res, next){
    const paramsSchema = Joi.object({
        package_id: Joi.number().integer().required(),
    })

    validation.validateParamsRequest(req, next, paramsSchema, res)
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