const { TOTP, URI } = require('otpauth');

async function generateOtp(){
  const totp = new TOTP({
    issuer: 'nusablockchain',
    label: 'nusablockchain',
  });

  return totp.toString();
}

async function validateOtp(otpUrl, otp, window = 1){
  const totp = await totpFromUri(otpUrl)
  const result = totp.validate({token: otp, window});

  return typeof result === 'number';
}

async function generateTotpSecret(otpUrl){
  return {
    secret: otpUrl
  }
}

async function createOtp(otpUrl){
  const topt = await totpFromUri(otpUrl)
  return topt.generate();
}

function parseOtpSecret(otpUrl){
  const maybeTotp = new URL(otpUrl);
  const secret = maybeTotp.searchParams.get('secret')

  return secret
}

async function totpFromUri(totpUrl){
  const maybeTotp = URI.parse(totpUrl);
  if (typeof maybeTotp.period !== 'number') {
    throw new Error('Invalid TOTP object');
  }

  return maybeTotp
}

module.exports = {
  generateOtp,
  validateOtp,
  createOtp,
  generateTotpSecret
}