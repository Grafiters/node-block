require('dotenv').config()

const bcrypt = require('bcrypt');
const { validateEmailRegister } = require("../../service/validationService");
const { getUserByTokenActivation, getUserByEmail } = require("../../service/userService");
const { registerMailer, resendRegisterMailer } = require("../../service/mailerService");
const model = require("../../db/models");

exports.forgotPassword = async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = "Register Form to user without google credentials"

    /*    #swagger.parameters['password'] = {
            in: 'body',
            description: 'Login form user.',
            schema: { $ref: '#/components/User/Request/ForgotPassword' }
    } */

    /* #swagger.responses[201] = {
            description: 'Example response Success',
            schema: { $ref: '#/components/Code/Success' }
    } */

    /* #swagger.responses[422] = {
            description: 'Example response failed',
            schema: { $ref: '#/components/Code/Failed' }
    } */

    /* #swagger.responses[500] = {
            description: 'Example response failed',
            schema: { $ref: '#/components/Code/Failed' }
    } */

    const { email } = req.body

    const token = generateTokenEmail(5)

    try{
        const data = await validateEmailRegister(email);

        if(!data){
            return res.status(422).send({
                status: false,
                message: 'Pengiriman email pemulihan kata sandi gagal. Email tidak ditemukan.'
            });
        }

        const sendMailer = await resendRegisterMailer(email, 'Rest Password')
        
        return res.status(201).send({
            status: true,
            message: 'Email pemulihan kata sandi berhasil dikirim. Silakan cek email Anda.'
        })
    } catch ( err ){
        console.log(err);
        res.status(500).send({
            status: false,
            message: err
        });
    }
}

exports.resetPassword = async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = "Register Form to user without google credentials"

    /*    #swagger.parameters['password'] = {
            in: 'body',
            description: 'Login form user.',
            schema: { $ref: '#/components/User/Request/ResetPassword' }
    } */

    /* #swagger.responses[201] = {
            description: 'Example response Success',
            schema: { $ref: '#/components/Code/Success' }
    } */

    /* #swagger.responses[422] = {
            description: 'Example response failed',
            schema: { $ref: '#/components/Code/Failed' }
    } */

    /* #swagger.responses[500] = {
            description: 'Example response failed',
            schema: { $ref: '#/components/Code/Failed' }
    } */
    const { email, reset_token, new_password } = req.body

    const data = await validateEmailRegister(email);

    if(!data){
        return res.status(422).send({
            status: false,
            message: 'Pengiriman email pemulihan kata sandi gagal. Email tidak ditemukan.'
        });
    }

    const params = {
        password_digest: await bcrypt.hash(new_password, 10)
    }
    try{

        model.User.update(params, {
            where: { email: email }
        }).then(num => {
            if (num == 1){
                res.status(201).send({
                    status: true,
                    message: "Reset kata sandi berhasil. Kata sandi Anda telah diperbarui."
                })
            }else{
                res.status(422).send({
                    status: false,
                    message: 'Reset kata sandi gagal. Token tidak valid atau sudah kedaluwarsa.'
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(422).send({
                status: false,
                message: "Terjadi kesalahan saat memproses reset kata sandi. Silakan coba lagi nanti."
              });
        })
    } catch ( err ){
        console.log(err);
        res.status(500).send({
            status: false,
            message: err
        });
    }
}