function buildParamsWithAuthUser(another, params){
    existing_params = JSON.parse(params)

    for (const [key, value] of Object.entries(another)){
        existing_params[key] = value
    }

    const updateParams = JSON.stringify(existing_params)

    return updateParams
}

function buildParamsFilter(){
    const buildParams = {}

    for(const key in params){
        if(params[key] !== null || params[key] !== undefined){
            buildParams[key] = params[key];
        }
    }

    return params = {
        where: buildParams
    }
}

module.exports = {
    buildParamsFilter
}