require('dotenv').config()
const bcrypt = require('bcrypt');
const validatorEmail = require('validator');

const { getUserByEmail, getUserByEmailAndGoogleId } = require("../../service/userService");
const { validateUserStatus } = require("../../service/validationService");
const { verifyGeetest } = require('../../service/geetestService.js')
const { generateToken } = require("../../service/jwtService");
const totpService = require('../../service/totpService');

exports.userLogin = async (req, res) => {
    /* 	#swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to sign in a specific user' */

    /*	
        #swagger.parameters['login'] = {
            in: 'body',
            description: 'Login Form.',
            required: true,
            schema: { $ref: "#/definitions/Auth/Login" },
            examples: { example: {$ref: "#/components/examples/Login"} }
        }

        #swagger.responses[201] = {
            description: 'Login',
            schema: { $ref: '#/components/schemas/Login' }
        }

        #swagger.responses[422] = {
            description: 'Login Error',
            schema: {
                geetest: {
                    status: false,
                    message: 'Invalid Geetest challenge'
                },
                akun: {
                    status: false,
                    message: "Kesalahan validasi",
                    errors: [
                        "Email tidak valid", "password kurang dari 8 karakter", "Login gagal. Email atau password tidak valid."
                    ]
                },
                twoFactor: {
                    status: false,
                    message: ["Missing otp token", "invalid otp token"]
                },
                otherValidation: {
                    status: false,
                    message: "Akun belum teraktivasi, silahkan aktivasi akun anda terlebih dahulu melalui email yang sudah dikirimkan"
                }
            }
        }

        #swagger.responses[500] = {
            description: 'Login',
            schema: { 
                status: false,
                message: "Terjadi kesalahan saat melakukan login. Silakan coba lagi nanti."
            }
        }
    */

   console.log(req.body);
    const { email, password } = req.body;

    if(process.env.GEETEST_ENABLED && process.env.NODE_ENV == 'development' ){
        const {geetestChallenge, geetestValidate, geetestSeccode} = req.body.captcha;

        geetestVerify = await verifyGeetest(geetestChallenge, geetestValidate, geetestSeccode)

        if(geetestVerify === null){
            return res.status(422).send({
                status: false,
                message: 'Invalid Geetest challenge'
            });
        }
    }

    if(!validatorEmail.isEmail(req.body.email)){
        return res.status(422).json({
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
            return res.status(422).json({
                status: false,
                message: "Email tidak ditemukan"
            });
        }

        if (!validateUserStatus){
            return res.status(422).json({
                status: false,
                message: "Akun belum teraktivasi, silahkan aktivasi akun anda terlebih dahulu melalui email yang sudah dikirimkan"
            });
        }
        
        if(result.otp_enabled){
            if(req.body.otp_token === null){
                return res.status(422).json({
                    status: false,
                    message: "Missing otp token"
                });
            }

            const valid_otp = await totpService.validateTokenOtp(result, req.body.otp_token)
            if(!valid_otp){
                return res.status(422).json({
                    status: false,
                    message: "Invalid token otp"
                });
            }
        }

        if(result.password_digest === null){
            return res.status(422).json({
                status: false,
                message: "Login gagal. Email atau password tidak valid."
            });
        }

        if(!password){
            return res.status(422).json({
                status: false,
                message: "Login gagal. Email atau password tidak valid."
            });
        }

        if(bcrypt.compareSync(password, result.password_digest)){
            token = generateToken(result)
    
            return res.status(201).json({
                status: true,
                message: "Login berhasil.",
                token: token
            })
        }else{
            return res.status(422).json({
                status: false,
                message: "Login gagal. Email atau password tidak valid."
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Terjadi kesalahan saat melakukan login. Silakan coba lagi nanti."
        });
    }
}

exports.userLoginGoogle = async (req, res) => {
    /* 	#swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to sign in a specific user' */

    /*	
        #swagger.parameters['Login Google'] = {
            in: 'body',
            description: 'Login Form.',
            required: true,
            schema: {
                google_id: { 
                    require: true,
                    type: 'string',
                } 
            }
        }

        #swagger.responses[201] = {
            description: 'Login',
            schema: { $ref: '#/components/schemas/Login' }
        }

        #swagger.responses[422] = {
            description: 'Login Error',
            schema: {
                akun: {
                    status: false,
                    message: "Kesalahan validasi",
                    errors: [
                        "Akun google belum terdaftar pada system",
                    ]
                },
                twoFactor: {
                    status: false,
                    message: ["Missing otp token", "invalid otp token"]
                },
                otherValidation: {
                    status: false,
                    message: "Akun belum teraktivasi, silahkan aktivasi akun anda terlebih dahulu melalui email yang sudah dikirimkan"
                }
            }
        }

        #swagger.responses[500] = {
            description: 'Login',
            schema: { 
                status: false,
                message: "Terjadi kesalahan saat melakukan login. Silakan coba lagi nanti."
            }
        }
    */
    const { google_id } = req.body;
    try {
        const result = await getUserByEmailAndGoogleId(google_id)
    
        if(!result){
            res.status(422).json({
                status: false,
                message: "Login menggunakan akun Google gagal. ID Google tidak valid."
            });
        }

        if (!validateUserStatus){
            res.status(422).json({
                status: false,
                message: "Akun belum teraktivasi, silahkan aktivasi akun anda terlebih dahulu melalui email yang sudah dikirimkan"
            });
        }
 
        if(result.otp_enabled){
            if(req.body.otp_token === null){
                res.status(422).json({
                    status: false,
                    message: "Missing otp token"
                });
            }

            const valid_otp = await totpService.validateTokenOtp(result, req.body.otp_token)
            if(!valid_otp){
                res.status(422).json({
                    status: false,
                    message: "Invalid otp token"
                });
            }
        }

        token = generateToken(result)
        return res.status(201).json({
            status: true,
            message: "Login menggunakan akun Google berhasil.",
            user: result,
            token: token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Terjadi kesalahan saat melakukan login. Silakan coba lagi nanti."
        });
    }
}