const monitoredAddressService = require('../service/monitoredAddressService')

exports.getAllMonitoredAddress = async (req, res) => {
    try {
        const address = await monitoredAddressService.getAllMonitoredAddress(req.auth.user.id)

        if(!address[0]){
            return res.status(200).json({
                status: true,
                message: 'Tidak dapat menemukan data monitored address',
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Berhasil mendapatkan data monitored address',
            data: address
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat mengambil data monitored address, silahkan coba beberapa saat lagi',
        });
    }
}

exports.getMonitoredAddressHistory = async (req, res) => {
    try {
        const address = await monitoredAddressService.getMonitoredAddressHistory(req.params.monitored_id)

        if(!address[0]){
            return res.status(200).json({
                status: true,
                message: 'Tidak dapat menemukan data monitored address',
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Berhasil mendapatkan data monitored address',
            data: address
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat mengambil data monitored address, silahkan coba beberapa saat lagi',
        });
    }
}

exports.findMonitoredAddressByID = async (req, res) => {
    try {
        const address = await monitoredAddressService.findMonitoredAddressByID(req.params.address_id)

        if(!address){
            return res.status(200).json({
                status: true,
                message: 'Tidak dapat menemukan data monitored address',
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Berhasil mendapatkan data monitored address',
            data: address
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat mengambil data monitored address, silahkan coba beberapa saat lagi',
        });
    }
}

exports.createMonitoredAddress = async (req, res) => {
    const { address, notification_method } = req.body
    const params = {
        user_id: req.auth.user.id,
        address: address,
        notification_method: notification_method
    }
    try {
        const address = await monitoredAddressService.createMonitoredAddresses(params)

        if(!address.status){
            console.log(address.error);
            return res.status(422).json({
                status: true,
                message: 'Gagal menambahkan alamat monitored address',
            });
        }

        return res.status(201).json({
            status: true,
            message: 'Berhasil menambahkan alamat monitored address',
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat mengambil data monitored address, silahkan coba beberapa saat lagi',
        });
    }
}

exports.deleteMonitoredAddress = async (req, res) => {
    try {
        const address = await monitoredAddressService.deleteMontoredAddressUser(req.params.address_id)

        if(!address.status){
            console.log(address.error);
            return res.status(422).json({
                status: true,
                message: 'Berhasil menghapus alamat monitored address',
            });
        }

        return res.status(201).json({
            status: true,
            message: 'Berhasil menghapus alamat monitored address',
        })
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat mengambil data monitored address, silahkan coba beberapa saat lagi',
        });
    }
}