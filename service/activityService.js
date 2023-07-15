const model = require('../db/models')
const userService = require('./userService')

async function getUserActivity(user_id){
    const activity = await model.Activity.findAll({
        where: {
            user_id: user_id
        }
    })

    return activity
}

async function addToUserActivity(params){
    const user = await userService.findUserByID(params.user_id)
    const paramActivity = {
        user_id: user.id,
        ip_address: params.ip_address,
        country: params.country,
        user_agent: params.user_agent,
        action: params.action,
        action_result: params.action_result
    }

    const create = await model.Activity.create(paramActivity)
                .then((success) => {
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

    return create
}