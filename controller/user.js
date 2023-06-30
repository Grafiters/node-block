const models = require("../db/models");

const { generateOtp, generateTotpSecret } = require('../service/totpService.js');
const { findUserByID } = require('../service/userService');
const User = require('../service/entitiesService/userEntities')

exports.userProfile = async (req, res) => {
    try {
        const user = await findUserByID(req.auth.user.id)
        
        return res.status(200).json({
            status: true,
            data: new User(user).getUserLoginEntities()
        });
    } catch (error) {
        console.log(error);
    }
}

exports.toptGenerate = async (req, res) => { 
    try {
        const totpUrl = await generateOtp()
        const createTotp = await generateTotpSecret(totpUrl);

        return res.status(200).json(createTotp);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Terjadi kesalahan saat memproses tow-factor authtenticator. Silakan coba lagi nanti"
        });
    }
}