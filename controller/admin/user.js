const userService = require('../../service/userService')

exports.userProfile = async (req, res) => {
    try {
        const user = await userService.getAllUser()

        return res.status(200).json({
            status: true,
            message: 'Berhasil mengambil data user',
            data: user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Terjadi kesalahan saat memproses Profile User. Silakan coba lagi nanti"
        });
    }
}

exports.updateUser = async (req, res) => {
    const { user_id } = req.params;
    const { otp_enabled } = req.body;

    console.log(req.body);

    const target_user = await userService.findUserByID(user_id);
    try {
        const update = await userService.updateUserOtpSecretByID(target_user.id, null, otp_enabled)
        if(update){
            return res.status(201).send({
                status: true,
                message: 'User updated successfully'
            })
        }
    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'Terjadi kesalahan pada saat update data user, silahkan tunggu beberapa saat lagi'
        })
    }
}