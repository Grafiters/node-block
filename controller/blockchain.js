const blockchainService = require('../service/blockchainService');
const blockchainEntities = require('../service/entitiesService/blockchainEntities');

exports.getAllBlockchain = async (req, res) => {
    try {
        const blokchain = await blockchainService.getAllBlcokchainData()

        return res.status(200).send({
            status: true,
            message: 'Berhasil mengambil data blockchain',
            data: new blockchainEntities(blokchain).getBlockchainData()
        });
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Tidak dapat mengambil data blockchain, silahkan coba beberapa saat lagi',
        });
    }
}

exports.getAllBlockchainByID = async (req, res) => {
    try {
        const blokchain = await blockchainService.getAllBlcokchainDataByID(req.params.id)

        return res.status(200).send({
            status: true,
            message: 'Berhasil mengambil data blockchain',
            data: blokchain
        });
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Tidak dapat mengambil data blockchain, silahkan coba beberapa saat lagi',
        });
    }
}