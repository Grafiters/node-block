require('dotenv').config()
const Xendit = require('xendit-node');
const { XENDIT_APIKEY_SECRET } = process.env

const x = new Xendit({
  secretKey: XENDIT_APIKEY_SECRET
});

module.exports = x