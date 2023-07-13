const packageService = require('../../service/packageService')
const packageEntities = require('../../service/entitiesService/packageEntities')

exports.getAllPackage = async (req, res) => {
    // const query = req.query

    try {
        const packageData = await packageService.getAllPackage()
        
        if (packageData.length > 0){
            return res.status(200).send({
                status: true,
                message: 'Berhasil mengambil data package',
                data: packageData
            });
        }else{
            return res.status(200).send({
                status: true,
                message: 'Daftar Package tidak ditemukan',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Terjadi kesalahan pada mengambil data package, coba beberapa saat lagi',
        });
    }
}

exports.getPackageByID = async (req, res) => {
    try {
        const packageData = await packageService.getPackageByID(req.params.id)
        
        return res.status(200).send({
            status: true,
            message: 'Berhasil mengambil data package',
            data: packageData
        });
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Terjadi kesalahan pada mengambil data package, coba beberapa saat lagi',
        });
    }
}

exports.addPackage = async (req, res) => {
    /*  #swagger.parameters['package'] = {
        in: 'formData',
        schema: {
            $name: "Gold",
            $description: "Gold Package",
            $request_per_second_limit: 1000,
            $request_per_day_limit: 10000,
            $request_per_month_limit: 10000000,
            $price: 150000.00,
            $is_trial: false,
            $trial_duration: 100000,
            $trial_request_limit: 100
        }
    } */
    
    const { name, description, request_per_second_limit, request_per_day_limit, request_per_month_limit, price, is_trial, trial_duration, trial_request_limit } = req.body
    const params = {
        name: name,
        description: description,
        request_per_second_limit: request_per_second_limit,
        request_per_day_limit: request_per_day_limit,
        request_per_month_limit: request_per_month_limit,
        price: price,
        is_trial: is_trial,
        trial_duration: trial_duration,
        trial_request_limit: trial_request_limit
    }
    try {
        const packageData = await packageService.addPackage(params)
        if(packageData.status){
            return res.status(201).send({
                status: true,
                message: 'Paket baru berhasil ditambahkan.',
            });
        }else{
            return res.status(422).send({
                status: false,
                message: packageData.message,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Terjadi kesalahan pada saat menambah data package, coba beberapa saat lagi',
        });
    }
}

exports.updatePackage = async (req, res) => {
    /*  #swagger.parameters['package'] = {
        in: 'formData',
        schema: {
            $name: "Gold",
            $description: "Gold Package",
            $request_per_second_limit: 1000,
            $request_per_day_limit: 10000,
            $request_per_month_limit: 10000000,
            $price: 150000.00,
            $is_trial: false,
            $trial_duration: 100000,
            $trial_request_limit: 100,
        }
    } */
    const { name, description, request_per_second_limit, request_per_day_limit, request_per_month_limit, price, is_trial, trial_duration, trial_request_limit } = req.body
    const params = {
        name: name,
        description: description,
        request_per_second_limit: request_per_second_limit,
        request_per_day_limit: request_per_day_limit,
        request_per_month_limit: request_per_month_limit,
        price: price,
        is_trial: is_trial,
        trial_duration: trial_duration,
        trial_request_limit: trial_request_limit
    }
    try {
        const packageData = await packageService.updatePackage(req.params.id, params)
        if(packageData.status){
            return res.status(201).send({
                status: true,
                message: 'Paket berhasil diperbarui.',
            });
        }else{
            return res.status(422).send({
                status: false,
                message: packageData.message,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Terjadi kesalahan pada saat memperbarui data package, coba beberapa saat lagi',
        });
    }
}

exports.deletePackage = async (req, res) => {
    const { id } = req.params
    try {
        const packageData = await packageService.deletePackage(id)
        return res.status(201).send({
            status: true,
            message: 'Paket berhasil dihapus.',
        });
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Terjadi kesalahan pada saat menghapus data package, coba beberapa saat lagi',
        });
    }
}