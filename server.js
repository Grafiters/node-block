require('dotenv').config()

const express = require('express');
const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 3000;
const MainRouter = require('./route/index');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

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
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_DIALECT
  } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT
});

sequelize
  .authenticate()
  .then(() => console.log(`[LOG] connection success`))
  .catch((err) => console.log(`[ERR] `, err));

const corsConfig = {
    origin: '*',
    optionsSuccessStatus: 200,
    AccessControlAllowMethods: ['POST','GET','OPTIONS','PUT','DELETE']
}

app
    .use(logger('dev'))
    .use(cors(corsConfig))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json());

app.use(`/${process.env.SERVICE}`, MainRouter)

app.listen(port, host ,() => console.log(`running on port ${host}:${port}`));

app.use(`/${process.env.SERVICE}/swagger`, swaggerUi.serve, swaggerUi.setup(swaggerFile))