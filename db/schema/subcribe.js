require('dotenv').config()

const Joi = require('joi');
const validation = require('./index')
const model = require('../models')

async function paramsSubcribe(req, res, next){
    const schema = Joi.object({
        subcribe_id: Joi.number().integer().required()
    })

    const request = validation.validateParamsRequest(req, next, schema, res)
    if(!request.status){
        return res.status(422).send(request)
    }

    const invoice = await model.UserSubcriptions.findOne({
        where: {
            id: read.params.subcribe_id
        }
    })
    if(!invoice){
        return res.status(422).send({
            status: false,
            message: 'Subcribe ID not found on system'
        })
    }

    next()
}

module.exports = {
    paramsSubcribe
}