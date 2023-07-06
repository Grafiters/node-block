require('dotenv').config()

const Joi = require('joi');
const validation = require('./index')

function loginSchema(req, res, next){
    if(process.env.GEETEST_ENABLED && process.env.NODE_ENV == 'production' ){
        if(typeof req.body.captcha !== 'object'){
            res.status(422).send({
                status: false,
                message: ['captcha must be exists', 'captcha must be object']
            })
        }
    }
    
    
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    validation.validateRequest(req, next, schema, res);
    validation.validateEmailAndPassword(req.body.email, req.body.password)

    next()
}

function loginGoogleSchema(req, res ,next){
    const schema = Joi.object({
        google_id: Joi.string().required()
    });

    validation.validateRequest(req, next, schema, res);
    next()
}

function registerSchema(req, res ,next){
    if(process.env.GEETEST_ENABLED && process.env.NODE_ENV == 'production' ){
        if(typeof req.body.captcha !== 'object'){
            res.status(422).send({
                status: false,
                message: ['captcha must be exists', 'captcha must be object']
            })
        }
    }

    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    validation.validateRequest(req, next, schema, res);
    validation.validateEmailAndPassword(req.body.email, req.body.password)
    next()
}

function registerGoogleSchema(req, res ,next){
    const schema = Joi.object({
        email: Joi.string().required(),
        google_id: Joi.string().required()
    });

    validation.validateRequest(req, next, schema, res);
    next()
}

function activationCodeSchema(req, res ,next){
    const schema = Joi.object({
        activation_token: Joi.string().required()
    });

    validation.validateParamsRequest(req, next, schema, res);
    next()
}

function resendActivationCodeSchema(req, res ,next){
    const schema = Joi.object({
        email: Joi.string().required()
    });

    validation.validateRequest(req, next, schema, res);
    next()
}

function forgotPasswordSchema(req, res, next){
    const schema = Joi.object({
        email: Joi.string().required()
    });

    validation.validateRequest(req, next, schema, res);
    validation.validateEmail(req.body.email)
    next()
}

function resetPasswordSchema(req, res, next){
    const schema = Joi.object({
        email: Joi.string().required(),
        reset_token: Joi.string().required(),
        new_password: Joi.string().required()
    });

    validation.validateRequest(req, next, schema, res);
    validation.validateEmail(req.body.email)
    validation.validatePassword(req.body.new_password)
    next()
}



module.exports = {
    loginSchema,
    registerSchema,
    loginGoogleSchema,
    resetPasswordSchema,
    forgotPasswordSchema,
    registerGoogleSchema,
    activationCodeSchema,
    resendActivationCodeSchema,
}