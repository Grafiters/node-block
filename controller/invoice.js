require('dotenv').config()
const {INVOICE_PAYMENT_DUE_LIMIT_NUMBER, INVOICE_PAYMENT_DUE_LIMIT_TIME } = process.env

const invoiceService = require('../service/invoiceService')
const packageService = require('../service/packageService')
const UserSubscipService = require('../service/userSubcribesionService')
const invoiceEntities = require('../service/entitiesService/invoiceEntities')
const moment = require('moment')

exports.getAllinvoiceUser = async (req, res) => {
    try {
        const invoice = await invoiceService.getAllInvoiceUser(req.auth.user.id)
        if(!invoice[0]){
            return res.status(201).json({
                success: true,
                message: "Tidak dapat menemukan data invoice",
            })
        }

        return res.status(201).json({
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
    try {
        const invoice = await invoiceService.getInvoiceUserByID(req.params.invoice_id)
        if(!invoice){
            return res.status(201).json({
                success: true,
                message: "Tidak dapat menemukan data invoice",
            })
        }

        return res.status(201).json({
            success: true,
            message: "Berhasil mendapatkan data invoice",
            data: new invoiceEntities(invoice).getSinglePlan()
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
    const { package_id, payment_method_id } = req.body
    const package_data = await packageService.getPackageByID(package_id)

    const params = {
        package_id: package_id,
        payment_method_id: payment_method_id,
        payment_due_date: moment().add(INVOICE_PAYMENT_DUE_LIMIT_NUMBER, INVOICE_PAYMENT_DUE_LIMIT_TIME),
        total_amount: package_data.price
    }

    try {
        const createInvoice = await invoiceService.addInvoiceUser(params)
        if(!createInvoice.status) {
            return res.status(422).json({
                success: false,
                message: "Terjadi kesalahan pada saat pembuatan invoice, cobalah beberapa saat lagi"
            })
        }

        const userSubParams = {
            user_id: request.auth.user.id,
            invoice_id: createInvoice.invoice_id,
            package_id: createInvoice.package_id,
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
            data: new invoiceEntities(userSub).getCreateInoviceResponse(createInvoice)
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            success: false,
            message: "Terjadi kesalahan pada saat pembuatan invoice, cobalah beberapa saat lagi"
        })
    }
}

exports.deleteInvoiceUser = async (req, res) => {
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