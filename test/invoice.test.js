const request = require('supertest');
const model = require('../db/models')
const {server} = require('./server');
describe('Test the Invoice route challenge', () => {
    test('POST /api/login should return user data success and token access', async () => {
        const paramsUser = {
          email: '111201710284@mhs.dinus.ac.id',
          password: 'alone',
        }

        const userResponse = await request(server).post('/api/auth/login').send(paramsUser);
  
        userAccessToken = userResponse.body.token

        expect(userResponse.status).toBe(201);
        expect(userResponse.body).toBeTruthy();
    });

    // test('POST /api/invoice/create should return success create invoice', async () => {
    //     const package_data = await request(server).get('/api/package')
    //     const paymentMethod = await request(server).get('/api/payment-method')

    //     const package_id = package_data.body.data[0].package_id
    //     const payment_id = paymentMethod.body.data[0].id

    //     const params = {
    //         package_id: package_id,
    //         payment_method_id: 12
    //     }

    //     console.log(userAccessToken);
    //     const createInvoice = await request(server).post('/api/invoice/create').set(`token`, `${userAccessToken}`).send(params)
        
    //     console.log(createInvoice.body);
    //     expect(createInvoice.status).toBe(201);
    //     expect(createInvoice.body).toBeTruthy();
    // })

    test('GET /api/invoice should return all data invoice user', async () => {
        const invoice = await request(server).get('/api/invoice/').set(`token`, `${userAccessToken}`)

        console.log(invoice.body);
        expect(invoice.status).toBe(200);
        expect(invoice.body).toBeTruthy();
    })

    // test('GET /api/invoice/:id should return detail data invoice user', async () => {
    //     const invoice = await request(server).get('/api/invoice/').set(`token`, `${userAccessToken}`)

    //     console.log(invoice.body.data[0].invoice_id);
    //     const invoiceDetail = await request(server).get(`/api/invoice/${invoice.body.data[0].invoice_id}`).set(`token`, `${userAccessToken}`)

    //     console.log(invoiceDetail.body);
    //     expect(invoiceDetail.status).toBe(200);
    //     expect(invoiceDetail.body).toBeTruthy();
    // })
});