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
        return {
            status: false,
            message: detail_error
        }
    }

    return {
        status: true
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
        return {
            status: false,
            message: detail_error
        }
    }
    return {
        status: true
    }
}

function validateHeadersRequest(req, next, schema, res) {
    const options = {
        abortEarly: true, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.headers, options);
    if (error) {
        detail_error = error.details.map(x => x.message).join(', ')
        return {
            status: false,
            message: detail_error
        }
    }
    return {
        status: true
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
        return {
            status: false,
            message: detail_error
        }
    }
    return {
        status: true
    }
}

function validateEmailAndPassword(email, password){
    if(!validatorEmail.isEmail(email) && password.length < 8){
        return {
            status: false,
            message: "Kesalahan validasi",
            errors: [
                "Email tidak valid",
                "Kata sandi harus terdiri dari minimal 8 karakter"
              ]
        }
    }

    return {
        status: true
    }
}

function validatePassword(password){
    if(password < 8){
        return {
            status: false,
            message: "Kesalahan validasi",
            errors: [
                "Kata sandi harus terdiri dari minimal 8 karakter"
              ]
        }
    }
    return {
        status: true
    }
}

function validateEmail(email){
    if(!validatorEmail.isEmail(email)){
        return {
            status: false,
            message: "Kesalahan validasi",
            errors: [
                "Email tidak valid"
              ]
        }
    }
    return {
        status: true
    }
}

module.exports = {
    validateEmail,
    validateRequest,
    validatePassword,
    validateParamsRequest,
    validateEmailAndPassword,
    validateQueryRequest,
    validateHeadersRequest
}