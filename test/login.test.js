const request = require('supertest');
const {server} = require('./server');

describe('Test the Geetest route challenge', () => {
    test('POST /api/login should return user data success', async () => {
      const params = {
        email: '111201710284@mhs.dinus.ac.id',
        password: 'Alone123!*',
      }

      const response = await request(server).post('/api/login').send(params);

      console.log(response.body);
    });
});