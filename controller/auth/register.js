require('dotenv').config()
const bcrypt = require('bcrypt');
const validatorEmail = require('validator');

const { validateEmailRegister, validateEmailRegisterGoogle } = require("../../service/validationService");
const { getUserByTokenActivation, getUserByEmail } = require("../../service/userService");
const { registerMailer, resendRegisterMailer } = require("../../service/mailerService");
const { generateTokenEmail } = require("../../service/generateService");
const { verifyGeetest } = require('../../service/geetestService.js')
const User = require('../../service/entitiesService/userEntities')
const model = require("../../db/models");

exports.registerUser = async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = "Register Form to user without google credentials"

    /*    #swagger.parameters['register'] = {
            in: 'body',
            description: 'Login form user.',
            schema: { $ref: '#/components/User/Request/Register' }
    } */

    /* #swagger.responses[201] = {
            description: 'Example response Success',
            schema: { $ref: '#/components/User/Response' }
    } */

    /* #swagger.responses[422] = {
            description: 'Example response failed',
            schema: { $ref: '#/components/Code/Failed' }
    } */

    /* #swagger.responses[500] = {
            description: 'Example response failed',
            schema: { $ref: '#/components/Code/Failed' }
    } */

    if(process.env.GEETEST_ENABLED && process.env.NODE_ENV == 'production' ){
        const {geetestChallenge, geetestValidate, geetestSeccode} = req.body.captcha;

        geetestVerify = await verifyGeetest(geetestChallenge, geetestValidate, geetestSeccode)

        if(geetestVerify === null){
            return res.status(422).send({
                status: false,
                message: 'Invalid Geetest challenge'
            });
        }
    }

    const token = generateTokenEmail(5)

    const params = {
        email: req.body.email,
        password_digest: await bcrypt.hash(req.body.password, 10),
        role: 'User',
        email_verification_token: token
    }

    try{
        const data = await validateEmailRegister(req.body.email);

        if(!data){
            return res.status(422).json({
                status: false,
                message: 'Maaf, email sudah terdaftar, silahkan coba lagi'
            });
        }

        model.User.create(params)
            .then(submit => 
                registerMailer(submit, 'New Account')
            ).then(record => 
                res.status(201)
                .send({
                    status: true,
                    message: "Registrasi berhasil. Silakan periksa email Anda untuk verifikasi.",
                    user: new User(record).getUserRegisEntities()
                })
            )
    } catch ( err ){
        console.log(err);
        res.status(500).json({
            status: false,
            message: err
        });
    }
}

exports.activationEmail = async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = "Activation Email user"

    /*    #swagger.parameters['register'] = {
            in: 'body',
            description: 'Login form user.',
            schema: { $ref: '#/components/User/Request/ActivationToken' }
    } */

    /* #swagger.responses[201] = {
            description: 'Example response Success',
            schema: { $ref: '#/components/Code/Success' }
    } */

    /* #swagger.responses[422] = {
            description: 'Example response failed',
            schema: { $ref: '#/components/Code/Failed' }
    } */

    const token = req.params.activation_token;
    const user = await getUserByTokenActivation(token)

    if (user === null || user.email_verification_token != token){
        return res.status(422).json({
            status: false,
            message: 'Maaf, activation token anda tidak valid atau sudah kadaluarsa'
        });
    }

    const userData = await getUserByEmail(user.email)
    if (userData.email_verified_at !== null){
        return res.status(422).json({
            status: false,
            message: `Maaf, Email sudah teraktivasi pada ${userData.email_verified_at}`
        });
    }

    const params = {
        email_verified_at: new Date()
    }

    try {
        model.User.update(params, {
            where: { email_verification_token: token }
        }).then(num => {
            if (num == 1){
                res.status(201).json({
                    status: true,
                    message: "Activation Email Berhasil"
                })
            }else{
                res.status(422).send({
                    status: false,
                    message: 'Maaf, activation token anda tidak valid atau sudah kadaluarsa'
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(422).send({
                status: false,
                message: "Terjadi kesalahan saat memproses reset kata sandi. Silakan coba lagi nanti."
              });
        })
    } catch (error) {
        console.log(err);
        res.status(500).send({
            status: false,
            message: "Terjadi kesalahan saat memproses reset kata sandi. Silakan coba lagi nanti."
        });
    }
}

exports.resendActivationCode = async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = "Resend activation code via email"

    /*    #swagger.parameters['register'] = {
            in: 'body',
            description: 'Login form user.',
            schema: { $ref: '#/components/User/Request/ResendActivationEmail' }
    } */

    /* #swagger.responses[201] = {
            description: 'Example response Success',
            schema: { $ref: '#/components/Code/Success' }
    } */

    /* #swagger.responses[422] = {
            description: 'Example response failed',
            schema: { $ref: '#/components/Code/Failed' }
    } */
    const { email } = req.params;
    
    const data = await validateEmailRegister(email);

    if(data){
        return res.status(422).json({
            status: false,
            message: 'Pengiriman ulang email aktivasi gagal. Email tidak ditemukan.'
        });
    }

    const user = await getUserByEmail(email)
    if (user.email_verified_at !== null){
        return res.status(422).json({
            status: false,
            message: `Maaf, Email sudah teraktivasi pada ${user.email_verified_at}`
        });
    }

    const token = generateTokenEmail(5)
    const params = {
        email_verification_token: token
    }

    try {
        model.User.update(params, {
            where: { email: email }
        }).then(num => {
            if (num == 1){
                resendRegisterMailer(data, token)
            }
        }).then(() => {
            res.status(201).json({
                status: true,
                message: "Email aktivasi berhasil dikirim ulang. Silakan cek email Anda."
            })
        }).catch(err => {
            console.log(err);
            res.status(422).send({
                status: false,
                message: "Pengiriman ulang email aktivasi gagal. Email tidak ditemukan."
              });
        })
    } catch (error) {
        console.log(err);
        res.status(500).send({
            status: false,
            message: "Pengiriman ulang email aktivasi gagal. silahkan coba beberapa saat lagi"
        });
    }
}

exports.registerWithGoogle = async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = "Register Form to user with google credentials"

    /*    #swagger.parameters['register'] = {
            in: 'body',
            description: 'Login form user.',
            schema: { $ref: '#/components/User/Request/RegisterWithGoogle' }
    } */

    /* #swagger.responses[201] = {
            description: 'Example response Success',
            schema: { $ref: '#/components/User/Response' }
    } */

    /* #swagger.responses[422] = {
            description: 'Example response failed',
            schema: { $ref: '#/components/Code/Failed' }
    } */

    const { google_id, email } = req.body

    const token = generateTokenEmail(5)

    const params = {
        username: req.body.username,
        email: req.body.email,
        google_id: google_id,
        role: 'User',
        email_verification_token: token
    }

    try{
        const data = await validateEmailRegister(email);
        const google = await validateEmailRegisterGoogle(email, google_id);

        if(!data || !google){
            return res.status(422).json({
                status: false,
                message: 'Maaf, email sudah terdaftar, silahkan coba lagi'
            });
        }

        model.User.create(params)
            .then(submit => 
                registerMailer(submit, 'New Account')
            ).then(record => 
                res.status(201)
                .send({
                    status: true,
                    message: "Registrasi berhasil. Silakan periksa email Anda untuk verifikasi.",
                    user: new User(record).getUserRegisEntities()
                })
            )
    } catch ( err ){
        console.log(err);
        res.status(500).json({
            status: false,
            message: err
        });
    }
}