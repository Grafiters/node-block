const { Router } = require('express');
const UsersRouter = new Router();
const userController = require('../../controller/admin/user')

UsersRouter.get('/', userController.userProfile)
UsersRouter.post('/update/:user_id',  userController.updateUser)

module.exports = UsersRouter