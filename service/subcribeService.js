const model = require('../db/models');

async function getAllSubcribeUser(params){
    const subcribe = await model.UserSubcriptions.findAll({
        where: params,
        include: [model.Invoices]
    })

    return subcribe
}

async function getUserSubcriptionByParams(params){
    const subcribe = await model.UserSubcriptions.findOne({
        where: params
    })

    return subcribe
}

async function cancelSubcriptionUser(subcription_id){
    const params = {
        end_date: new Date()
    }

    const subcribe = await model.UserSubcriptions.update(params, {
        where: {
            id: subcription_id
        }
    }).then((response) => {
        if(response == 1){
            return {
                status: true,
                message: ''
            }
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
    getAllSubcribeUser,
    cancelSubcriptionUser,
    getUserSubcriptionByParams,
}