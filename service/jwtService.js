require('dotenv').config()
const jwt = require('jsonwebtoken');
const userService = require('../service/userService')

function generateToken(user){
    const token = jwt.sign({ user }, process.env.JWT_ACCESS_KEY, {
        expiresIn: process.env.JWT_EXPIRED
    });

    return token;
}

async function validateApiKeyUser(req){
    const user = await userService.findUserByApiKeys(req)

    return user
}

const authJWT = async (req, res, next) => {
    const xApiKey = req.headers['x-api-key']

    if(xApiKey){
        req.auth = await validateApiKeyUser(xApiKey)
        next();
    }else{
        const token = req.headers['token']

        jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).send({
                    error: false,
                    message: 'Jwt was expired'
                });
            }
            req.auth = decoded;
            next();
        })
    }
}

const authAdminJWT = (req, res, next) => {
    const token = req.headers['token']

    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: false,
                message: 'Jwt was expired'
            });
        }
        if (decoded.user.role != 'Admin'){
            return res.status(401).send({
                error: false,
                message: 'User can\'t access fo this endpoint'
            });
        }

        req.auth = decoded;
        next();
    })
}

const authExecptionJWT = async (req, res, next) => {
    const xApiKey = req.headers['x-api-key']

    if(xApiKey){
        req.auth = await validateApiKeyUser(xApiKey)
        next();
    }else{
        const token = req.headers['token']

        jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    error: false,
                    message: 'Jwt was expired'
                });
            }
            if (decoded.user.role == 'Developer'){
                return res.status(401).send({
                    error: false,
                    message: 'User can\'t access fo this endpoint'
                });
            }

            req.auth = decoded;
            next();
        })
    }
}

module.exports = {
    generateToken,
    authExecptionJWT,
    authAdminJWT,
    authJWT
}