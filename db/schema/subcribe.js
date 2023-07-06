require('dotenv').config()

const Joi = require('joi');
const validation = require('./index')
const model = require('../models')

async function paramsSubcribe(req, res, next){
    const schema = Joi.object({
        subcribe_id: Joi.number().integer().required()
    })

    validation.validateParamsRequest(req, next, schema, res)

    const invoice = await model.UserSubcriptions.findOne({
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
    paramsSubcribe
}