const smartContractService = require('../service/smartContractService')

exports.getAllSmartContractEvent = async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
    try {
        const address = await smartContractService.getAllSmartContractEvent(req.auth.user.id)

        if(!address[0]){
            return res.status(200).json({
                status: true,
                message: 'Tidak dapat menemukan data event smart contract',
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Berhasil mendapatkan data event smart contract',
            data: address
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat mengambil data event smart contract, silahkan coba beberapa saat lagi',
        });
    }
}

exports.findSmartContractEventByID = async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
    try {
        const address = await smartContractService.findSmartContractByID(req.params.event_id)

        if(!address){
            return res.status(200).json({
                status: true,
                message: 'Tidak dapat menemukan data event smart contract',
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Berhasil mendapatkan data event smart contract',
            data: address
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat mengambil data event smart contract, silahkan coba beberapa saat lagi',
        });
    }
}

exports.createSmartContractEvent = async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
    const { contract_address, event_name, notification_method } = req.body
    const params = {
        user_id: req.auth.user.id,
        contract_address: contract_address,
        event_name: event_name,
        notification_method: notification_method
    }
    try {
        const address = await smartContractService.createSmartContractEvent(params)

        if(!address.status){
            return res.status(422).json({
                status: true,
                message: address.message
            });
        }

        return res.status(201).json({
            status: true,
            message: 'Berhasil mendapatkan data event smart contract',
        })
    } catch (error) {
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat mengambil data event smart contract, silahkan coba beberapa saat lagi',
        });
    }
}

exports.deleteSmartCotnractEvent = async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
    try {
        const address = await smartContractService.deleteSmartContractEvent(req.params.event_id)

        if(!address.status){
            console.log(address.message);
            return res.status(200).json({
                status: true,
                message: 'Tidak dapat menemukan data event smart contract',
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Berhasil mendapatkan data event smart contract',
            data: address
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat mengambil data event smart contract, silahkan coba beberapa saat lagi',
        });
    }
}

exports.getSmartContractEventHistory = async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
    try {
        const address = await smartContractService.getSmartContractEventHistory(req.params.event_id)

        if(!address[0]){
            return res.status(200).json({
                status: true,
                message: 'Tidak dapat menemukan data event smart contract',
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Berhasil mendapatkan data event smart contract',
            data: address
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat mengambil data event smart contract, silahkan coba beberapa saat lagi',
        });
    }
}