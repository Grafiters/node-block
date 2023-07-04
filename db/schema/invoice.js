require('dotenv').config()

const Joi = require('joi');
const validation = require('./index')
const model = require('../models')

async function invoiceCreate(req, res, next){
    // const package = await model.Packages.findOne({where: {id: req.body.package_id}})
    // const payment_method = await model.PaymentMethods.findOne({where: {id: req.body.payment_method_id}})
     
    // const schema = Joi.object({
    //     package_id: Joi.string().required(),
    //     payment_method_id: Joi.string().required()
    // });

    // validation.validateRequest(req, next, schema, res);

    // if(!package){
    //     return res.status(422).send({
    //         status: false,
    //         message: 'can\'t find package on system'
    //     })
    // }

    // if(!payment_method){
    //     return res.status(422).send({
    //         status: false,
    //         message: 'can\'t find payment method on system'
    //     })
    // }
}

async function prevUnpaidPackageuser(user_id){
    // const unpaid = await model.UserSubscriptions.findOne({
    //     where: {

    //     }
    // })
}

module.exports = {
    invoiceCreate
}