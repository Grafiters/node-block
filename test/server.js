require('dotenv').config()

const express = require('express');
const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 3000;
const MainRouter = require('../route/index');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const logger = require('morgan');
const GeetestClient = require('geetest');

const cors = require('cors');

app.get('/', (req, res) => {
    res.send(JSON.stringify(
        {
            status: 200,
            message: 'Backend Nusa Blockchain is running'
        }
    ))
});

const {
    GEETEST_ID,
    GEETEST_KEY,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_DIALECT
} = process.env;

const geetestClient = new GeetestClient({
    geetest_id: GEETEST_ID,
    geetest_key: GEETEST_KEY
});

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT
});

sequelize
  .authenticate()
  .then(() => console.log(`[LOG] connection success`))
  .catch((err) => console.log(`[ERR] `, err));

app
    .use(logger('dev'))
    .use(cors())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json());
    
app.use(`/${process.env.SERVICE}`, MainRouter)

const server = app.listen(port, host);

module.exports = {server, geetestClient};