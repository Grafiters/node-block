require('dotenv').config()
const {INVOICE_PAYMENT_DUE_LIMIT_NUMBER, INVOICE_PAYMENT_DUE_LIMIT_TIME } = process.env

const invoiceService = require('../service/invoiceService')
const packageService = require('../service/packageService')
const UserSubscipService = require('../service/userSubcribesionService')
const invoiceEntities = require('../service/entitiesService/invoiceEntities')

const moment = require('moment')

exports.getAllinvoiceUser = async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
    try {
        const invoice = await invoiceService.getAllInvoiceUser(req.auth.user.id)
        if(!invoice[0]){
            return res.status(201).json({
                success: true,
                message: "Tidak dapat menemukan data invoice",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data invoice",
            data: new invoiceEntities(invoice).getListPlan()
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            success: false,
            message: "Terjadi kesalahan pada saat pembuatan invoice, cobalah beberapa saat lagi"
        })
    }
}

exports.getInvoiceUserByID = async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
    try {
        const invoice = await invoiceService.getInvoiceUserByID(req.params.id)
        if(!invoice){
            return res.status(200).json({
                success: true,
                message: "Tidak dapat menemukan data invoice",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data invoice",
            data: invoice
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            success: false,
            message: "Terjadi kesalahan pada saat pembuatan invoice, cobalah beberapa saat lagi"
        })
    }
}

exports.addInvoiceUser = async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
    const { package_id, payment_method_id } = req.body
    const package_data = await packageService.getPackageByID(package_id)

    const invoiceCheck = await invoiceService.getPrevInvoiceUser(req.auth.user.id)
    console.log(invoiceCheck);
    if(!invoiceCheck.status) {
        return res.status(422).send(invoiceCheck)
    }

    const params = {
        package_id: package_id,
        payment_method_id: payment_method_id,
        payment_due_date: moment().add(INVOICE_PAYMENT_DUE_LIMIT_NUMBER, INVOICE_PAYMENT_DUE_LIMIT_TIME),
        total_amount: package_data.price
    }

    const user = {
        id: req.auth.user.id,
        email: req.auth.user.email
    }

    try {
        const createInvoice = await invoiceService.addInvoiceUser(params, user)
        if(!createInvoice.status) {
            return res.status(422).json({
                success: false,
                message: "Terjadi kesalahan pada saat pembuatan invoice, cobalah beberapa saat lagi"
            })
        }

        const userSubParams = {
            user_id: req.auth.user.id,
            invoice_id: createInvoice.data.id,
            package_id: createInvoice.data.package_id,
        }
        
        const userSub = await UserSubscipService.createUserSubcription(userSubParams)

        if(!userSub.status){
            return res.status(422).json({
                status: false,
                message: 'Invoice gagal dibuat'
            })
        }

        return res.status(201).json({
            success: true,
            message: "Invoice berhasil dibuat.",
            data: new invoiceEntities(userSub.data).getCreateInoviceResponse(createInvoice)
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            success: false,
            message: "Terjadi kesalahan pada saat pembuatan invoice, cobalah beberapa saat lagi"
        })
    }
}

exports.updatePaymentInvoice = async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
    const params = {
        status: req.params.status
    }
    try {
        await invoiceService.updatePaymentInvoice(req.params.id, params)
        await UserSubscipService.updateUserSubcription(req.params.id, req.params.user_id)      

        return res.status(201).json({
            success: true,
            message: "Berhasil merubah data invoice",
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            success: false,
            message: "Terjadi kesalahan pada saat mengupdate invoice, cobalah beberapa saat lagi"
        })
    }
}

exports.deleteInvoiceUser = async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
    try {
        const invoice = await invoiceService.deleteInoivceUser(req.params.invoice_id)
        if(!invoice){
            return res.status(201).json({
                success: true,
                message: "Tidak dapat menghapus data invoice",
            })
        }

        return res.status(201).json({
            success: true,
            message: "Berhasil menghapus data invoice",
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            success: false,
            message: "Terjadi kesalahan pada saat pembuatan invoice, cobalah beberapa saat lagi"
        })
    }
}

exports.xenditListInvoice = async (req, res) => {
    /* 	#swagger.tags = ['Depreceted']
        #swagger.description = 'Endpoint to sign in a specific user' */
    try {
        const invoice = await xenditService.getAllInvoice()
        return res.status(201).json({
            success: true,
            message: invoice
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            success: false,
            message: "Terjadi kesalahan pada saat pembuatan invoice, cobalah beberapa saat lagi"
        })
    }
}

exports.xenditCreateInvoice = async (req, res) => {
    /* 	#swagger.tags = ['Depreceted']
        #swagger.description = 'Endpoint to sign in a specific user' */
    try {
        const invoice = await xenditService.createInvoice()
        return res.status(201).json({
            success: true,
            message: invoice
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            success: false,
            message: "Terjadi kesalahan pada saat pembuatan invoice, cobalah beberapa saat lagi"
        })
    }
}