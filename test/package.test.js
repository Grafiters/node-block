const request = require('supertest');
const model = require('../db/models')
const {server} = require('./server');

describe('Test the Package route challenge', () => {
    let tokenAdminAkses = ''
    test('GET /api/package should return all data package', async () => {
        const response = await request(server).get('/api/package');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Daftar Package tidak ditemukan');
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

    test('POST /api/package/add should return 422 error role user', async () => {
        const params = {
            name: "Paket Silver",
            description: "Paket dengan fitur dasar",
            request_per_second_limit: 10,
            request_per_day_limit: 1000,
            request_per_month_limit: 10000,
            price: 99.99
        }

        const response = await request(server).post('/api/package/add').set('token', `${userAccessToken}`).send(params);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('User can\'t access fo this endpoint');
    });

    test('POST /api/package/add should return 201 add package success', async () => {
        const params = {
            name: "Paket Silver",
            description: "Paket dengan fitur dasar",
            request_per_second_limit: 10,
            request_per_day_limit: 1000,
            request_per_month_limit: 10000,
            price: 99.99
        }

        const response = await request(server).post('/api/package/add').set('token', `${tokenAdminAkses}`).send(params);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Paket baru berhasil ditambahkan.');
    });

    test('POST /api/package/edit should return 201 updated package success', async () => {
        const getData = await request(server).get('/api/package');

        console.log(getData.body);
        const params = {
            name: "Paket Silver",
            description: "Paket dengan fitur dasar",
            request_per_second_limit: 10,
            request_per_day_limit: 1000,
            request_per_month_limit: 10000,
            price: 99.99
        }

        const response = await request(server).post(`/api/package/edit/${getData.body.data[0].id}`).set('token', `${tokenAdminAkses}`).send(params);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Paket berhasil diperbarui.');
    });

    test('GET /api/package should return all data package', async () => {
        const response = await request(server).get('/api/package');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Berhasil mengambil data package');
    });

    test('DELETE /api/package/deleted should return 201 updated package error', async () => {
        const getData = await request(server).get('/api/package');

        const response = await request(server).delete(`/api/package/delete/${getData.body.data[0].id}`).set('token', `${tokenAdminAkses}`);
        
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Paket berhasil dihapus.');
    });
    
    test('DELETE clean table', async () => {

        const truncate = await model.Packages.destroy({
            truncate: true
        })
        expect(truncate).toBeTruthy();

    });
});