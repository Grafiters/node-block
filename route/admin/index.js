const { Router} = require("express");
const AdminRouter = new Router();

const UsersRouter = require('./user.js');

AdminRouter.use('/users', UsersRouter)

module.exports = AdminRouter

