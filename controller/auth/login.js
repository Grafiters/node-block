require('dotenv').config()
const bcrypt = require('bcrypt');
const validatorEmail = require('validator');

const { getUserByEmail, getUserByEmailAndGoogleId } = require("../../service/userService");
const { validateUserStatus, validateTokenOtp } = require("../../service/validationService");
const { verifyGeetest } = require('../../service/geetestService.js')
const { generateToken } = require("../../service/jwtService");

exports.userLogin = async (req, res) => {
    /*	#swagger.requestBody = {
            schema: { 
                properties: {
                    email: {type: 'string', required: true},
                    password: {type: 'string', required: true},
                    captcha: {
                        type: 'object',
                        required: false,
                        properties: {
                            geetestChallenge: {type: 'string', reqquired: false},
                            geetestValidate: {type: 'string', reqquired: false},
                            geetestSeccode: {type: 'string', reqquired: false}
                        },
                    },
                    otp_token: {type: 'integer', required: false}
                }
             }
        }

        #swagger.responses[200] = {
            schema: { 
                status: 'true/false',
                message: 'Login Berhasil',
                token: 'some access token',
             }
        }
    */
    const { email, password } = req.body;

    if(process.env.GEETEST_ENABLED && process.env.NODE_ENV == 'development' ){
        const {geetestChallenge, geetestValidate, geetestSeccode} = req.body.captcha;

        geetestVerify = await verifyGeetest(geetestChallenge, geetestValidate, geetestSeccode)

        if(geetestVerify === null){
            return res.status(406).send({
                status: false,
                message: 'Invalid Geetest challenge'
            });
        }
    }

    if(!validatorEmail.isEmail(req.body.email)){
        return res.status(406).json({
            status: false,
            message: "Kesalahan validasi",
            errors: [
                "Email tidak valid",
              ]
        });
    }

    try {
        const result = await getUserByEmail(email)
    
        if(!result){
            throw Error('record not found');
        }

        if (!validateUserStatus){
            return res.status(406).json({
                status: false,
                message: "Akun belum teraktivasi, silahkan aktivasi akun anda terlebih dahulu melalui email yang sudah dikirimkan"
            });
        }
        
        if(result.otp_enabled){
            if(req.body.otp_token === null){
                return res.status(406).json({
                    status: false,
                    message: "Missing otp token"
                });
            }

            const valid_otp = await validateTokenOtp(result, req.body.otp_token)
            if(!valid_otp){
                return res.status(406).json({
                    status: false,
                    message: "Invalid token otp"
                });
            }
        }

        if(result.password_digest === null){
            return res.status(406).json({
                status: false,
                message: "Login gagal. Email atau password tidak valid."
            });
        }

        if(!password){
            return res.status(406).json({
                status: false,
                message: "Login gagal. Email atau password tidak valid."
            });
        }

        if(bcrypt.compareSync(password, result.password_digest)){
            token = generateToken(result)
    
            return res.json({
                status: true,
                message: "Login berhasil.",
                token: token
            })
        }else{
            return res.status(406).json({
                status: false,
                message: "Login gagal. Email atau password tidak valid."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Terjadi kesalahan saat melakukan login. Silakan coba lagi nanti."
        });
    }
}

exports.userLoginGoogle = async (req, res) => {
    const { google_id } = req.body;
    try {
        const result = await getUserByEmailAndGoogleId(google_id)
    
        if(!result){
            res.status(406).json({
                status: false,
                message: "Login menggunakan akun Google gagal. ID Google tidak valid."
            });
        }

        if (!validateUserStatus){
            res.status(406).json({
                status: false,
                message: "Akun belum teraktivasi, silahkan aktivasi akun anda terlebih dahulu melalui email yang sudah dikirimkan"
            });
        }
 
        if(result.otp_enabled){
            if(req.body.otp_token === null){
                res.status(406).json({
                    status: false,
                    message: "Missing otp token"
                });
            }

            const valid_otp = await validateTokenOtp(result, req.body.otp_token)
            if(!valid_otp){
                res.status(406).json({
                    status: false,
                    message: "Invalid token otp"
                });
            }
        }

        token = generateToken(result)
        res.json({
            status: true,
            message: "Login menggunakan akun Google berhasil.",
            user: result,
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Terjadi kesalahan saat melakukan login. Silakan coba lagi nanti."
        });
    }
}