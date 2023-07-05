
const model = require("../db/models");

async function getAllBlcokchainData(){
    const blockchain = await model.Blockchain.findAll();

    return blockchain
}

async function getAllBlcokchainGroupData(){
    const blockchain = await model.Blockchain.findAll({
        attributes: ['blockchain_name'],
        group: ['blockchain_name']
    });

    return blockchain
}

async function getBlockchainByName(blockchain_name, attributes){
    const blockchain = await model.Blockchain.findAll({
        attributes: [attributes],
        where: {blockchain_name: blockchain_name}
    });

    return blockchain
}

async function addBlockchainData(params){
    const blockchain = await model.Blockchain.create(params)
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
        });

    return blockchain
}

async function updateBlockchainData(blockchain_id, params){
    const blockchain = await model.Blockchain.update(params, {
        where: {
            id: blockchain_id
        }
        }).then((submit) => {
            return {
                status: true,
                message: ''
            }
        }).catch((error) => {
            return {
                status: false,
                message: error
            }
        });

    return blockchain
}

async function deleteBlockchainData(blockchain_id){
    const transaction = await model.sequelize.transaction()
    try {
        const node = await model.Node.findAll({
            where: {
                blockchain_id: blockchain_id
            },
            transaction
        })

        const nodeId = node.map((nod) => nod.id)

        await model.Blockchain.destroy({
            where: {
                id: blockchain_id,
            },
            transaction
        })

        await model.Node.destroy({
            where: {
                id: nodeId,
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

async function getDetailBlockchainByID(id){
    const blockchain = await model.Blockchain.findOne({
        where: {
            id: id
        }
    })

    return blockchain
}

module.exports = {
    getAllBlcokchainGroupData,
    getBlockchainByName,
    addBlockchainData,
    getAllBlcokchainData,
    updateBlockchainData,
    deleteBlockchainData
}