const blockchainService = require('../service/blockchainService');

exports.getAllBlockchain = async (req, res) => {
    try {
        const blokchain = await blockchainService.getAllBlcokchainData()

        return res.status(200).json({
            status: true,
            message: 'Berhasil mengambil data blockchain',
            data: blokchain
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
                message: blokchain.message
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