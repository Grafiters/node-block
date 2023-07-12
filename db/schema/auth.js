require('dotenv').config()
const Joi = require('joi')
const validation = require('./index')

function loginSchema(req, res, next){
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        captcha: Joi.string()
    });

    const request = validation.validateRequest(req, next, schema, res)
    const params = validation.validateEmailAndPassword(req.body.email, req.body.password)

    if (!request.status || !params.status){
        const respone = request || params

        return res.status(422).send(respone)
    }
    
    if(process.env.GEETEST_ENABLED === true && process.env.NODE_ENV == 'production' ){
        if(typeof req.body.captcha !== 'object'){
            return res.status(422).send({
                status: false,
                message: ['captcha must be exists', 'captcha must be object']
            })
        }
    }

    next()
}

function loginGoogleSchema(req, res ,next){
    const schema = Joi.object({
        google_id: Joi.string().required()
    });

    const request = validation.validateRequest(req, next, schema, res);
    if(!request.status){
        return res.status(422).send(request)
    }
    
    next()
}

function registerSchema(req, res ,next){
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    const request = validation.validateRequest(req, next, schema, res);
    const params = validation.validateEmailAndPassword(req.body.email, req.body.password)

    if(!request.status || !params.status){
        const response = request || params

        return res.status(422).send(response)
    }
    
    if(process.env.GEETEST_ENABLED && process.env.NODE_ENV == 'production' ){
        if(typeof req.body.captcha !== 'object'){
            return res.status(422).send({
                status: false,
                message: ['captcha must be exists', 'captcha must be object']
            })
        }
    }


    next()
}

function registerGoogleSchema(req, res ,next){
    const schema = Joi.object({
        email: Joi.string().required(),
        google_id: Joi.string().required()
    });

    const request = validation.validateRequest(req, next, schema, res);
    if(!request.status){
        return res.status(422).send(request)
    }
    
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

    const request = validation.validateRequest(req, next, schema, res);
    if(!request.status){
        return res.status(422).send(request)
    }
    next()
}

function forgotPasswordSchema(req, res, next){
    const schema = Joi.object({
        email: Joi.string().required()
    });

    const request = validation.validateRequest(req, next, schema, res);
    const body = validation.validateEmail(req.body.email)

    if (!request.status || !body.status){
        const response = (request.status) ? body : request

        return res.status(422).send(response)
    }
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

const LoginSwaggerSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

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