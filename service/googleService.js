require('dotenv').config()
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(`${process.env.GOOGLE_CLIENT_ID}`);

async function handleGoogle(req, res) {
    const { token } = req.body;

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const { email } = ticket.getPayload();

      return JSON.stringify({ email})
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    handleGoogle
};