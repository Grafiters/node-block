require('dotenv').config()

const Joi = require('joi');
const validation = require('./index')
const model = require('../models')

function bodyApiKeys(req, res, next){
    const schema = Joi.object({
        label: Joi.string().required(),
    })

    const request = validation.validateRequest(req, next, schema, res)
    if(!request.status){
        return res.status(422).send(request)
    }

    next()
}

function bodyStatitic(req, res, next){
    const schema = Joi.object({
        api_key: Joi.string().optional(),
        interval: Joi.number().integer().required(),
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
    })

    const request = validation.validateQueryRequest(req, next, schema, res)
    if(!request.status){
        return res.status(422).send(request)
    }

    if(req.query.api_key){
        const api_keys = model.ApiKeys.findOne({
            where: {
                api_key: req.query.api_key
            }
        })

        if(!api_keys){
            return res.status(422).json({
                status: false,
                message: 'API key not found'
            })
        }
    }

    next()
}

async function paramsApiKeys(req, res, next){
    const schema = Joi.object({
        api_key: Joi.number().integer().required()
    })

    const request = validation.validateParamsRequest(req, next, schema, res)
    if(!request.status){
        return res.status(422).send(request)
    }

    const invoice = await model.ApiKeys.findOne({
        where: {
            id: read.params.subcribe_id
        }
    })
    if(!invoice){
        return res.status(422).json({
            status: false,
            message: 'Subcribe ID not found on system'
        })
    }

    next()
}

module.exports = {
    bodyApiKeys,
    bodyStatitic,
    paramsApiKeys
}