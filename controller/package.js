const packageService = require('../service/packageService')
const packageEntities = require('../service/entitiesService/packageEntities')

exports.getAllPackage = async (req, res) => {
    /* 	#swagger.tags = ['Package']
        #swagger.description = 'Endpoint to sign in a specific user' */

    /*
        #swagger.parameters['query'] = {
            in: 'params',
            description: 'Filter parameters',
            required: true,
            schema: { $ref: "#/definitions/Filter/Package" }
        }
    */
    const query = req.query

    try {
        const packageData = await packageService.getAllPackage(query)
        
        if (packageData.length > 0){
            return res.status(200).json({
                status: true,
                message: 'Berhasil mengambil data package',
                data: new packageEntities(packageData).getListPackages()
            });
        }else{
            return res.status(200).json({
                status: true,
                message: 'Daftar Package tidak ditemukan',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Terjadi kesalahan pada mengambil data package, coba beberapa saat lagi',
        });
    }
}

exports.getPackageByID = async (req, res) => {
    /* 	#swagger.tags = ['Package']
        #swagger.description = 'Endpoint to sign in a specific user' */
    try {
        const packageData = await packageService.getPackageByID(req.params.id)
        
        return res.status(200).json({
            status: true,
            message: 'Berhasil mengambil data package',
            data: new packageEntities(packageData).getDetailPackage()
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Terjadi kesalahan pada mengambil data package, coba beberapa saat lagi',
        });
    }
}

exports.addPackage = async (req, res) => {
    /* 	#swagger.tags = ['Admin']
        #swagger.description = 'Endpoint to sign in a specific user' */
    /*
        #swagger.parameters['package'] = {
            in: 'params',
            description: 'Filter parameters',
            required: true,
            schema: { $ref: "#/definitions/Form/Package" }
        }
    */
    try {
        const packageData = await packageService.addPackage(req.body)
        return res.status(201).json({
            status: true,
            message: 'Paket baru berhasil ditambahkan.',
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Terjadi kesalahan pada saat menambah data package, coba beberapa saat lagi',
        });
    }
}

exports.updatePackage = async (req, res) => {
    /* 	#swagger.tags = ['Admin']
        #swagger.description = 'Endpoint to sign in a specific user' */
    /*
        #swagger.parameters['package'] = {
            in: 'params',
            description: 'Filter parameters',
            required: true,
            schema: { $ref: "#/definitions/Form/Package" }
        }
    */
    try {
        const packageData = await packageService.updatePackage(req.params.id, req.body)
        return res.status(201).json({
            status: true,
            message: 'Paket berhasil diperbarui.',
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Terjadi kesalahan pada saat memperbarui data package, coba beberapa saat lagi',
        });
    }
}

exports.deletePackage = async (req, res) => {
    /* 	#swagger.tags = ['Admin']
        #swagger.description = 'Endpoint to sign in a specific user' */
    try {
        const packageData = await packageService.deletePackage(req.params.id)
        return res.status(201).json({
            status: true,
            message: 'Paket berhasil dihapus.',
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Terjadi kesalahan pada saat menghapus data package, coba beberapa saat lagi',
        });
    }
}