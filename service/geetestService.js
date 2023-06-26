require('dotenv').config()
const querystring = require('querystring');
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

    const geetestChallenge = data;

    return {
      gt: GEETEST_ID,
      challenge: geetestChallenge
    };
  } catch (error) {
    console.log(error);
  }
}

async function verifyGeetest(geetestChallenge, geetestValidate, geetestSeccode) {
  const geetestConfig = {
      gt: GEETEST_ID,
      challenge: geetestChallenge,
      validate: geetestValidate,
      seccode: geetestSeccode,
  };

  try {
    const response = await axios.post(`${GEETEST_HOST}/validate.php`, querystring.stringify(geetestConfig));
    const { data } = response;
    
    return data;
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