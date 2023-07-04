'use strict';
const { Router } = require('express');
const PackageRouter = new Router();
const Package = require('../controller/package')
const jwtService = require('../service/jwtService')
const schema = require('../db/schema/node');

PackageRouter.get('/', Package.getAllPackage)
PackageRouter.get('/:id', Package.getPackageByID)
PackageRouter.post('/add', jwtService.authAdminJWT, Package.addPackage)
PackageRouter.post('/edit/:id', jwtService.authAdminJWT, Package.updatePackage)
PackageRouter.delete('/delete/:id', jwtService.authAdminJWT, Package.deletePackage)

module.exports = PackageRouter