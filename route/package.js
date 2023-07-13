'use strict';
const { Router } = require('express');
const PackageRouter = new Router();
const Package = require('../controller/package')
const schema = require('../db/schema/package');

PackageRouter.get('/', Package.getAllPackage)
PackageRouter.get('/:id', schema.paramsPackage, Package.getPackageByID)

module.exports = PackageRouter