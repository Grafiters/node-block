const model = require('../db/models')
const paramsBuilder = require('../service/paramsService')

async function findAllApiKeysByUser(user_id){
    const apikeys = await model.ApiKeys.findAll({
        where: {
            user_id: user_id
        }
    })

    return apikeys
}

async function createApiKeysByUser(user_id, params){
    const mergeParams = paramsBuilder.buildParamsWithAuthUser(user_id, params)
    const apikeys = await model.ApiKeys.create(mergeParams)
    .then((submit) => {
        return {
            status: true,
            message: ''
        }
    }).catch((err) => {
        return {
            status: false,
            message: err
        }
    })

    return apikeys
}

module.exports = {
    findAllApiKeysByUser
}