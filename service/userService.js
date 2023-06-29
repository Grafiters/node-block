const model = require("../db/models");

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

async function getUserByEmailAndGoogleId(email, google_id){
    user = await model.User.findOne({where: {email: email, google_id: google_id}})
    if(user === null){
        return false
    }

    return user
}

module.exports = {
    getUserByEmailAndGoogleId,
    getUserByTokenActivation,
    getUserByEmail
}