const model = require("../db/models");
const { validateOtp } = require('./totpService')

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

async function validateTokenOtp(user, otp){
    const validate = await validateOtp(user.otp_secret, otp)

    if(validate){
        return true
    }else{
        return false
    }
}

function validatePasswordForChange(old_password, system_password){
    if(bcrypt.compareSync(old_password, system_password)){
        return true
    }

    return false
}

function validateTwoFactorEnabled(user_id){
    const user = model.User.findOne({where: {id: user_id}})
    if(user.otp_enabled){
        return true
    }

    return false
}

module.exports = {
    validateEmailRegisterGoogle,
    validatePasswordForChange,
    validateTwoFactorEnabled,
    validateEmailRegister,
    validateUserStatus,
    validateTokenOtp,
}