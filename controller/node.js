const blockchainService = require('../service/blockchainService');
const nodeService = require('../service/nodeService');
const nodeBlockchainEntities = require('../service/entitiesService/nodeBlockchainEntities')

exports.getAllNodeBlockchain = async (req, res) => {
    try {
        const blockchain = await blockchainService.getAllBlcokchainGroupData();

        return res.status(200).json({
            status: true,
            message: 'Berhasil mengambil data blockchain',
            data: await new nodeBlockchainEntities(blockchain).getBlockchainGroup()
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat mengambil data blockchain, silahkan coba beberapa saat lagi',
        });
    }
}

exports.addNodeBlockchain = async (req, res) => {
    /* 	#swagger.tags = ['Admin']
        #swagger.description = 'Endpoint to sign in a specific user' */
    try {
        const node = await nodeService.addNodeBlockchain(req.body)
        if (node.status){
            return res.status(201).json({
                status: true,
                message: 'Node blockchain successfully added.',
            });
        }else{
            return res.status(422).json({
                status: false,
                message: node.message,
            });
        }
    } catch (error) {
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat menambah data node blockchain, silahkan coba beberapa saat lagi',
        });
    }
}

exports.updateNodeBlockchain = async (req, res) => {
    /* 	#swagger.tags = ['Admin']
        #swagger.description = 'Endpoint to sign in a specific user' */
    try {
        const node = await nodeService.updateNodeBlockchain(req.params.node_id, req.body)
        if (node.status){
            return res.status(201).json({
                status: true,
                message: 'Node blockchain successfully updated.',
            });
        }else{
            return res.status(422).json({
                status: false,
                message: node.message,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat menambah data node blockchain, silahkan coba beberapa saat lagi',
        });
    }
}

exports.deleteNodeBlockchain = async (req, res) => {
    /* 	#swagger.tags = ['Admin']
        #swagger.description = 'Endpoint to sign in a specific user' */
    try {
        const node = await nodeService.deleteNodeBlockchain(req.params.node_id)
        if (node.status){
            return res.status(201).json({
                status: true,
                message: 'Node blockchain berhasil dihapus.',
            });
        }else{
            return res.status(422).json({
                status: false,
                message: node.message,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat menambah data node blockchain, silahkan coba beberapa saat lagi',
        });
    }
}