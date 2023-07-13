const bcrypt = require('bcrypt');

const Subscription = require('../service/entitiesService/subcriptionEntities')
const User = require('../service/entitiesService/userEntities')
const Activity = require('../service/entitiesService/activityEntities')
const userService = require('../service/userService');
const totpService = require('../service/totpService.js');
const validationService = require("../service/validationService");

exports.userProfile = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = "Login Form to user without google credentials"

    /* #swagger.responses[201] = {
            description: 'Example response Success',
            schema: { $ref: '#/components/User/Response' }
    } */
    try {
        const user = await userService.findUserByID(req.auth.user.id)

        return res.status(200).send({
            status: true,
            message: 'Berhasil mengambil data user',
            data: new User(user).getUserLoginEntities()
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: "Terjadi kesalahan saat memproses Profile User. Silakan coba lagi nanti"
        });
    }
}

exports.changePassword = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = "Login Form to user without google credentials"

    /*    #swagger.parameters['password'] = {
            in: 'body',
            description: 'Login form user.',
            schema: { $ref: '#/components/User/Request/ChangePassword' }
    } */

    /* #swagger.responses[201] = {
            description: 'Example response Success',
            schema: { $ref: '#/components/User/Login' }
    } */

    /* #swagger.responses[422] = {
            description: 'Example response failed',
            schema: { $ref: '#/components/Code/Failed' }
    } */

    /* #swagger.responses[500] = {
            description: 'Example response failed',
            schema: { $ref: '#/components/Code/Success' }
    } */
    const {old_password, new_password} = req.body;
    const user = await userService.findUserByID(req.auth.user.id)

    try {
        const checking_old_password = validationService.validatePasswordForChange(old_password, user.password_digest)
        if (checking_old_password){
            const update = await userService.updateUserPasswordByID(user.id, await bcrypt.hash(new_password, 10))
            if(update){
                return res.status(201).send({
                    status: true,
                    message: 'Kata sandi berhasil diubah.'
                });
            }
        }

        return res.status(422).send({
            status: false,
            message: 'Perubahan kata sandi gagal. Kata sandi lama tidak valid.'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: "Terjadi kesalahan saat memproses Rubah password. Silakan coba lagi nanti"
        });
    }
}

exports.toptGenerate = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = "Login Form to user without google credentials"

    const user = await userService.findUserByID(req.auth.user.id)
    if(user.otp_enabled){
        return res.status(422).send({
            status: false,
            message: "two-factor authentication already enabled"
        });
    }

    try {
        const totpUrl = await totpService.generateOtp()
        const createTotp = await totpService.generateTotpSecret(totpUrl);

        return res.status(200).send({
            status: true,
            message: 'generate otp berhasil',
            data: createTotp
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: "Terjadi kesalahan saat memproses tow-factor authtenticator. Silakan coba lagi nanti"
        });
    }
}

exports.enableTwoFactor = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.summary = "Login Form to user without google credentials"

    const { otp_secret, otp_code} = req.body;
    const user = await userService.findUserByID(req.auth.user.id)
    const validateOtp = await totpService.validateOtp(user.otp_secret, otp_code);
    if(validateOtp){
        return res.status(422).send({
            status: false,
            message: "two-factor authentication already enabled"
        });
    }

    try {
        const validateOtp = await totpService.validateOtp(otp_secret, otp_code);
        if(validateOtp) {
            const update = await userService.updateUserOtpSecretByID(req.auth.user.id, otp_secret, true)
            if(update){
                return res.status(200).send({
                    status: true,
                    message: 'Verifikasi dua faktor (2FA) berhasil diaktifkan.'
                })
            }
        }

        return res.status(422).send({
            status: false,
            message: 'Verifikasi dua faktor (2FA) gagal. Kode OTP tidak valid.'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: "Terjadi kesalahan saat memproses tow-factor authtenticator. Silakan coba lagi nanti"
        });
    }
}

exports.verifyTwoFactor = async (req, res) => {
    const { otp_code } = req.body;
    const user = await userService.findUserByID(req.auth.user.id)
    try {
        const validateOtp = await totpService.validateOtp(user.otp_secret, otp_code);
        if(validateOtp) {
            return res.status(200).send({
                status: true,
                message: 'Verifikasi dua faktor (2FA) berhasil.'
            })
        }

        return res.status(422).send({
            status: false,
            message: 'Verifikasi dua faktor (2FA) gagal. Kode OTP tidak valid.'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: "Terjadi kesalahan saat memproses tow-factor authtenticator. Silakan coba lagi nanti"
        });
    }
}

exports.disableTwoFactor = async (req, res) => {
    const { otp_code } = req.body;
    const user = await userService.findUserByID(req.auth.user.id)
    try {
        const validateOtp = await totpService.validateOtp(user.otp_secret, otp_code);
        if(validateOtp) {
            const update = await userService.updateUserOtpSecretByID(req.auth.user.id, null, false)
            if(update){
                return res.status(200).send({
                    status: true,
                    message: 'Verifikasi dua faktor (2FA) berhasil dinonaktifkan.'
                })
            }
        }

        return res.status(422).send({
            status: false,
            message: 'Verifikasi dua faktor (2FA) gagal. Kode OTP tidak valid.'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: "Terjadi kesalahan saat memproses tow-factor authtenticator. Silakan coba lagi nanti"
        });
    }
}

exports.nonActiveAccount = async (req, res) => {
    try {
        const update = await userService.updateUserStatus(req.auth.user.id, 'nonactive')
        if(update){
            return res.status(201).send({
                status: true,
                message: "Akun berhasil dinonaktifkan."
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: "Terjadi kesalahan saat memproses tow-factor authtenticator. Silakan coba lagi nanti"
        });
    }
}

exports.currentPlan = async (req, res) => {
    try {
        const subscribe = await userService.getCurrentPackageUser(req.auth.user.id)
        if(subscribe !== null){
            return res.status(200).send({
                status: true,
                data: new Subscription(subscribe, subscribe.Packages)
            })
        }

        return res.status(422).send({
            status: false,
            data: "Paket saat ini tidak ditemukan."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: "Terjadi kesalahan saat memproses tow-factor authtenticator. Silakan coba lagi nanti"
        });
    }
}

exports.activityUser = async (req, res) => {
    try {
        const activity = await userService.getActivityUser(req.auth.user.id)
        return res.status(200).send({
            status: true,
            data: new Activity(activity).getActivityUser()
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: "Terjadi kesalahan saat memproses tow-factor authtenticator. Silakan coba lagi nanti"
        });
    }
}