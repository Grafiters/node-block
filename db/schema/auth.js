const Joi = require('joi');

function loginSchema(req, res, next){
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        captcha: Joi.object()
    });

    validateRequest(req, next, schema, res);
}

function validateRequest(req, next, schema, res) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        detail_error = error.details.map(x => x.message).join(', ')
        res.status(406).send({
            status: false,
            message: detail_error
        })
    } else {
        req.body = value;
        next();
    }
}

module.exports = {
    loginSchema
}