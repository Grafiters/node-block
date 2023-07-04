const apiKeysService = require('../service/apiKeysService')

exports.apiKeysUser = async (req, res) => {
    try {
        const apiKeys = await apiKeysService.findAllApiKeysByUser(req.auth.user.id)

        if(!apiKeys){
            return res.status(200).json({
                status: true,
                message: 'Data api keys user tidak ditemukan',
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Berhasil mengambil data api keys user',
            data: apiKeys
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Terjadi kesalahan pada saat mengambil data api keys, silahakan coba beberapa saat lagi',
        });
    }
}

exports.createApiKeysUser = async (req, res) => {
    try {
        const apiKeys = await apiKeysService.createApiKeysByUser({id: req.auth.user.id}, req.body)

        if(!apiKeys){
            return res.status(422).json({
                status: true,
                message: 'Gagal pada saat membuat api keys, silahakan coba lagi',
            });
        }

        return res.status(201).json({
            status: true,
            message: 'Berhasil membuat data api keys user',
            data: apiKeys
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Terjadi kesalahan pada saat mengambil data api keys, silahakan coba beberapa saat lagi',
        });
    }
}