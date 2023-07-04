const bcrypt = require('bcrypt');

const Subscription = require('../service/entitiesService/subcriptionEntities')
const User = require('../service/entitiesService/userEntities')
const Activity = require('../service/entitiesService/activityEntities')
const userService = require('../service/userService');
const totpService = require('../service/totpService.js');
const validationService = require("../service/validationService");

exports.userProfile = async (req, res) => {
    try {
        const user = await userService.findUserByID(req.auth.user.id)

        return res.status(200).json({
            status: true,
            message: 'Berhasil mengambil data user',
            data: new User(user).getUserLoginEntities()
        });
    } catch (error) {
        console.log(error);
    }
}

exports.changePassword = async (req, res) => {
    const {old_password, new_password} = req.body;
    const user = await userService.findUserByID(req.auth.user.id)

    try {
        const checking_old_password = validationService.validatePasswordForChange(old_password, user.password_digest)
        if (checking_old_password){
            const update = await userService.updateUserPasswordByID(user.id, await bcrypt.hash(new_password, 10))
            if(update){
                return res.status(201).json({
                    status: true,
                    message: 'Kata sandi berhasil diubah.'
                });
            }
        }

        return res.status(422).json({
            status: false,
            message: 'Perubahan kata sandi gagal. Kata sandi lama tidak valid.'
        });
    } catch (error) {
        console.log(error);
    }
}

exports.toptGenerate = async (req, res) => {
    if(validate){
        return res.status(422).json({
            status: false,
            message: "two-factor authentication already enabled"
        });
    }
    try {
        const totpUrl = await totpService.generateOtp()
        const createTotp = await totpService.generateTotpSecret(totpUrl);

        return res.status(200).json({
            status: true,
            message: 'generate otp berhasil',
            data: createTotp
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Terjadi kesalahan saat memproses tow-factor authtenticator. Silakan coba lagi nanti"
        });
    }
}

exports.enableTwoFactor = async (req, res) => {
    if(validate){
        return res.status(422).json({
            status: false,
            message: "two-factor authentication already enabled"
        });
    }

    const { otp_secret, otp_code} = req.body;
    try {
        const validateOtp = await totpService.validateOtp(otp_secret, otp_code);
        if(validateOtp) {
            const update = await userService.updateUserOtpSecretByID(req.auth.user.id, otp_secret, true)
            if(update){
                return res.status(200).json({
                    status: true,
                    message: 'Verifikasi dua faktor (2FA) berhasil diaktifkan.'
                })
            }
        }

        return res.status(422).json({
            status: false,
            message: 'Verifikasi dua faktor (2FA) gagal. Kode OTP tidak valid.'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
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
            return res.status(200).json({
                status: true,
                message: 'Verifikasi dua faktor (2FA) berhasil.'
            })
        }

        return res.status(422).json({
            status: false,
            message: 'Verifikasi dua faktor (2FA) gagal. Kode OTP tidak valid.'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
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
                return res.status(200).json({
                    status: true,
                    message: 'Verifikasi dua faktor (2FA) berhasil dinonaktifkan.'
                })
            }
        }

        return res.status(422).json({
            status: false,
            message: 'Verifikasi dua faktor (2FA) gagal. Kode OTP tidak valid.'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Terjadi kesalahan saat memproses tow-factor authtenticator. Silakan coba lagi nanti"
        });
    }
}

exports.nonActiveAccount = async (req, res) => {
    try {
        const update = await userService.updateUserStatus(req.auth.user.id, 'nonactive')
        if(update){
            return res.status(201).json({
                status: true,
                message: "Akun berhasil dinonaktifkan."
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Terjadi kesalahan saat memproses tow-factor authtenticator. Silakan coba lagi nanti"
        });
    }
}

exports.currentPlan = async (req, res) => {
    try {
        const subscribe = await userService.getCurrentPackageUser(req.auth.user.id)
        if(subscribe !== null){
            return res.status(200).json({
                status: true,
                data: new Subscription(subscribe, subscribe.Packages)
            })
        }

        return res.status(422).json({
            status: false,
            data: "Paket saat ini tidak ditemukan."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Terjadi kesalahan saat memproses tow-factor authtenticator. Silakan coba lagi nanti"
        });
    }
}

exports.activityUser = async (req, res) => {
    try {
        const activity = await userService.getActivityUser(req.auth.user.id)
        return res.status(200).json({
            status: true,
            data: new Activity(activity).getActivityUser()
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Terjadi kesalahan saat memproses tow-factor authtenticator. Silakan coba lagi nanti"
        });
    }
}