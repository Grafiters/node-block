const nodeService = require('../../service/nodeService');

exports.getAllNodeBlockchain = async (req, res) => {
    const { blockchain_id } = req.params
    try {
        const blockchain = await nodeService.getDataNodeByBlockchainID(blockchain_id);

        return res.status(200).send({
            status: true,
            message: 'Berhasil mengambil data blockchain',
            data: blockchain
        });
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Tidak dapat mengambil data blockchain, silahkan coba beberapa saat lagi',
        });
    }
}

exports.addNodeBlockchain = async (req, res) => {
    /*  #swagger.parameters['node'] = {
        in: 'formData',
        schema: {
            $blockchain_id: 1,
            $connection_speed: "height",
            $api_interface: "JSON-RPC",
            $endpoint: "https://ethereum.org/en/developers/docs/apis/json-rpc/",
            $documentation_link: "https://ethereum.org/en/developers/docs/apis/json-rpc/",
        }
    } */
    try {
        const node = await nodeService.addNodeBlockchain(req.body)
        if (node.status){
            return res.status(201).send({
                status: true,
                message: 'Node blockchain successfully added.',
            });
        }else{
            return res.status(422).send({
                status: false,
                message: node.message,
            });
        }
    } catch (error) {
        return res.status(422).send({
            status: false,
            message: 'Tidak dapat menambah data node blockchain, silahkan coba beberapa saat lagi',
        });
    }
}

exports.updateNodeBlockchain = async (req, res) => {
    /*  #swagger.parameters['node'] = {
        in: 'formData',
        schema: {
            $blockchain_id: 1,
            $connection_speed: "height",
            $api_interface: "JSON-RPC",
            $endpoint: "https://ethereum.org/en/developers/docs/apis/json-rpc/",
            $documentation_link: "https://ethereum.org/en/developers/docs/apis/json-rpc/",
        }
    } */
    try {
        const node = await nodeService.updateNodeBlockchain(req.params.node_id, req.body)
        if (node.status){
            return res.status(201).send({
                status: true,
                message: 'Node blockchain successfully updated.',
            });
        }else{
            return res.status(422).send({
                status: false,
                message: node.message,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Tidak dapat menambah data node blockchain, silahkan coba beberapa saat lagi',
        });
    }
}

exports.deleteNodeBlockchain = async (req, res) => {
    try {
        const node = await nodeService.deleteNodeBlockchain(req.params.node_id)
        if (node.status){
            return res.status(201).send({
                status: true,
                message: 'Node blockchain berhasil dihapus.',
            });
        }else{
            return res.status(422).send({
                status: false,
                message: node.message,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).send({
            status: false,
            message: 'Tidak dapat menambah data node blockchain, silahkan coba beberapa saat lagi',
        });
    }
}