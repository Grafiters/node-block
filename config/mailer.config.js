require('dotenv').config();
const nodemailer = require('nodemailer');

function transporterMailer(){
    nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
    });
}

module.exports = {
    transporterMailer
}