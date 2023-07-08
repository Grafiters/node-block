const validatorEmail = require('validator');

function validateRequest(req, next, schema, res) {
    const options = {
        abortEarly: true, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        detail_error = error.details.map(x => x.message).join(', ')
        return res.status(422).json({
            status: false,
            message: detail_error
        })
    }
}

function validateQueryRequest(req, next, schema, res) {
    const options = {
        abortEarly: true, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.query, options);
    if (error) {
        detail_error = error.details.map(x => x.message).join(', ')
        return res.status(422).json({
            status: false,
            message: detail_error
        })
    }
}

function validateParamsRequest(req, next, schema, res) {
    const options = {
        abortEarly: true, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.params, options);
    if (error) {
        detail_error = error.details.map(x => x.message).join(', ')
        return res.status(422).json({
            status: false,
            message: detail_error
        })
    }
}

function validateEmailAndPassword(email, password){
    if(!validatorEmail.isEmail(email) && password.length < 8){
        return res.status(422).json({
            status: false,
            message: "Kesalahan validasi",
            errors: [
                "Email tidak valid",
                "Kata sandi harus terdiri dari minimal 8 karakter"
              ]
        });
    }
}

function validatePassword(password){
    if(password < 8){
        return res.status(422).json({
            status: false,
            message: "Kesalahan validasi",
            errors: [
                "Kata sandi harus terdiri dari minimal 8 karakter"
              ]
        });
    }
}

function validateEmail(email){
    if(!validatorEmail.isEmail(email)){
        return res.status(422).json({
            status: false,
            message: "Kesalahan validasi",
            errors: [
                "Email tidak valid"
              ]
        });
    }
}

module.exports = {
    validateEmail,
    validateRequest,
    validatePassword,
    validateParamsRequest,
    validateEmailAndPassword,
    validateQueryRequest,
}