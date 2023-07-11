require('dotenv').config()
const axios = require('axios')
const {INVOICE_PAYMENT_DUE_LIMIT_NUMBER } = process.env

const { 
    APP_URL,
    BTCPAY_URL,
    BTCPAY_STORE_ID,
    BTCPAY_API_KEY_TOKEN ,
    BTCPAY_STORE_BASE_CURRENCY
} = process.env

async function createInvoice(invoice, user_subcribe){
    const body = generateParamsBody(invoice, user_subcribe)
    const headers = configPostRequest(invoice, body)

    const invoice_created = await axios.request(headers)
    .then((response) => {
        return {
            status: true,
            checkoutLink: response.data.checkoutLink,
            storeId: response.data.storeId,
            amount: response.data.amount,
            createdTime: response.data.createdTime,
            expirationTime: response.data.expirationTime
        }
    }).catch((error) => {
        return {
            status: false,
            message: error
        }
    })

    console.log(invoice_created);

    return invoice_created
}

async function getSingleInvoice(invoice_id){
    const headers = configGetRequest(invoice_id, `/stores/${BTCPAY_STORE_ID}/invoices?orderId=invoice_id`)
    const invoiceResult = await axios.request(headers)
    .then((response) => {
        return response
    }).catch((error) => {
        return {
            status: false,
            message: error
        }
    })

    return invoiceResult
}

function configGetRequest(invoice, query){
    let config = {
        method: 'get',
        url: `${invoice.PaymentMethod.gateway}/api/v1${query}`,
        headers: { 
          'Authorization': `token ${BTCPAY_API_KEY_TOKEN}`,
        }
    };

    return config
}

function configPostRequest(invoice, params){
    let config = {
        method: 'post',
        url: `${invoice.PaymentMethod.gateway}/api/v1/stores/${BTCPAY_STORE_ID}/invoices`,
        headers: { 
          'Authorization': `token ${BTCPAY_API_KEY_TOKEN}`,
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(params)
    };

    return config
}

function generateParamsBody(invoice, user_subcribe){
    const bodyRequest = {
        metadata: {
            orderId: invoice.id,
            orderUrl: `${APP_URL}`,
            buyerEmail: user_subcribe.email,
            itemDesc: invoice.Package.name,
        },
        receipt: {
            enabled: true,
            showQR: null,
            showPayments: null
        },
        amount: invoice.total_amount,
        currency: BTCPAY_STORE_BASE_CURRENCY,
        checkout: {
            paymentMethods: [invoice.PaymentMethod.name],
            redirectUrl: `${APP_URL}/api/invoice/edit/${invoice.id}/paid/${user_subcribe.id}`,
            expirationMinutes: INVOICE_PAYMENT_DUE_LIMIT_NUMBER
        }
    }

    return bodyRequest
}

module.exports = {
    getSingleInvoice,
    createInvoice
}