const Joi = require('joi');

class Base {
    authLogReg() {
        return Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
            captcha: Joi.object({
                geetestChallenge: Joi.string().required(),
                geetestValidate: Joi.string().required(),
                geetestSeccode: Joi.string().required()
            })
        });
    }
}

module.exports = Base;