const nodeService = require('../service/nodeService');

exports.getAllNodeBlockchain = async (req, res) => {
    try {
        const node = await nodeService.getAllNodeBlockchain()

        return res.status(200).json({
            status: true,
            message: 'Berhasil mengambil data blockchain',
            data: node
        });
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat mengambil data blockchain, silahkan coba beberapa saat lagi',
        });
    }
}

exports.addNodeBlockchain = async (req, res) => {
    try {
        const node = await nodeService.addNodeBlockchain(req.body)

        if (node.status){
            return res.status(201).json({
                status: true,
                message: 'Node blockchain successfully added.',
            });
        }else{
            return res.status(422).json({
                status: false,
                message: node.message,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat menambah data node blockchain, silahkan coba beberapa saat lagi',
        });
    }
}

exports.updateNodeBlockchain = async (req, res) => {
    try {
        const node = await nodeService.updateNodeBlockchain(req.params.node_id, req.body)
        if (node.status){
            return res.status(201).json({
                status: true,
                message: 'Node blockchain successfully updated.',
            });
        }else{
            return res.status(422).json({
                status: false,
                message: node.message,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            status: false,
            message: 'Tidak dapat menambah data node blockchain, silahkan coba beberapa saat lagi',
        });
    }
}