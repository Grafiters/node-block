require('dotenv').config()

const Joi = require('joi');
const model = require('../models')
const validation = require('./index')

function bodyPackage(req, res, next){
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        request_per_second_limit: Joi.string().required(),
        request_per_day_limit: Joi.string().required(),
        request_per_month_limit: Joi.string().required(),
        price: Joi.number().min(0.0).required(),
        is_trial: Joi.boolean().required()
    })

    validation.validateRequest(req, next, schema, res)

    next()
}

async function paramsPackage(req, res, next){
    const paramsSchema = Joi.object({
        package_id: Joi.number().integer().required(),
    })

    validation.validateParamsRequest(req, next, paramsSchema, res)
    const blockchain = await model.Blockchain.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!blockchain){
        return res.status(422).json({
            status: false,
            message: 'Package ID tidak ditemukan'
        })
    }

    next()
}

module.exports = {
    bodyPackage,
    paramsPackage,
}