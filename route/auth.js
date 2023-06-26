const { Router } = require('express');
const AuthRouter = new Router();

const {
    registerUser,
    activationEmail
} = require('../controller/auth/register');

const {
    userLogin
} = require('../controller/auth/login');

AuthRouter.post('/login', userLogin);
AuthRouter.post('/register', registerUser);
AuthRouter.get('/activate-email/:activation_email', activationEmail);

module.exports = AuthRouter;