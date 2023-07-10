require('dotenv').config()
const axios = require('axios');
const { error } = require('console');
const Xendit = require('xendit-node');
const { XENDIT_APIKEY_SECRET, XENDIT_INVOICE_NOTIFIER, INVOICE_DURATION_EXPIRATE, XENDIT_API_URL, APP_URL } = process.env

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
    const invoiceConfig = await configGetRequest(invoice, `invoices?external_id=${invoice_id}`)
    try {
        const invoice = await axios.request(invoiceConfig)

        return invoice.data[0]
    } catch (error) {
        console.log(error);
    }
}

async function createInvoice(invoice, user_subcribe){
    const params = {
        external_id: `${invoice.id}`,
        amount: invoice.total_amount,
        description: `Invoice Testing #${invoice.Package.description}`,
        invoice_duration: INVOICE_DURATION_EXPIRATE,
        customer: {
            email: user_subcribe.email,
        },
        customer_notification_preference: {
            invoice_created: [XENDIT_INVOICE_NOTIFIER],
            invoice_reminder: [XENDIT_INVOICE_NOTIFIER],
            invoice_paid: [XENDIT_INVOICE_NOTIFIER],
            invoice_expired: [XENDIT_INVOICE_NOTIFIER]
        },
        currency: 'IDR',
        payment_methods: [invoice.PaymentMethod.name],
        success_redirect_url: `${APP_URL}/api/invoice/edit/${invoice.id}/paid/${user_subcribe.id}`,
        failure_redirect_url: `${APP_URL}/api/invoice/edit/${invoice.id}/overdue/${user_subcribe.id}`,
        // success_redirect_url: `https://digi.nusatechblockchain.com`,
        items: [
            {
                name: `${invoice.Package.name}`,
                description: `${invoice.Package.description}`,
                quantity: 1,
                price: invoice.total_amount,
                url: 'https://yourcompany.com/example_item'
            }
        ],
    }

    const invoiceConfig = await configPostRequest(invoice, 'invoices', params)

    try {
        const invoices = await axios.request(invoiceConfig)

        return invoices
    } catch (error) {
        console.log(error.response.data.errors);
        return false
    }
}

async function configGetRequest(invoice, query){
    let config = {
        method: 'get',
        url: `${invoice.PaymentMethod.gateway}/v2/${query}`,
        headers: { 
            'Authorization': `Basic ${Buffer.from(`${XENDIT_APIKEY_SECRET}:`).toString('base64')}`
        }
    };

    return config
}

async function configPostRequest(invoice, query, params){
    let config = {
        method: 'post',
        url: `${invoice.PaymentMethod.gateway}/v2/${query}`,
        headers: { 
            'Authorization': `Basic ${Buffer.from(`${XENDIT_APIKEY_SECRET}:`).toString('base64')}`
        },
        data: params
    };

    return config
}

module.exports = {
    getInvoiceByFilterID,
    getAllInvoice,
    createInvoice
}