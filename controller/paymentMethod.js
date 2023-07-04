const paymentService = require('../service/paymentMethodService')

exports.getAllPaymentMethod = async (req, res) => {
    try {
        const payment = await paymentService.getAllPaymentMethods()
        
        if (payment.length > 0){
            return res.status(200).json({
                status: true,
                message: 'Berhasil mengambil data payment method',
                data: payment
            });
        }else{
            return res.status(200).json({
                status: true,
                message: 'Daftar Metode Pembayaran tidak ditemukan',
                data: payment
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Terjadi kesalahan pada mengambil data payment method, coba beberapa saat lagi',
        });
    }
}

exports.getPaymentMethodByID = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentMethodByID(req.params.id)
        
        return res.status(200).json({
            status: true,
            message: 'Berhasil mengambil data payment method',
            data: payment
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Terjadi kesalahan pada mengambil data payment method, coba beberapa saat lagi',
        });
    }
}

exports.addPaymentMethod = async (req, res) => {
    try {
        const payment = await paymentService.addPaymentMethods(req.body)

        return res.status(201).json({
            status: true,
            message: 'Metode pembayaran baru berhasil ditambahkan.',
            data: payment
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Terjadi kesalahan pada menambah payment method baru, coba beberapa saat lagi',
            data: error.message
        });
    }
}

exports.updatePaymentMethod = async (req, res) => {
    try {
        const payment = await paymentService.updatePaymentMethods(req.params.id, req.body)

        return res.status(201).json({
            status: true,
            message: 'Metode pembayaran baru berhasil diperbarui.',
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Terjadi kesalahan pada saat pembaruan payment, coba beberapa saat lagi',
        });
    }
}

exports.deletePaymentMethod = async (req, res) => {
    try {
        const payment = await paymentService.deletePaymentMethods(req.params.id)

        return res.status(201).json({
            status: true,
            message: 'Metode pembayaran berhasil dihapus.',
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Gagal menghapus metode pembayaran, coba beberapa saat lagi.',
        });
    }
}