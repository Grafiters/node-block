require('dotenv').config()
const axios = require('axios')

const { 
    APP_URL,
    BTCPAY_URL,
    BTCPAY_STORE_ID,
    BTCPAY_API_KEY_TOKEN ,
    BTCPAY_STORE_BASE_CURRENCY
} = process.env

async function createInvoice(invoice, user_subcribe){
    const body = generateParamsBody(invoice, user_subcribe)
    const headers = configPostRequest(body)

    const invoice_created = await axios.request(headers)
    .then((response) => {
        return {
            status: true,
            checkoutLink: response.checkoutLink,
            storeId: response.storeId,
            amount: response.amount,
            createdTime: response.createdTime,
            expirationTime: response.expirationTime
        }
    }).catch((error) => {
        return {
            status: false,
            message: error
        }
    })

    return invoice_created
}

async function getSingleInvoice(invoice_id){
    const headers = configGetRequest(`/stores/${BTCPAY_STORE_ID}/invoices?orderId=invoice_id`)
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

function configGetRequest(query){
    let config = {
        method: 'get',
        url: `${BTCPAY_URL}/api/v1${query}`,
        headers: { 
          'Authorization': `token ${BTCPAY_API_KEY_TOKEN}`,
        }
    };

    return config
}

function configPostRequest(params){
    let config = {
        method: 'post',
        url: `${BTCPAY_URL}/api/v1/users/me`,
        headers: { 
          'Authorization': `token ${BTCPAY_API_KEY_TOKEN}`,
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
            buyerEmail: user_subcribe.User.email,
            itemDesc: invoice.Packages.name,
        },
        receipt: {
            enabled: true,
            showQR: null,
            showPayments: null
        },
        amount: invoice.total_amount,
        currency: BTCPAY_STORE_BASE_CURRENCY
    }

    return bodyRequest
}

module.exports = {
    createInvoice
}