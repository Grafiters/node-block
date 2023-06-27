require('dotenv').config()
const querystring = require('querystring');
const axios = require('axios');
const crypto = require('crypto');

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

    const hashChallenge = crypto.createHash('md5')
                   .update(geetestChallenge + GEETEST_KEY)
                   .digest('hex');
    return {
      gt: GEETEST_ID,
      challenge: hashChallenge
    };
  } catch (error) {
    console.log(error);
  }
}

async function verifyGeetest(geetestChallenge, geetestValidate, geetestSeccode) {
  try {
    const md5 = crypto.createHash('md5')
    .update(GEETEST_KEY + 'geetest' + geetestChallenge)
    .digest('hex');

    if (geetestValidate == md5){
      const response = await axios.post(`${GEETEST_HOST}/validate.php`, geetestSeccode);

      if (response.status != 200){
        return NULL;
      }else{
        return crypto.createHash('md5')
        .update( geetestSeccode )
        .digest('hex');
      }
    }

    return false;
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      status: false,
      message: 'Invalid Geetest challenge'
    });
  }
}

module.exports = {
  registerGeetest,
  verifyGeetest,
};