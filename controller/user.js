const models = require("../db/models");
const User = models.User;

const { generateOtp, generateTotpSecret } = require('../service/totpService.js');

exports.getAllUser = async (req, res) => {
    try {
        const {
            page = 0,
            show = 10,
            sortBy = 'created_at',
            orderBy = 'ASC',
        } = req.query;
        const users = await User.findAndCountAll({
            order: [[sortBy, orderBy]],
            offset: page * show,
            limit: show,
        });
        
        return res.status(200).json(users);
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