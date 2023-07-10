const model = require('../db/models')

async function createUserSubcription(params){
    const subcribe = await model.UserSubscriptions.create(params)
    .then((submit) => {
        return {
            status: true,
            message: '',
            data: submit
        }
    }).catch((error) => {
        return {
            status: false,
            message: error
        }
    })

    return subcribe
}

async function updateUserSubcription(invoice_id, user_id){
    const params = {
        end_date: new Date()
    }
    const userPrevSub = await getUserSubcription(user_id)

    if(userPrevSub !== null){
        await model.UserSubscriptions.update(params, {
            where: {
                id: userPrevSub.id
            }
        })
    }

    const updateUserNowSub = await model.UserSubscriptions.update({start_date: new Date()}, {
        where: {
            invoice_id: invoice_id,
            user_id: user_id
        }
    })

    return updateUserNowSub
}

async function getUserSubcription(user_id){
    const subcribe = await model.UserSubscriptions.findOne({
        where: {
            user_id: user_id,
            end_date: null
        }
    })

    return subcribe
}

module.exports = {
    updateUserSubcription,
    createUserSubcription
}