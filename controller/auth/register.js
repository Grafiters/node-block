const bcrypt = require('bcrypt');
const { validateEmailRegister } = require("../../service/validationService");
const { generateTokenEmail } = require("../../service/generateService");
const { getUserByTokenActivation } = require("../../service/userService");
const model = require("../../db/models");

exports.registerUser = async (req, res) => {
    // const {geetestChallenge, geetestValidate, geetestSeccode} = req.body.captcha;

    const token = generateTokenEmail(5)

    const params = {
        username: req.body.username,
        email: req.body.email,
        password_digest: await bcrypt.hash(req.body.password, 10),
        role: 'User',
        email_verification_token: token
    }

    try{
        const data = await validateEmailRegister(req.body.email);

        if(!data){
            return res.status(401).json({
                status: 'error',
                messages: 'Maaf, email sudah terdaftar, silahkan coba lagi'
            });
        }

        model.User.create(params)
        .then(submit => res.status(201)
            .send({
                status: "success",
                message: "Registrasi berhasil. Silakan periksa email Anda untuk verifikasi.",
                user: submit
            })
        )
    } catch ( err ){
        console.log(err);
        res.status(500).json({
            status: 'error',
            messages: err
        });
    }
}

exports.activationEmail = async (req, res) => {
    const token = req.params.activation_email;
    const user = await getUserByTokenActivation(token)

    if (user === null || user.email_verification_token != token){
        return res.status(401).json({
            status: 'error',
            messages: 'Maaf, activation token anda tidak valid atau sudah kadaluarsa'
        });
    }

    const params = {
        email_verified: true
    }

    try {
        model.User.update(params, {
            where: { email_verification_token: token }
        }).then(num => {
            if (num == 1){
                res.status(201).json({
                    status: "success",
                    message: "Activation Email Berhasil"
                })
            }else{
                res.status(401).send({
                    status: 'error',
                    message: 'Maaf, activation token anda tidak valid atau sudah kadaluarsa'
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                status: "error",
                message: "Terjadi kesalahan saat memproses reset kata sandi. Silakan coba lagi nanti."
              });
        })
    } catch (error) {
        console.log(err);
        res.status(500).send({
            status: "error",
            message: "Terjadi kesalahan saat memproses reset kata sandi. Silakan coba lagi nanti."
        });
    }
}