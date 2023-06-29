require('dotenv').config()
const bcrypt = require('bcrypt');

const { getUserByEmail, getUserByEmailAndGoogleId } = require("../../service/userService");
const { validateUserStatus, validateTokenOtp } = require("../../service/validationService");
const { generateToken } = require("../../service/jwtService");

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await getUserByEmail(email)
    
        if(!result){
            throw Error('record not found');
        }

        if (!validateUserStatus){
            res.status(401).json({
                status: "error",
                message: "Akun belum teraktivasi, silahkan aktivasi akun anda terlebih dahulu melalui email yang sudah dikirimkan"
            });
        }
 
        if(result.otp_secret !== null){
            if(req.body.otp_token === null){
                res.status(401).json({
                    status: "error",
                    message: "Missing otp token"
                });
            }

            const valid_otp = await validateTokenOtp(result, req.body.otp_token)
            if(!valid_otp){
                res.status(401).json({
                    status: "error",
                    message: "Invalid token otp"
                });
            }
        }

        if(bcrypt.compareSync(password, result.password_digest)){
            token = generateToken(result.except())
    
            res.json({
                status: "success",
                message: "Login berhasil.",
                user: result,
                token: token
            })
        }else{
            res.status(401).json({
                status: "error",
                message: "Email, kata sandi, atau CAPTCHA salah."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Terjadi kesalahan saat melakukan login. Silakan coba lagi nanti."
        });
    }
}

exports.userLoginGoogle = async (req, res) => {
    const { email, google_id } = req.body;
    try {
        const result = await getUserByEmailAndGoogleId(email, google_id)
    
        if(!result){
            res.status(401).json({
                status: "error",
                message: "Akun belum terdaftar pada system, silahkan registrasi akun anda terseblih dahulu"
            });
        }

        if (!validateUserStatus){
            res.status(401).json({
                status: "error",
                message: "Akun belum teraktivasi, silahkan aktivasi akun anda terlebih dahulu melalui email yang sudah dikirimkan"
            });
        }
 
        if(result.otp_secret !== null){
            if(req.body.otp_token === null){
                res.status(401).json({
                    status: "error",
                    message: "Missing otp token"
                });
            }

            const valid_otp = await validateTokenOtp(result, req.body.otp_token)
            if(!valid_otp){
                res.status(401).json({
                    status: "error",
                    message: "Invalid token otp"
                });
            }
        }

        token = generateToken(result.except())
        res.json({
            status: "success",
            message: "Login berhasil.",
            user: result,
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Terjadi kesalahan saat melakukan login. Silakan coba lagi nanti."
        });
    }
}