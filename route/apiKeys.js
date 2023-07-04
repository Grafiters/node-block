'use strict';
const { Router } = require('express');
const InvocieRouter = new Router();
const apiKeys = require('../controller/apikeys')
const jwtService = require('../service/jwtService')
const schema = require('../db/schema/apiKeys');

InvocieRouter.get('/', jwtService.authJWT, apiKeys.apiKeysUser)