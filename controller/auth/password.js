require('dotenv').config()

const bcrypt = require('bcrypt');
const { validateEmailRegister } = require("../../service/validationService");
const { getUserByTokenActivation, getUserByEmail } = require("../../service/userService");
const { registerMailer, resendRegisterMailer } = require("../../service/mailerService");
const model = require("../../db/models");

exports.forgotPassword = async (req, res) => {
    const { email } = req.body

    const token = generateTokenEmail(5)

    try{
        const data = await validateEmailRegister(email);

        if(!data){
            return res.status(422).json({
                status: false,
                message: 'Pengiriman email pemulihan kata sandi gagal. Email tidak ditemukan.'
            });
        }

        const sendMailer = await resendRegisterMailer(email, 'Rest Password')
        
        return res.status(200).json({
            status: true,
            message: 'Email pemulihan kata sandi berhasil dikirim. Silakan cek email Anda.'
        })
    } catch ( err ){
        console.log(err);
        res.status(500).json({
            status: false,
            message: err
        });
    }
}

exports.resetPassword = async (req, res) => {
    const { email, reset_token, new_password } = req.body

    const data = await validateEmailRegister(email);

    if(!data){
        return res.status(422).json({
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
                res.status(201).json({
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
        res.status(500).json({
            status: false,
            message: err
        });
    }
}