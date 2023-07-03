const request = require('supertest');
const {server, geetestClient} = require('./server');
const { getUserByEmail } = require("../service/userService");

describe('Test the register', () => {
  test('POST /api/auth/register should return error email invalid', async () => {
    const params = {
      username: 'kuacislayer',
      email: '111201710284',
      password: 'Alone123!*',
    }

    const response = await request(server).post('/api/auth/register').send(params);

    console.log(response.body);
    expect(response.status).toBe(422);
  });

  test('POST /api/auth/register should return error less minimum password', async () => {
    const params = {
      username: 'kuacislayer',
      email: '111201710284@mhs.dinus.ac.id',
      password: 'alone',
    }

    const response = await request(server).post('/api/auth/register').send(params);

    console.log(response.body);
    expect(response.status).toBe(422);
  });

  test('POST /api/auth/register should return user data success', async () => {
    const params = {
      username: 'kuacislayer',
      email: '111201710284@mhs.dinus.ac.id',
      password: 'Alone123!*',
    }

    const response = await request(server).post('/api/auth/register').send(params);

    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe('111201710284@mhs.dinus.ac.id');
  });

  test('GET /api/auth/activate-email/:activation_token should return user data success', async () => {
    const user = await getUserByEmail('111201710284@mhs.dinus.ac.id')
    const response = await request(server).get(`/api/auth/activate-email/${user.email_verification_token}`);

    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toBeTruthy();
  });

  test('GET /api/auth/activate-email/:activation_token should return error invalid token', async () => {
    const response = await request(server).get(`/api/auth/activate-email/123456`);

    console.log(response.body);
    expect(response.status).toBe(422);
    expect(response.body).toBeTruthy();
  });
});