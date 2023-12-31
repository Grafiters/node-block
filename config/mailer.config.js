require('dotenv').config();
const nodemailer = require('nodemailer');

const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

module.exports = {
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
}