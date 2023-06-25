const speakeasy = require('speakeasy');

function generateOTP() {
  const secret = speakeasy.generateSecret();
  return secret.base32;
}

function verifyOTP(secret, otp) {
  try {
    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token: otp,
      window: 1 // Allow tokens that were generated within the last 30 seconds
    });
    return verified;
  } catch (error) {
    console.log(error);
    return false
  }
}

module.exports = {
  generateOTP,
  verifyOTP
};