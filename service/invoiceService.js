const { Op, col, literal } = require('sequelize');
const model = require('../db/models')
const xenditService = require('../service/paymentService/xenditService')
const btcPayService = require('../service/paymentService/btcpayService')

async function getAllInvoice(){
    try {
        const invoice = await model.UserSubscriptions.findAll({
            include: [
                {
                    model: model.Packages
                },
                {
                    model: model.Invoices,
                    as: 'Invoice',
                    include: [{
                        model: model.PaymentMethods,
                        attributes: ["id","name","is_crypto","gateway","description"]
                    }]
                },
                {
                    model: model.User,
                    attributes: ['id','email']
                }
            ]
        });

        return invoice
    } catch (error) {
        console.log(error);
    }
}

async function getPrevInvoiceUser(user_id){
    try {
        const invoice = await model.UserSubscriptions.findOne({
            where: {
                'user_id': user_id
            },
            include: [{
                model: model.Invoices,
                as: 'Invoice',
                where: {
                    status: 'unpaid'
                }
            }]
        });
    
        if(invoice !== null){
            return {
                status: false,
                message: 'Anda memiliki invoice yang belum dibayar. Harap bayar invoice sebelum membuat invoice baru.'
            }
        }else{
            return {
                status: true
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function getAllInvoiceUser(user_id){
    const invoice = await model.UserSubscriptions.findAll({
        where: {
            user_id: user_id
        },
        include: [
            {
                model: model.Packages
            },
            {
                model: model.Invoices,
                as: 'Invoices',
                include: [{
                    model: model.PaymentMethods,
                    attributes: ["id","name","is_crypto","gateway","description"]
                }]
            }
        ]
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

    var detail = {}
    if (!invoice.PaymentMethod.is_crypto){
        return {
            invoice: invoice,
            detail: await xenditService.getInvoiceByFilterID(invoice, invoice_id)
        }
    }else{
        return {
            invoice: invoice,
            detail: await btcPayService.getSingleInvoice(invoice, invoice_id)
        }
    }
}

async function updatePaymentInvoice(invoice_id, params){
    const invoice = await model.Invoices.update(params, {
        where: {
            id: invoice_id
        }
    })

    return invoice
}

async function addInvoiceUser(params, user_email){
    const invoice = await model.Invoices.create(params)
    .then((submit) => {
        return {
            status: true,
            message: '',
            data: submit
       }
    }).catch((error) => {
        return {
            status: false,
            message: error
        }
    })

    if(invoice.status){
        const invoiceDetail = await getInvoiceUserByID(invoice.data.id)

        if(!invoiceDetail.invoice.PaymentMethod.is_crypto){
            await xenditService.createInvoice(invoiceDetail.invoice, user_email)
        }else{
            await btcPayService.createInvoice(invoiceDetail.invoice, user_email)
        }
    }

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
    updatePaymentInvoice,
    getPrevInvoiceUser,
    getInvoiceUserByID,
    getAllInvoiceUser,
    deleteInoivceUser,
    addInvoiceUser,
    getAllInvoice
}