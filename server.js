require('dotenv').config()

const express = require('express');
const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 3000;
const MainRouter = require('./route/index');
const bodyParser = require('body-parser');

const db = require('./db/models/index');
const cors = require('cors');

app.get('/', (req, res) => {
    res.send(JSON.stringify(
        {
            status: 200,
            message: 'Backend Nusa Blockchain is running'
        }
    ))
});

app
    .use(cors())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json());

try {
    db.sequelize
        .sync().then( () => console.log('connection succes'))
}catch (err){
    console.log(err)
}
    
app.use(`/${process.env.SERVICE}/${process.env.API_VERSION}`, MainRouter)

app.listen(port, host ,() => console.log(`running on port ${host}:${port}`));