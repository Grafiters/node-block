const { Router } = require('express');
const GeetestRouter = new Router();

const {
    generateGeetest,
    validateGeetest
} = require('../controller/captcha');

GeetestRouter.get('/register', generateGeetest);
GeetestRouter.post('/verify', validateGeetest);

module.exports = GeetestRouter;