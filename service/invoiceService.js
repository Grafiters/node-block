const model = require('../db/models')

async function getAllInvoiceUser(user_id){
    const invoice = await model.UserSubscriptions.findAll({
        where: {
            user_id: user_id
        },
        include: [model.Invoices]
    })

    return invoice
}

async function getInvoiceUserByID(invoice_id){
    const invoice = await model.Invoices.findOne({
        where: {
            id: invoice_id
        },
        include: [model.Packages, model.PaymentMethods]
    })

    return invoice
}

async function addInvoiceUser(params){
    const invoice = await model.Invoices.create(params)
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
    })

    return invoice
}

async function deleteInoivceUser(invoice_id){
    const transaction = model.sequelize.transacion()

    try {
        const userSub = await model.UserSubscriptions.findAll({
            invoice_id: invoice_id
        })

        const usIds = userSub.map((us) => us.id)
        await model.UserSubscriptions.destroy({
            where: {
                id: usIds
            },
            transaction
        })

        await model.Inovices.destroy({
            where: {
                id: invoice_id
            },
            transaction
        })

        await transaction.commit()
        return {
            status: true,
            message: ''
        }
    } catch (error) {
        await transaction.rollback()
        return {
            status: false,
            message: error
        }
    }

}

module.exports = {
    getInvoiceUserByID,
    getAllInvoiceUser,
    deleteInoivceUser,
    addInvoiceUser
}