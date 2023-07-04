const request = require('supertest');
const model = require('../db/models')
const {server} = require('./server');

describe('Test the Payment Method route challenge', () => {
    let tokenAdminAkses = ''
    test('GET /api/blockchain should return all data blockchain', async () => {
        const response = await request(server).get('/api/payment-method');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Daftar Metode Pembayaran tidak ditemukan');
    });

    test('POST /api/login should return user data success and token access', async () => {
        const paramsUser = {
          email: '111201710284@mhs.dinus.ac.id',
          password: 'Alone123!*',
        }
  
        const paramsAdmin = {
            email: 'alone@kuacislayer.id',
            password: 'Alone123!*',
        }

        const userResponse = await request(server).post('/api/auth/login').send(paramsUser);
        const adminResponse = await request(server).post('/api/auth/login').send(paramsAdmin);
  
        userAccessToken = userResponse.body.token
        tokenAdminAkses = adminResponse.body.token

        expect(userResponse.status).toBe(200);
        expect(userResponse.body).toBeTruthy();

        expect(adminResponse.status).toBe(200);
        expect(adminResponse.body).toBeTruthy();
    });

    test('POST /api/payment-method/add should return 422 error role user', async () => {
        const params = {
            name: "Metode Pembayaran Baru",
            description: "Deskripsi metode pembayaran baru",
            is_crypto: false,
            gateway: "Gateway Pembayaran"
        }

        const response = await request(server).post('/api/payment-method/add').set('token', `${userAccessToken}`).send(params);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('User can\'t access fo this endpoint');
    });

    test('POST /api/payment-method/add should return 201 add blockchain success', async () => {
        const params = {
            name: "Metode Pembayaran Baru",
            description: "Deskripsi metode pembayaran baru",
            is_crypto: false,
            gateway: "Gateway Pembayaran"
        }

        const response = await request(server).post('/api/payment-method/add').set('token', `${tokenAdminAkses}`).send(params);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Metode pembayaran baru berhasil ditambahkan.');
    });

    test('POST /api/payment-method/edit should return 201 updated blockchain success', async () => {
        const getData = await request(server).get('/api/payment-method');

        const params = {
            name: "Metode Pembayaran Baru",
            description: "Deskripsi metode pembayaran baru",
            is_crypto: false,
            gateway: "Gateway Pembayaran"
        }

        const response = await request(server).post(`/api/payment-method/edit/${getData.body.data[0].id}`).set('token', `${tokenAdminAkses}`).send(params);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Metode pembayaran baru berhasil diperbarui.');
    });

    test('GET /api/payment-method should return all data payment-method', async () => {
        const response = await request(server).get('/api/payment-method');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Berhasil mengambil data payment method');
    });

    test('DELETE /api/payment-method/deleted should return 201 updated payment-method error', async () => {
        const getData = await request(server).get('/api/payment-method');

        const response = await request(server).delete(`/api/payment-method/delete/${getData.body.data[0].id}`).set('token', `${tokenAdminAkses}`);
        
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Metode pembayaran berhasil dihapus.');
    });
    
    test('DELETE clean table', async () => {

        const truncate = await model.PaymentMethods.sync({force: true})

        expect(truncate).toBeTruthy();
    });
});