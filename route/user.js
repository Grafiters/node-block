const { Router } = require('express');
const UserRouter = new Router();
const {authJWT} = require('../service/jwtService')

const {
    toptGenerate
} = require('../controller/user');

UserRouter.get('/user/generate-otp', authJWT, toptGenerate);

module.exports = UserRouter;