const model = require("../db/models");

async function validateEmailRegister(email){
    user = await model.User.findOne({where: {email: email}})
    if(user === null){
        return true;
    }else{
        return false;
    }
}

module.exports = { validateEmailRegister }