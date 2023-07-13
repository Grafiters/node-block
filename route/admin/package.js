'use strict';
const { Router } = require('express');
const PackageRouter = new Router();
const Package = require('../../controller/admin/package')
const jwtService = require('../../service/jwtService')
const schema = require('../../db/schema/package');

PackageRouter.get('/', jwtService.authAdminJWT, Package.getAllPackage)
PackageRouter.post('/add', jwtService.authAdminJWT, schema.bodyPackage, Package.addPackage)
PackageRouter.post('/edit/:id', jwtService.authAdminJWT, schema.paramsPackage, schema.bodyPackage, Package.updatePackage)
PackageRouter.delete('/delete/:id', jwtService.authAdminJWT, schema.paramsPackage, Package.deletePackage)

module.exports = PackageRouter