const request = require('supertest');
const model = require('../db/models')
const {server} = require('./server');

describe('Test the Blockchain route challenge', () => {
    let tokenAdminAkses = ''
    test('GET /api/blockchain should return all data blockchain', async () => {
        const response = await request(server).get('/api/blockchain');

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
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

    test('POST /api/blockchain/add should return 422 error role user', async () => {
        const params = {
            blockchain_name: "Ethereum",
            height: 12345,
            network: "Mainnet",
            version: "2.0.1",
            location: "Singapore"
        }

        const response = await request(server).post('/api/blockchain/add').set('token', `${userAccessToken}`).send(params);

        console.log(response.body);
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('User can\'t access fo this endpoint');
    });

    test('POST /api/blockchain/add should return 201 add blockchain success', async () => {
        const params = {
            blockchain_name: "Ethereum",
            height: 12345,
            network: "Mainnet",
            version: "2.0.1",
            location: "Singapore"
        }

        const response = await request(server).post('/api/blockchain/add').set('token', `${tokenAdminAkses}`).send(params);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Blockchain successfully added.');
    });

    test('POST /api/blockchain/add should return 201 updated blockchain success', async () => {
        const getData = await request(server).get('/api/blockchain');

        const params = {
            blockchain_name: "Ethereum",
            height: 12345,
            network: "Mainnet",
            version: "2.1.0",
            location: "Singapore"
        }

        const response = await request(server).post(`/api/blockchain/edit/${getData.body.data[0].id}`).set('token', `${tokenAdminAkses}`).send(params);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Blockchain successfully updated.');
    });

    test('DELETE /api/blockchain/deleted should return 201 updated blockchain error', async () => {
        const getData = await request(server).get('/api/blockchain');

        const response = await request(server).delete(`/api/blockchain/delete/${getData.body.data[0].id}`).set('token', `${tokenAdminAkses}`);
        // console.log(response);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Blockchain successfully deleted.');
    });
    
    test('DELETE clean table', async () => {

        const truncate = await model.Blockchain.sync({force: true})

        expect(truncate).toBeTruthy();
    });
});