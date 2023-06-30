const model = require("../db/models");

async function validateEmailRegister(email){
    user = await model.User.findOne({where: {email: email}})
    if(user === null){
        return true;
    }else{
        return false;
    }
}

async function validateEmailRegisterGoogle(email, google_id){
    user = await model.User.findOne({where: {email: email, google_id: google_id}})
    if(user === null || user.email_verified_at === null){
        return true;
    }else if(user && user.email_verified_at !== null || user){
        return false;
    }
}

async function validateUserStatus(email){
    user = await model.User.findOne({where: {email: email}})
    if(user.email_verified_at === null){
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
    validateEmailRegisterGoogle,
    validateEmailRegister,
    validateUserStatus,
    validateTokenOtp
}