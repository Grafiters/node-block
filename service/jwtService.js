require('dotenv').config()
const jwt = require('jsonwebtoken');
const userService = require('../service/userService')
const Joi = require('joi')
const j2s = require('joi-to-swagger')
const validation = require('../db/schema/index')

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
                    message: 'Invalid JWT Token'
                });
            }
            req.auth = decoded;

            next();
        })
    }
}

const authAdminJWT = (req, res, next) => {
    /*
        #swagger.security = [{
        "Bearer": {
            "type": "apiKey",
            "name": "token",
            "in": "header",
        }
    }]
    */
    const token = req.headers['token']

    const schema = Joi.object({
        token: Joi.string().required()
    })

    const valid_token = validation.validateHeadersRequest(req, next, schema, res)
    if(!valid_token.status) {
        return res.status(401).send({
            status: false,
            message: 'Auth token is undefined'
        })
    }

    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: false,
                message: 'Invalid JWT Token'
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
                    message: 'Invalid JWT Token'
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