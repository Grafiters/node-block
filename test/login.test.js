const request = require('supertest');
const {server, geetestClient} = require('./server');
const querystring = require('querystring');

describe('Test the Geetest route challenge', () => {
  let captcha_text = '';
  test('GET /api/geetest/register should return Geetest challenge', async () => {
    const response = await request(server).get('/api/geetest/register');
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();

    captcha_text = response.body.challenge;
  });

  test(`POST /api/geetest/verify should return true or false`, async () => {
    const geetestData = await geetestClient.register();
    const { challenge, validate, seccode } = geetestData;
    geetestClient.validate = jest.fn().mockResolvedValue(true);
    const response = await request(server).post('/api/geetest/verify')
                    .send({
                      geetestChallenge: challenge, geetestValidate: validate, geetestSeccode: seccode
                    })
    expect(response.status).toBe(500);
    expect(response.body).toBeTruthy();
  })
});const request = require('supertest');
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

    test('POST /api/login should return error 422 error password', async () => {
      const params = {
        email: '111201710284@mhs.dinus.ac.id',
      }

      const response = await request(server).post('/api/auth/login').send(params);

      expect(response.status).toBe(422);
      expect(response.body).toBeTruthy();
    });

    test('POST /api/user/profile should return error 422 error password', async () => {

      const response = await request(server).get('/api/user/profile').set('token', `${userAccessToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeTruthy();
    });
});