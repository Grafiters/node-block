require('dotenv').config()

const axios = require('axios');
const {
    GEETEST_HOST,
    GEETEST_ID,
    GEETEST_KEY
  } = process.env;

async function registerGeetest() {
  try {
    const response = await axios.get(`${GEETEST_HOST}/register.php?gt=${GEETEST_ID}`);
    const { data } = response;
    if (data.success !== 1) {
      throw new Error('Failed to register Geetest');
    }

    const geetestChallenge = data.challenge;
    return geetestChallenge;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function verifyGeetest(geetestChallenge, geetestValidate, geetestSeccode) {
  const params = new URLSearchParams();
  params.append('seccode', geetestSeccode);
  params.append('json_format', '1');
  params.append('challenge', geetestChallenge);
  params.append('captchaid', GEETEST_ID);
  params.append('privatekey', GEETEST_KEY);

  try {
    const response = await axios.post(`${GEETEST_HOST}/validate.php`, params);
    const { data } = response;
    if (data.seccode !== geetestSeccode || data.validate !== geetestValidate) {
      throw new Error('Invalid Geetest challenge');
    }

    return true;
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      status: false,
      message: 'Invalid Geetest challenge'
    });;
  }
}

module.exports = {
  registerGeetest,
  verifyGeetest,
};