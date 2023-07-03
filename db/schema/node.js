require('dotenv').config()

const Joi = require('joi');
const validation = require('./index')
const model = require('../models')

async function requestCreateSchema(req, res, next){
    const blockchain = await model.Blockchain.findOne({where: {id: req.body.blockchain_id}})
        
    if(!blockchain){
        return res.status(422).send({
            status: false,
            message: 'Blockchain not found'
        })
    }
    
    if(!req.params.node_id){
        return res.status(422).send({
            status: false,
            message: 'Blockchain not found'
        })
    }

    const schema = Joi.object({
        blockchain_id: Joi.string().required(),
        connection_speed: Joi.string().required(),
        api_interface: Joi.string().required(),
        endpoint: Joi.string().required(),
        documentation_link: Joi.string().required()
    });

    
    validation.validateRequest(req, next, schema, res);
}

module.exports = {
    requestCreateSchema
}