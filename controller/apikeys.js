const apiKeysService = require('../service/apiKeysService')
const generatedKeysService = require('../service/generateService')
const apiKeyEntities = require('../service/entitiesService/apiKeysEntities')

exports.apiKeysUser = async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
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
            data: new apiKeyEntities(apiKeys).getApiKeysUser()
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
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
    const { label } = req.body
    const params = {
        user_id: req.auth.user.id,
        label: label,
        api_key: generatedKeysService.generateApiKeys()
    }
    try {
        const apiKeys = await apiKeysService.createApiKeysByUser(params)

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

exports.deleteApiKeysUser = async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
    const { api_key_id } = req.params
    
    try {
        const apiKeys = await apiKeysService.deleteApiKeysByUser(api_key_id)

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

exports.usageStatistic = async (req, res) => {
    try {
        const apiKeys = await apiKeysService.requestStatisticAll(req.auth.user.id)

        if(!apiKeys){
            return res.status(422).json({
                status: true,
                message: 'Gagal pada mengambil data statistic api keys, silahakan coba lagi',
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Berhasil mengambil data api keys user',
            data: new apiKeyEntities(apiKeys).getUsageStatisticApiKeys('all')
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Terjadi kesalahan pada saat mengambil data api keys, silahakan coba beberapa saat lagi',
        });
    }
}

exports.usageStatisticByApiKey = async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
    const { api_key } = req.params;

    const api_key_id = await apiKeysService.findApiKeyByApiKeyValue(api_key)
    try {
        const apiKeys = await apiKeysService.requestStatisticByApiKeys(api_key_id.id)

        if(!apiKeys[0]){
            return res.status(422).json({
                status: true,
                message: 'Gagal pada mengambil data statistic api keys, silahakan coba lagi',
                data: apiKeys
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Berhasil mengambil data api keys user',
            data: new apiKeyEntities(apiKeys).getUsageStatisticApiKeys('api_key')
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Terjadi kesalahan pada saat mengambil data api keys, silahakan coba beberapa saat lagi',
        });
    }
}

exports.usageStatisticByApiKeyChart = async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
    const { api_key, interval, start_date, end_date } = req.query;

    if(interval === null ){
        interval = '1h'
    }
    var api_key_ids = null
    if(api_key){
        api_key_ids = await apiKeysService.findApiKeyByApiKeyValue(api_key)
    }
    const searchParams = {
        api_key_id: api_key_ids || null,
        start_date: start_date,
        end_date: end_date,
    }

    try {
        const apiKeys = await apiKeysService.requestStatisticByApiKeys(req.auth.user.id, api_key, searchParams)

        if(!apiKeys[0]){
            return res.status(422).json({
                status: true,
                message: 'Gagal pada mengambil data statistic api keys, silahakan coba lagi',
                data: apiKeys
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Berhasil mengambil data api keys user',
            data: new apiKeyEntities(apiKeys).getUsageStatisticApiKeysByApiKeyChart(interval, start_date, end_date)
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Terjadi kesalahan pada saat mengambil data api keys, silahakan coba beberapa saat lagi',
        });
    }
}