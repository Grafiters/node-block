const { Router } = require('express');
const UserRouter = new Router();
const {authJWT} = require('../service/jwtService')

const {
    toptGenerate,
    userProfile
} = require('../controller/user');

UserRouter.get('/profile', authJWT, userProfile);
UserRouter.get('/generate-otp', authJWT, toptGenerate);

module.exports = UserRouter;