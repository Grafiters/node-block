const request = require('supertest');
const {server, geetestClient} = require('./server');

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
});