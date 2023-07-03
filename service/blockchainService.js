const { error } = require("console");
const model = require("../db/models");

async function getAllBlcokchainData(){
    const blockchain = await model.Blockchain.findAll();

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
    const blockchain = await model.Blockchain.destroy({
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


async function getDetailBlockchainByID(id){
    const blockchain = await model.Blockchain.findOne({
        where: {
            id: id
        }
    })

    return blockchain
}

module.exports = {
    addBlockchainData,
    getAllBlcokchainData,
    updateBlockchainData,
    deleteBlockchainData
}