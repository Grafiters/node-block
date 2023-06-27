const { Router } = require('express');
const AuthRouter = new Router();

const {
    registerUser,
    activationEmail,
    registerWithGoogle
} = require('../controller/auth/register');

const {
    userLogin
} = require('../controller/auth/login');

const {
    toptGenerate
} = require('../controller/captcha');

AuthRouter.post('/login', userLogin);
AuthRouter.post('/register', registerUser);
AuthRouter.post('/register/google', registerWithGoogle);
AuthRouter.get('/activate-email/:activation_token', activationEmail);
AuthRouter.get('/otp-generate', toptGenerate);

module.exports = AuthRouter;