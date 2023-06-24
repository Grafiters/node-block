const { Router } = require('express');
const UserRouter = new Router();

const {
    getAllUser,
} = require('../controller/user');

UserRouter.get('/', getAllUser);

module.exports = UserRouter;