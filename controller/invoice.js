require('dotenv').config()
const {INVOICE_PAYMENT_DUE_LIMIT_NUMBER, INVOICE_PAYMENT_DUE_LIMIT_TIME } = process.env

const invoiceService = require('../service/invoiceService')
const packageService = require('../service/packageService')
const moment = require('moment')

// PENDING
exports.addInvoiceUser = async (req, res) => {
    const { package_id, payment_method_id } = req.body
    const package = await packageService.getPackageByID(package_id)

    const params = {
        package_id: package_id,
        payment_method_id: payment_method_id,
        payment_due_date: moment().add(INVOICE_PAYMENT_DUE_LIMIT_NUMBER, INVOICE_PAYMENT_DUE_LIMIT_TIME),
        total_amount: package.price
    }

    try {
        const createInvoice = await invoiceService.addInvoiceUser(params)
        if(!createInvoice.status) {
            return res.status(422).json({
                success: false,
                message: "Terjadi kesalahan pada saat pembuatan invoice, cobalah beberapa saat lagi"
            })
        }

        return res.status(201).json({
            success: true,
            message: "Invoice berhasil dibuat.",
            data: createInvoice
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            success: false,
            message: "Terjadi kesalahan pada saat pembuatan invoice, cobalah beberapa saat lagi"
        })
    }
}