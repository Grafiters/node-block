const models = require("../db/models");
const user = models.User;

exports.getAllUser = async (req, res) => {
    try{
        user.findAll()
        .then( users => res.status(200)
            .send({
                status: 200,
                msg: 'get all data success',
                datas: users
            })
        )
    } catch (err){
        console.log(err.toString());
        res.status(400).send(err);
    }
}