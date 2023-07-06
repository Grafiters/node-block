const model = require('../db/models')

async function getAllSmartContractEvent(user_id){
    const smatContract = await model.SmartContractEvent.findAll({
        where: {
            user_id: user_id
        }
    })
    return smatContract
}

async function getSmartContractEventHistory(event_id){
    const smatContract = await model.NotificationHistory.findAll({
        where: {
            event_id: event_id
        }
    })
    return smatContract
}

async function findSmartContractByID(event_id){
    const smartContract = await model.SmartContract.findOne({
        where: {
            id: event_id
        }
    })

    return smartContract
}

async function createSmartContractEvent(params){
    const smartContract = await model.SmartContract.create(params)
    .then((submit) => {
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

    return smartContract
}

async function deleteSmartContractEvent(event_id){
    const transaction = await model.sequelize.transaction()

    try {
        const historyEvent = await model.NotificationHistory.findAll({
            where: {
                event_id: event_id
            }
        })
    
        const eventsId = historyEvent.map((he) => he.id)
    
        await model.NotificationHistory.destroy({
            where: {
                event_id: eventsId
            },
            transaction
        })
    
        await model.SmartContractEvent.destroy({
            where: {
                event_id: event_id
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

module.exports = {
    getSmartContractEventHistory,
    getAllSmartContractEvent,
    createSmartContractEvent,
    deleteSmartContractEvent,
    findSmartContractByID,
}