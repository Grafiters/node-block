const request = require('supertest');

const { generateOtp, validateOtp, createOtp, generateTotpSecret } = require('../service/totpService.js');
const {server} = require('./server');

describe('Test the Geetest route challenge', () => {

    test('Test function validation otp should return true or false', async () => {
        const totpUrl = await generateOtp()

        const create = await createOtp(totpUrl)
        const validate = await validateOtp(totpUrl, create)

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    test('Test function validation otp should return true or false', async () => {
        const totpUrl = await generateOtp()

        const create = await createOtp(totpUrl)
        const validate = await validateOtp(totpUrl, create)

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
});