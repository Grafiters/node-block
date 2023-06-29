require('dotenv').config();

const {registerGeetest, verifyGeetest} = require('../service/geetestService.js')

exports.generateGeetest = async (req, res) => {
    try {
        challenge = await registerGeetest()
        if(typeof challenge === 'undefined'){
            throw new Error('Terjadi kesalahan saat memproses generate geetest challenge. Silakan coba lagi nanti');
        }
        
        return res.status(200).json(challenge);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Terjadi kesalahan saat memproses generate geetest challenge. Silakan coba lagi nanti"
        });
    }
}

exports.validateGeetest = async (req, res) => {
    const { geetestChallenge, geetestValidate, geetestSeccode } = req.body;

    try {
        const result = await verifyGeetest(geetestChallenge, geetestValidate, geetestSeccode);
        if(result === null){
            return JSON.stringify({
                status: false,
                message: 'Invalid Geetest challenge'
            });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: "error",
            message: "Terjadi kesalahan saat memproses verify captcha. Silakan coba lagi nanti"
        });
    }
}