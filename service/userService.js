const model = require("../db/models");

async function getAllUser(){
    user = await model.User.findAll()

    return user
}

async function findUserByID(id){
    user = await model.User.findOne({where: {id: id}})

    return user
}

async function findUserByApiKeys(api_keys){
    user = await model.ApiKeys.findOne({
        where: {
            api_key: api_keys
        },
        include: [model.User]
    })

    return {
        user: user.User
    }
}

async function getUserByTokenActivation(token){
    user = await model.User.findOne({where: {email_verification_token: token}})
    if(user === null){
        return false;
    }else{
        return user;
    }
}

async function getUserByEmail(email){
    user = await model.User.findOne({where: {email: email}})

    return user
}

async function getUserByEmailAndGoogleId(google_id){
    user = await model.User.findOne({where: {google_id: google_id}})
    if(user === null){
        return false
    }

    return user
}

async function updateUserPasswordByID(id, new_password){
    params = {
        password_digest: new_password
    }
    await model.User.update(params, {
        id: id
    }).then(result => {
        if(result == 1){
            return true
        }
    })

    return false
}

async function updateUserOtpSecretByID(id, otp_secret, enabled) {
    params = {
        otp_secret: otp_secret,
        otp_enabled: enabled
    }
    const update = await model.User.update(params, {
        where: {
            id: id
        }
    }).then(result => {
        console.log(result);
        if(result == 1){
            return true
        }
    }).catch(err => {
        console.log(err);
        return false;
    })

    return update
}

async function updateUserStatus(id, status) {
    params = {
        email_verification_token: '000000',
        email_verified_at: null
    }
    await model.User.update(params, {
        where: {
            id: id
        }
    }).then(result => {
        if(result == 1){
            return true
        }
    })

    return false
}

async function getActivityUser(id){
    const activity = await model.Activity.findAll({
        where: {
            user_id: id
        }
    })

    return activity
}

async function getCurrentPackageUser(id){
    const subscript = await model.UserSubscriptions.findOne({
        where: {
            user_id: id,
            end_date: null
        },
        include: [
            {model: model.Packages}
        ]
    })

    return subscript
}

module.exports = {
    getUserByEmailAndGoogleId,
    getUserByTokenActivation,
    updateUserOtpSecretByID,
    updateUserPasswordByID,
    getCurrentPackageUser,
    findUserByApiKeys,
    updateUserStatus,
    getActivityUser,
    getUserByEmail,
    findUserByID,
    getAllUser
}