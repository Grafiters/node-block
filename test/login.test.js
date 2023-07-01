const request = require('supertest');
const {server} = require('./server');

describe('Test the login Without geetest challenge', () => {
    let userAccessToken = '';
    test('POST /api/login should return user data success and token access', async () => {
      const params = {
        email: '111201710284@mhs.dinus.ac.id',
        password: 'Alone123!*',
      }

      const response = await request(server).post('/api/auth/login').send(params);

      userAccessToken = response.body.token
      console.log(userAccessToken);
      expect(response.status).toBe(200);
      expect(response.body).toBeTruthy();
    });

    test('POST /api/login should return error 406 error password', async () => {
      const params = {
        email: '111201710284@mhs.dinus.ac.id',
      }

      const response = await request(server).post('/api/auth/login').send(params);

      expect(response.status).toBe(406);
      expect(response.body).toBeTruthy();
    });

    test('POST /api/user/profile should return error 406 error password', async () => {

      const response = await request(server).get('/api/user/profile').set('token', `${userAccessToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeTruthy();
    });
});