const request = require('supertest');
const model = require('../db/models')
const {server} = require('./server');
describe('Test the Blockchain route challenge', () => {
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

    // test('POST /api/api-keys should return user data success and show api-keys', async () => {
    //     const params = {
    //       label: makeid(10)
    //     }

    //     const response = await request(server).post('/api/api-keys/generate').set('token', `${userAccessToken}`).send(params);

    //     console.log(response.body);
    //     expect(response.status).toBe(201);
    //     expect(response.body).toBeTruthy();
    // });

    test('GET /api/api-keys should return user data success and show api-keys', async () => {
        const response = await request(server).get('/api/api-keys').set('token', `${userAccessToken}`)

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    test('GET /api/profile get profile with api-keys', async () => {
        const apiKeyList = await request(server).get('/api/api-keys').set('token', `${userAccessToken}`)

        const response = await request(server).get('/api/user/profile').set('x-api-key', `${apiKeyList.body.data[0].api_key}`)

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    test('GET /api/api-keys/usage-statistic get profile with api-keys', async () => {
        const response = await request(server).get('/api/api-keys/usage-statistic').set('token', `${userAccessToken}`)

        // const response = await request(server).get('/api/user/profile').set('token', `${userAccessToken}`)

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    // test('DELETE /api/api-keys/delete should return api key data success deleted', async () => {
    //     const apiKeysList = await request(server).get('/api/api-keys').set('token', `${userAccessToken}`)

    //     const response = await request(server).delete(`/api/api-keys/delete/${apiKeysList.body.data[0].api_key_id}`).set('token', `${userAccessToken}`)

    //     expect(response.status).toBe(201);
    //     expect(response.body).toBeTruthy();
    // });
});

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}