const request = require('supertest');
const {server, geetestClient} = require('./server');


describe('Test the login Without geetest challenge', () => {
    test('POST /api/login should return user data success and token access', async () => {
      const params = {
        email: 'alone@kuacislayer.id',
        password: 'Alone123!*',
      }

      const response = await request(server).post('/api/auth/login').send(params);

      userAccessToken = response.body.token
      expect(response.status).toBe(201);
      expect(response.body).toBeTruthy();
    });

    test('POST /api/login should return error 422 error password', async () => {
      const params = {
        email: 'alone@kuacislayer.id',
      }

      const response = await request(server).post('/api/auth/login').send(params);

      expect(response.status).toBe(422);
      expect(response.body).toBeTruthy();
    });
    
    test('POST /api/user/profile should return 200', async () => {

      const response = await request(server).get('/api/user/profile').set('token', `${userAccessToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeTruthy();
    });
});