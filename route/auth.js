'use strict'
const { Router } = require('express');
const AuthRouter = new Router();

const schema = require('../db/schema/auth')

const register = require('../controller/auth/register');
const password = require('../controller/auth/password');
const login = require('../controller/auth/login');

AuthRouter.post('/auth/login', schema.loginSchema, login.userLogin);
AuthRouter.post('/auth/register',schema.registerSchema, register.registerUser);

AuthRouter.post('/auth/login/google', schema.loginGoogleSchema, login.userLoginGoogle);
AuthRouter.post('/auth/register/google', schema.registerGoogleSchema, register.registerWithGoogle);

AuthRouter.get('/auth/activate-email/:activation_token', schema.activationCodeSchema, register.activationEmail);
AuthRouter.post('/auth/:email/resend', schema.resendActivationCodeSchema, register.resendActivationCode);

AuthRouter.post('/auth/forgot-password', schema.forgotPasswordSchema, password.forgotPassword);
AuthRouter.post('/auth/reset-password', schema.resetPasswordSchema, password.resetPassword);

module.exports = AuthRouter;