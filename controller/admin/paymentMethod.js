const paymentService = require('../../service/paymentMethodService')
const paymentMethodEntities = require('../../service/entitiesService/paymentMethodEntities')

exports.getAllPaymentMethod = async (req, res) => {
    try {
        const payment = await paymentService.getAllPaymentMethods()
        
        if (payment.length > 0){
            return res.status(200).send({
                status: true,
                message: 'Berhasil mengambil data payment method',
                data: payment
            });
        }else{
            return res.status(200).send({
                status: true,
                message: 'Daftar Metode Pembayaran tidak ditemukan',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Terjadi kesalahan pada mengambil data payment method, coba beberapa saat lagi',
        });
    }
}

exports.getPaymentMethodByID = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentMethodByID(req.params.id)
        
        return res.status(200).send({
            status: true,
            message: 'Berhasil mengambil data payment method',
            data: payment
        });
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Terjadi kesalahan pada mengambil data payment method, coba beberapa saat lagi',
        });
    }
}

exports.addPaymentMethod = async (req, res) => {
    /*  #swagger.parameters['payment_method'] = {
        in: 'formData',
        schema: {
            "name": "BCA_VA",
            "description": "description",
            "is_crypto": false,
            "gateway": "https://api.xendit.co"
        }
    } */
    const { name, description, is_crypto, gateway } = req.body
    const params = {
        name: name,
        description: description,
        is_crypto: is_crypto,
        gateway: gateway
    }
    try {
        const payment = await paymentService.addPaymentMethods(params)

        return res.status(201).send({
            status: true,
            message: 'Metode pembayaran baru berhasil ditambahkan.',
        });
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Terjadi kesalahan pada menambah payment method baru, coba beberapa saat lagi',
            data: error.message
        });
    }
}

exports.updatePaymentMethod = async (req, res) => {
    /*  #swagger.parameters['payment_method'] = {
        in: 'formData',
        schema: {
            "name": "BCA_VA",
            "description": "description",
            "is_crypto": false,
            "gateway": "https://api.xendit.co"
        }
    } */
    try {
        const payment = await paymentService.updatePaymentMethods(req.params.id, req.body)

        return res.status(201).send({
            status: true,
            message: 'Metode pembayaran baru berhasil diperbarui.',
        });
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Terjadi kesalahan pada saat pembaruan payment, coba beberapa saat lagi',
        });
    }
}

exports.deletePaymentMethod = async (req, res) => {
    try {
        const payment = await paymentService.deletePaymentMethods(req.params.id)

        return res.status(201).send({
            status: true,
            message: 'Metode pembayaran berhasil dihapus.',
        });
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Gagal menghapus metode pembayaran, coba beberapa saat lagi.',
        });
    }
}