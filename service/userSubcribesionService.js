const model = require('../db/models')

async function createUserSubcription(params){
    const subcribe = await model.UserSubscriptions.create(params)
    .them((submit) => {
        return {
            status: true,
            message: ''
        }
    }).catch((error) => {
        return {
            status: false,
            message: error
        }
    })

    return subcribe
}

module.exports = {
    createUserSubcription
}