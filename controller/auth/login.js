require('dotenv').config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require("../../service/userService");

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await getUserByEmail(email)
    
        console.log(result);
        if(!result){
            throw Error('record not found');
        }
 
        if(bcrypt.compareSync(password, result.password_digest)){
            const token = jwt.sign({ result }, process.env.JWT_ACCESS_KEY, {
                expiresIn: "24h"
            });
    
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