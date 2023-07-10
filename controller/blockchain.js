const blockchainService = require('../service/blockchainService');
const blockchainEntities = require('../service/entitiesService/blockchainEntities');

exports.getAllBlockchain = async (req, res) => {
    try {
        const blokchain = await blockchainService.getAllBlcokchainData()

        return res.status(200).json({
            status: true,
            message: 'Berhasil mengambil data blockchain',
            data: new blockchainEntities(blokchain).getBlockchainData()
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat mengambil data blockchain, silahkan coba beberapa saat lagi',
        });
    }
}

exports.addBlockchainData = async (req, res) => {
    /* 	#swagger.tags = ['Admin']
        #swagger.description = 'Endpoint to sign in a specific user' */
    /*
        #swagger.parameters['form'] = {
            in: 'params',
            description: 'Filter parameters',
            required: true,
            schema: { $ref: "#/definitions/Form/Blockchain" }
        }
    */
    const params = req.body

    try {
        const blokchain = await blockchainService.addBlockchainData(params)

        if(blokchain.status){
            return res.status(201).json({
                status: true,
                message: 'Blockchain successfully added.'
            });
        }else{
            return res.status(422).json({
                status: false,
                message: blokchain
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat mengambil data blockchain, silahkan coba beberapa saat lagi',
        });
    }
}

exports.updateBlockchainData = async (req, res) => {
    /* 	#swagger.tags = ['Admin']
        #swagger.description = 'Endpoint to sign in a specific user' */
    /*
        #swagger.parameters['form'] = {
            in: 'params',
            description: 'Filter parameters',
            required: true,
            schema: { $ref: "#/definitions/Form/Blockchain" }
        }
    */
    const blockchain_id = req.params.blockchain_id
    const params = req.body

    try {
        const blokchain = await blockchainService.updateBlockchainData(blockchain_id, params)

        if(blokchain.status){
            return res.status(201).json({
                status: true,
                message: 'Blockchain successfully updated.'
            });
        }else{
            return res.status(422).json({
                status: false,
                message: blokchain
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat mengambil data blockchain, silahkan coba beberapa saat lagi',
        });
    }
}

exports.deleteBlockchainData = async (req, res) => {
    /* 	#swagger.tags = ['Admin']
        #swagger.description = 'Endpoint to sign in a specific user' */
    const blockchain_id = req.params.blockchain_id

    console.log(blockchain_id);
    try {
        const blokchain = await blockchainService.deleteBlockchainData(blockchain_id)

        if(blokchain.status){
            return res.status(201).json({
                status: true,
                message: 'Blockchain successfully deleted.'
            });
        }else{
            return res.status(422).json({
                status: false,
                message: blokchain
            });
        }
    } catch (error) {
        // console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat mengambil data blockchain, silahkan coba beberapa saat lagi',
        });
    }
}