const model = require('../db/models')

async function getAllPaymentMethods(){
    const payment = await model.PaymentMethods.findAll()

    return payment
}

async function getAllPaymentMethodsByID(payment_id){
    const payment = await model.PaymentMethods.findOne({
        where: {
            id: payment_id
        }
    })

    return payment
}

async function addPaymentMethods(params){
    const payment = await model.PaymentMethods.create(params)
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
    
    return payment
}

async function updatePaymentMethods(payment_id, params){
    const payment = await model.PaymentMethods.create(params, {
        where: {
            id: payment_id
        }
    }).then((submit) => {
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
    
    return payment
}

async function deletePaymentMethods(payment_id){
    const transaction = await model.sequelize.transaction()
    try {
        const invoice = await model.Invoices.findAll({
            where: {
                payment_method_id: payment_id
            },
            transaction
        })

        const invoiceId = invoice.map((invoic) => invoic.id)

        await model.PaymentMethods.destroy({
            where: {
                id: payment_id,
            },
            transaction
        })

        await model.Invoices.destroy({
            where: {
                id: invoiceId,
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
    getAllPaymentMethodsByID,
    deletePaymentMethods,
    updatePaymentMethods,
    getAllPaymentMethods,
    addPaymentMethods
}