const { Router } = require('express');
const UserRouter = new Router();
const {authJWT} = require('../service/jwtService')

const userController = require('../controller/user');

UserRouter.get('/profile', authJWT, userController.userProfile);
UserRouter.post('/change-password', authJWT, userController.changePassword);

UserRouter.get('/generate-2fa', authJWT, userController.toptGenerate);
UserRouter.post('/enable-2fa', authJWT, userController.enableTwoFactor);
UserRouter.post('/verify-2fa', authJWT, userController.verifyTwoFactor);
UserRouter.post('/disable-2fa', authJWT, userController.disableTwoFactor);

UserRouter.post('/disable-account', authJWT, userController.nonActiveAccount);
UserRouter.get('/current-plan', authJWT, userController.currentPlan);
UserRouter.get('/my-activity', authJWT, userController.activityUser);

module.exports = UserRouter;