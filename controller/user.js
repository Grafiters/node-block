const models = require("../db/models");
const User = models.User;

exports.getAllUser = async (req, res) => {
    try {
        const {
            page = 0,
            show = 10,
            sortBy = 'created_at',
            orderBy = 'ASC',
        } = req.query;
        const users = await User.findAndCountAll({
            order: [[sortBy, orderBy]],
            offset: page * show,
            limit: show,
        });
        
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
}