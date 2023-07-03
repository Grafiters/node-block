const validatorEmail = require('validator');

function validateRequest(req, next, schema, res) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        detail_error = error.details.map(x => x.message).join(', ')
        res.status(422).send({
            status: false,
            message: detail_error
        })
    } else {
        req.body = value;
        next();
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
    validateEmailAndPassword
}