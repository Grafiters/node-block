const blockchainService = require('../service/blockchainService');
const nodeService = require('../service/nodeService');
const nodeBlockchainEntities = require('../service/entitiesService/nodeBlockchainEntities')

exports.getAllNodeBlockchain = async (req, res) => {
    try {
        const blockchain = await blockchainService.getAllBlcokchainGroupData();

        return res.status(200).send({
            status: true,
            message: 'Berhasil mengambil data blockchain',
            data: await new nodeBlockchainEntities(blockchain).getBlockchainGroup()
        });
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Tidak dapat mengambil data blockchain, silahkan coba beberapa saat lagi',
        });
    }
}

exports.getAllNodeBlockchainByID = async (req, res) => {
    try {
        const blockchain = await blockchainService.getAllBlcokchainGroupData();

        return res.status(200).send({
            status: true,
            message: 'Berhasil mengambil data blockchain',
            data: await new nodeBlockchainEntities(blockchain).getBlockchainGroup()
        });
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Tidak dapat mengambil data blockchain, silahkan coba beberapa saat lagi',
        });
    }
}