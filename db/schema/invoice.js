require('dotenv').config()

const Joi = require('joi');
const validation = require('./index')
const model = require('../models')

async function bodyInvoice(req, res, next){
    const schema = Joi.object({
        package_id: Joi.number().integer().required(),
        payment_method_id: Joi.number().integer().required()
    });

    validation.validateRequest(req, next, schema, res);

    const packageData = await model.Packages.findOne({where: {id: req.body.package_id}})
    const payment_method = await model.PaymentMethods.findOne({where: {id: req.body.payment_method_id}})

    if(!packageData){
        return res.status(422).send({
            status: false,
            message: 'can\'t find package on system'
        })
    }

    if(!payment_method){
        return res.status(422).send({
            status: false,
            message: 'can\'t find payment method on system'
        })
    }
    
    next()
}

async function paramsInvoice(req, res, next){
    const schema = Joi.object({
        id: Joi.number().integer().required()
    })

    validation.validateParamsRequest(req, next, schema, res)

    const invoice = await model.Inovices.findOne({
        where: {
            id: read.params.id
        }
    })
    if(!invoice){
        return res.status(422).json({
            status: false,
            message: 'Invoice not found on system'
        })
    }

    next()
}

module.exports = {
    bodyInvoice,
    paramsInvoice
}