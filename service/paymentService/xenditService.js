require('dotenv').config()
const axios = require('axios');
const Xendit = require('xendit-node');
const { XENDIT_APIKEY_SECRET, XENDIT_INVOICE_NOTIFIER, INVOICE_DURATION_EXPIRATE, XENDIT_API_URL } = process.env

const x = new Xendit({
  secretKey: XENDIT_APIKEY_SECRET
});

const { Invoice } = x
const invoiceSpecificOptions = {};
const i = new Invoice(invoiceSpecificOptions);

async function getAllInvoice(){
    const invoices = await i.getAllInvoices()

    return invoices
}

async function getInvoiceByFilterID(invoice, invoice_id){
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${invoice.gateway}/v2/invoices?external_id=${invoice_id}`,
        headers: { 
          'Authorization': `Basic ${Buffer.from(`${XENDIT_APIKEY_SECRET}:`).toString('base64')}`
        }
    };

    try {
        const invoice = await axios.request(config)

        return invoice.data[0]
    } catch (error) {
        console.log(error);
    }
}

async function createInvoice(invoice, user_subcribe){
    const params = {
        externalID: `${invoice.id}`,
        amount: invoice.total_amount,
        description: `Invoice Testing #${invoice.Packages.description}`,
        invoice_duration: INVOICE_DURATION_EXPIRATE,
        customer: {
            email: user_subcribe.User.email,
        },
        customer_notification_preference: {
            invoice_created: XENDIT_INVOICE_NOTIFIER,
            invoice_reminder: XENDIT_INVOICE_NOTIFIER,
            invoice_paid: XENDIT_INVOICE_NOTIFIER,
            invoice_expired: XENDIT_INVOICE_NOTIFIER
        },
        currency: 'IDR',
        items: [
            {
                name: `${invoice.Packages.name}`,
                description: `${invoice.Packages.description}`,
                quantity: 1,
                price: invoice.total_amount,
                url: 'https://yourcompany.com/example_item'
            }
        ],
    }

    try {
        const invoices = await i.createInvoice(params)

        return invoices
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    getInvoiceByFilterID,
    getAllInvoice,
    createInvoice
}