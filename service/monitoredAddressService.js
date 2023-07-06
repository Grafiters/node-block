const model = require('../db/models')

async function getAllDataMonitoredAddress(user_id){
    const address = await model.MontitoredAddresses.findAll({
        where: {
            user_id: user_id
        }
    })

    return address
}

async function getMonitoredAddressHistory(monitored_id){
    const smatContract = await model.NotificationHistory.findAll({
        where: {
            address_id: monitored_id
        }
    })
    return smatContract
}

async function findMonitoredAddressByID(monitored_id){
    const post = await model.MontitoredAddresses.findOne({
        where: {
            id: monitored_id
        }
    })

    return post
}

async function createMonitoredAddresses(params){
    const post = await model.MontitoredAddresses.create(params)
    .then((submit) => {
        return {
            status: true,
            message: ''
        }
    }).catch((error) => {
        return {
            status: false,
            message: 'Gagal menambahkan alamat untuk dimonitoring',
            error: error
        }
    })

    return post
}

async function deleteMontoredAddressUser(monitored_id){
    const transaction = await model.sequelize.transaction()

    try {
        const historyEvent = await model.NotificationHistory.findAll({
            where: {
                event_id: address_id
            }
        })
    
        const eventsId = historyEvent.map((he) => he.id)
    
        await model.NotificationHistory.destroy({
            where: {
                event_id: eventsId
            },
            transaction
        })
    
        await model.MontitoredAddresses.destroy({
            where: {
                address_id: address_id
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
    getMonitoredAddressHistory,
    getAllDataMonitoredAddress,
    findMonitoredAddressByID,
    createMonitoredAddresses,
    deleteMontoredAddressUser
}