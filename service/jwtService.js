require('dotenv').config()
const jwt = require('jsonwebtoken');

function generateToken(user){
    const token = jwt.sign({ user }, process.env.JWT_ACCESS_KEY, {
        expiresIn: process.env.JWT_EXPIRED
    });

    return token;
}

const authJWT = (req, res, next) => {
    const token = req.headers['token']

    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: 'error',
                message: 'Jwt was expired'
            });
        }
        req.auth = decoded;
        next();
    })
}


module.exports = {
    generateToken,
    authJWT
}