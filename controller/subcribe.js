const userSubcriptionEntities = require('../service/entitiesService/subcriptionEntities')
const subcribeService = require('../service/subcribeService')
const paramsService = require('../service/paramsService')

exports.getAllSubcribeUser = async (req, res) => {
    const rawParams = {
        user_id: req.auth.user.id
    }

    const params = paramsService.buildParamsFilter(rawParams)
    try {
        const subcribe = await subcribeService.getAllSubcribeUser(params)
        
        if (subcribe.length > 0){
            return res.status(200).send({
                status: true,
                message: 'Berhasil mengambil data subcribe langganan user',
                data: new userSubcriptionEntities(subcribe).getListPlanUser()
            });
        }else{
            return res.status(200).send({
                status: true,
                message: 'Daftar subcribe langganan tidak ditemukan',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Terjadi kesalahan pada mengambil data subcribe user, coba beberapa saat lagi',
        });
    }
}

exports.getDetailSubcribeUser = async (req, res) => {
    const rawParams = {
        user_id: req.auth.user.id
    }
    const params = paramsService.buildParamsFilter(rawParams)
    try {
        const subcribe = await subcribeService.getUserSubcriptionByParams(params)
        
        if (subcribe.length > 0){
            return res.status(200).send({
                status: true,
                message: 'Berhasil mengambil data subcribe langganan user',
                data: new userSubcriptionEntities(subcribe).getCurrentPlan()
            });
        }else{
            return res.status(200).send({
                status: true,
                message: 'Daftar subcribe langganan tidak ditemukan',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Terjadi kesalahan pada mengambil data subcribe user, coba beberapa saat lagi',
        });
    }
}