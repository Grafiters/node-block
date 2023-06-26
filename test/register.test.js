const request = require('supertest');
const {server, geetestClient} = require('./server');
const { getIdTokenFromMetadataServer } = require("../service/googleService");

describe('Test the Geetest route challenge', () => {
    test('POST /api/register should return user data success', async () => {
      const params = {
        username: 'kuacislayer',
        email: '111201710284@mhs.dinus.ac.id',
        password: 'Alone123!*',
      }

      const response = await request(server).post('/api/register').send(params);

      console.log(response.body);
    });

    test('GET /api/activate-email/:activation_token should return user data success', async () => {
      activation_token = '408201'
      const response = await request(server).get(`/api/activate-email/${activation_token}`);

      console.log(response.body);
    });

    test('GET /api/register/google should return google id token', async () => {
      token = await getIdTokenFromMetadataServer()
      console.log(token);
      // const params = {
      //   idToken: 
      // }
      // const response = await request(server).post(`/api/register/google`);

      // console.log(response.body);
    });
});