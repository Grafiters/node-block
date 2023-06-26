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
});