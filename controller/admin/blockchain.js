const blockchainService = require('../../service/blockchainService');
const blockchainEntities = require('../../service/entitiesService/blockchainEntities');

exports.getAllBlockchain = async (req, res) => {
    try {
        const blokchain = await blockchainService.getAllBlcokchainData()

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

exports.addBlockchainData = async (req, res) => {
    /*  #swagger.parameters['otp_enabled'] = {
        in: 'formData',
        schema: {
            $blockchain_name:"ETH",
            $height:123456,
            $network:"testnet",
            $version:"2.0.0",
            $location:"singapura"
        }
    } */

    const { blockchain_name, height, network, version, location } = req.body;
    const params = {
        blockchain_name: blockchain_name,
        height: height,
        network: network,
        version: version,
        location: location
    }

    try {
        const blokchain = await blockchainService.addBlockchainData(params)

        if(blokchain.status){
            return res.status(201).send({
                status: true,
                message: 'Blockchain successfully added.'
            });
        }else{
            return res.status(422).send({
                status: false,
                message: blokchain
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Tidak dapat mengambil data blockchain, silahkan coba beberapa saat lagi',
        });
    }
}

exports.updateBlockchainData = async (req, res) => {
    /*  #swagger.parameters['otp_enabled'] = {
        in: 'formData',
        schema: {
            $blockchain_name:"ETH",
            $height:123456,
            $network:"testnet",
            $version:"2.0.0",
            $location:"singapura"
        }
    } */
    const blockchain_id = req.params.blockchain_id
    const { blockchain_name, height, network, version, location } = req.body;
    const params = {
        blockchain_name: blockchain_name,
        height: height,
        network: network,
        version: version,
        location: location
    }

    try {
        const blokchain = await blockchainService.updateBlockchainData(blockchain_id, params)

        if(blokchain.status){
            return res.status(201).send({
                status: true,
                message: 'Blockchain successfully updated.'
            });
        }else{
            return res.status(422).send({
                status: false,
                message: blokchain.message
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Tidak dapat mengambil data blockchain, silahkan coba beberapa saat lagi',
        });
    }
}

exports.deleteBlockchainData = async (req, res) => {
    const blockchain_id = req.params.blockchain_id

    console.log(blockchain_id);
    try {
        const blokchain = await blockchainService.deleteBlockchainData(blockchain_id)

        if(blokchain.status){
            return res.status(201).send({
                status: true,
                message: 'Blockchain successfully deleted.'
            });
        }else{
            return res.status(422).send({
                status: false,
                message: blokchain.message
            });
        }
    } catch (error) {
        // console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Tidak dapat mengambil data blockchain, silahkan coba beberapa saat lagi',
        });
    }
}