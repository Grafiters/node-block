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

module.exports = { getUserByTokenActivation, getUserByEmail }