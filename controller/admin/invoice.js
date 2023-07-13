require('dotenv').config()
const {INVOICE_PAYMENT_DUE_LIMIT_NUMBER, INVOICE_PAYMENT_DUE_LIMIT_TIME } = process.env

const invoiceService = require('../../service/invoiceService')
const packageService = require('../../service/packageService')
const UserSubscipService = require('../../service/userSubcribesionService')
const invoiceEntities = require('../../service/entitiesService/invoiceEntities')

const moment = require('moment')

exports.getAllinvoiceUser = async (req, res) => {
    try {
        const invoice = await invoiceService.getAllInvoice()
        if(!invoice[0]){
            return res.status(201).send({
                success: true,
                message: "Tidak dapat menemukan data invoice",
            })
        }

        return res.status(200).send({
            success: true,
            message: "Berhasil mendapatkan data invoice",
            data: invoice
        })
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            success: false,
            message: "Terjadi kesalahan pada saat pembuatan invoice, cobalah beberapa saat lagi"
        })
    }
}

exports.getInvoiceUserByID = async (req, res) => {
    try {
        const invoice = await invoiceService.getInvoiceUserByID(req.params.id)
        if(!invoice){
            return res.status(200).send({
                success: true,
                message: "Tidak dapat menemukan data invoice",
            })
        }

        return res.status(200).send({
            success: true,
            message: "Berhasil mendapatkan data invoice",
            data: invoice
        })
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            success: false,
            message: "Terjadi kesalahan pada saat pembuatan invoice, cobalah beberapa saat lagi"
        })
    }
}

exports.updatePaymentInvoice = async (req, res) => {
    const params = {
        status: req.params.status
    }
    try {
        await invoiceService.updatePaymentInvoice(req.params.id, params)
        await UserSubscipService.updateUserSubcription(req.params.id, req.params.user_id)      

        return res.status(201).send({
            success: true,
            message: "Berhasil merubah data invoice",
        })
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            success: false,
            message: "Terjadi kesalahan pada saat mengupdate invoice, cobalah beberapa saat lagi"
        })
    }
}

exports.deleteInvoiceUser = async (req, res) => {
    try {
        const invoice = await invoiceService.deleteInoivceUser(req.params.invoice_id)
        if(!invoice){
            return res.status(201).send({
                success: true,
                message: "Tidak dapat menghapus data invoice",
            })
        }

        return res.status(201).send({
            success: true,
            message: "Berhasil menghapus data invoice",
        })
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            success: false,
            message: "Terjadi kesalahan pada saat pembuatan invoice, cobalah beberapa saat lagi"
        })
    }
}