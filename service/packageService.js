const model = require('../db/models')
const paramsService = require('../service/paramsService')

async function getAllPackage(query){
    const params = paramsService.buildParamsFilter(query)
    const packageData = await model.Packages.findAll(params)

    return packageData
}

async function getPackageByID(package_id){
    const packageData = await model.Packages.findOne({
        where: {
            id: package_id
        }
    })

    return packageData
}

async function addPackage(params){
    const packageData = await model.Packages.create(params)
    .then((submit) => {
        return {
            status: true,
            message: ''
        }
    }).catch((error) => {
        return {
            status: false,
            message: error
        }
    });

    return packageData
}

async function updatePackage(package_id, params){
    const packageData = await model.Packages.update(params, {
        where: {
            id: package_id
        }
    })
    .then((submit) => {
        return {
            status: true,
            message: ''
        }
    }).catch((error) => {
        return {
            status: false,
            message: error
        }
    });

    return packageData
}

async function deletePackage(package_id){
    const transaction = await model.sequelize.transaction()
    try {
        const invoice = await model.Invoices.findAll({
            where: {
                package_id: package_id
            },
            transaction
        })

        const userSubcribe = await model.UserSubscriptions.findAll({
            where: {
                package_id: package_id
            },
            transaction
        })


        const invoiceId = invoice.map((invoic) => invoic.id)
        const userSubId = userSubcribe.map((us) => u.id)

        await model.Invoices.destroy({
            where: {
                id: invoiceId,
            },
            transaction
        })

        await model.UserSubscriptions.destroy({
            where: {
                id: userSubId,
            },
            transaction
        })

        await model.Packages.destroy({
            where: {
                id: package_id,
            },
            transaction
        })

        await transaction.commit()

        return {
            status: true,
            message: ''
        }
    } catch (error) {
        console.log(error);
        await transaction.rollback()
        return {
            status: false,
            message: error
        }
    }
}

module.exports = {
    deletePackage,
    getPackageByID,
    updatePackage,
    getAllPackage,
    addPackage,
}