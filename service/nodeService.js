const model = require("../db/models");
const Sequelize = require("../db/models");

async function getAllNodeBlockchain(){
    const node = await model.Node.findAll({
        include: [
            {model: model.Blockchain}
        ]
    });

    return node
}

async function getDataNodeByBlockchainID(params){
    const node = await model.Node.findAll({
        where: {
            blockchain_id: params
        },
        include: [model.Blockchain]
    });

    return node
}

async function addNodeBlockchain(params){
    console.log(params);
    const node = await model.Node.create( params )
                .then((submit) => {
                    return {
                        status: true,
                        message: ''
                    }
                }).catch((error) => {
                    console.log(error);
                    return {
                        status: false,
                        message: error
                    }
                });

    return node
}

async function updateNodeBlockchain(node_blockchain_id, params){
    const node = await model.Node.update( params, {
                    where: {
                        id: node_blockchain_id
                    }
                })
                .then((submit) => {
                    return {
                        status: true,
                        message: ''
                    }
                }).catch((error) => {
                    console.log(error);
                    return {
                        status: false,
                        message: error.message
                    }
                });

    return node
}

async function deleteNodeBlockchain(node_blockchain_id, params){
    const node = await model.Node.destroy({
                    where: {
                        id: node_blockchain_id
                    }
                })
                .then((submit) => {
                    return {
                        status: true,
                        message: ''
                    }
                }).catch((error) => {
                    console.log(error);
                    return {
                        status: false,
                        message: error.message
                    }
                });

    return node
}

module.exports = {
    getDataNodeByBlockchainID,
    deleteNodeBlockchain,
    updateNodeBlockchain,
    getAllNodeBlockchain,
    addNodeBlockchain,
}