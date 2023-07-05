const model = require('../db/models')
const { Op } = require("sequelize");
const moment = require('moment');

async function findAllApiKeysByUser(user_id){
    const apikeys = await model.ApiKeys.findAll({
        where: {
            user_id: user_id
        }
    })

    return apikeys
}

async function findApiKeyByApiKeyValue(api_key){
    const apikeys = await model.ApiKeys.findOne({
        where: {
            api_key: api_key
        }
    })

    return apikeys
}

async function createApiKeysByUser(params){
    const apikeys = await model.ApiKeys.create(params)
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

async function deleteApiKeysByUser(params){
    const transaction = await model.sequelize.transaction()
    try {
        const statistics = await model.RequestStatistic.findAll({
            where: {
                api_key_id: params
            }
        })

        const rstatsId = statistics.map((stats) => stats.id)
        await model.RequestStatistic.destroy({
            where:{
                api_key_id: rstatsId
            },
            transaction
        })

        await model.ApiKeys.destroy({
            where: {
                id: params
            },
            transaction
        })

        await transaction.commit()

        return {
            status: true,
            message: ''
        }
    } catch (error) {
        console.log(error);
        await transaction.rollback()
        return {
            status: false,
            message: error
        }
    }
}

async function requestStatisticAll(user_id){
    const apikeys = await model.ApiKeys.findAll({
        where: {
            user_id: user_id
        },
        include: [{
            model: model.RequestStatistic,
            as: 'RequestStatistic'
        }]
    })

    return apikeys
}

async function requestStatisticByApiKeys(user_id, api_key = null, api_params = {}){
    console.log(api_params.start_date);
    var apikeys = ''
    if(api_key){
        apikeys = await model.RequestStatistic.findAll({
            where: {
                api_key_id: api_params.api_key_id.id,
                created_at: {
                    [Op.gte]: moment(api_params.start_date),
                    [Op.lte]: moment(api_params.end_date)
                },
            }
        })
    }else{
        apikeys = await model.RequestStatistic.findAll({
            include: [{
                model: model.ApiKeys,
                where: {
                    user_id: user_id
                }
            }],
        })
    }

    return apikeys
}


module.exports = {
    requestStatisticByApiKeys,
    findApiKeyByApiKeyValue,
    findAllApiKeysByUser,
    requestStatisticAll,
    deleteApiKeysByUser,
    createApiKeysByUser
}