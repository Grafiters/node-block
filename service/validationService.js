const model = require("../db/models");

async function validateEmailRegister(email){
    user = await model.User.findOne({where: {email: email}})
    if(user === null){
        return true;
    }else{
        return false;
    }
}

async function validateUserStatus(email){
    user = await model.User.findOne({where: {email: email}})
    if(user.status === null){
        return false;
    }else{
        return true;
    }
}

async function validateTokenOtp(otp, user){
    const validate = await validateOtp(user.otp_secret, otp)

    if(validate){
        return true
    }else{
        return false
    }
}

module.exports = { 
    validateEmailRegister,
    validateUserStatus,
    validateTokenOtp
}