function buildParamsWithAuthUser(another, params){
    existing_params = JSON.parse(params)

    for (const [key, value] of Object.entries(another)){
        existing_params[key] = value
    }

    const updateParams = JSON.stringify(existing_params)

    return updateParams
}