const { Router } = require('express');
const UsersRouter = new Router();
const userController = require('../../controller/admin/user')

UsersRouter.get('/', userController.userProfile)
UsersRouter.post('/update/:user_id',  /*    #swagger.parameters['otp_enabled'] = {
    required: true,
    name: 'otp_enabled',
    schema: true
} */ userController.updateUser)

module.exports = UsersRouter