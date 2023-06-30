'use strict'
const { Router } = require('express');
const AuthRouter = new Router();

const {
    loginSchema
} = require('../db/schema/auth')

const {
    registerUser,
    activationEmail,
    registerWithGoogle,
    resendActivationCode
} = require('../controller/auth/register');

const {
    userLogin,
    userLoginGoogle
} = require('../controller/auth/login');

const {
    toptGenerate
} = require('../controller/captcha');

AuthRouter.post('/auth/login',loginSchema, userLogin);
AuthRouter.post('/auth/register', registerUser);

AuthRouter.post('/auth/login/google', userLoginGoogle);
AuthRouter.post('/auth/register/google', registerWithGoogle);

AuthRouter.get('/auth/activate-email/:activation_token', activationEmail);
AuthRouter.get('/auth/otp-generate', toptGenerate);
AuthRouter.post('/auth/:email/resend', resendActivationCode);

AuthRouter.post('/auth/forgot-password', resendActivationCode);
AuthRouter.post('/auth/reset-password', resendActivationCode);

module.exports = AuthRouter;