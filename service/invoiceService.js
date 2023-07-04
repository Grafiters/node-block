const model = require('../db/models')

// PENDING
async function addInvoiceUser(param){
    const invoice = await models.Invoices.create(parmas)
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
}

module.exports = {
    addInvoiceUser
}