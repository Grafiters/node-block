const blockchainService = require('../blockchainService');
const nodeService = require('../nodeService');

class NodeBlockchain {
    constructor(blockchain) {
      this.blockchain = blockchain || null
    }

    async getBlockchainGroup(){
        return await this.buildDataBlockchain(this.blockchain)
    }

    
    async buildDataBlockchain(data){
        const building = await Promise.all(data.map(async blockchain => {
            return {
                blockchain_id: blockchain.blockchain_name,
                network: await this.getAdintionalAttributes(blockchain.blockchain_name, 'network'),
                version: await this.getAdintionalAttributes(blockchain.blockchain_name, 'version'),
                location: await this.getAdintionalAttributes(blockchain.blockchain_name, 'location'),
                api_interface: await this.getInterfaceNodeBlockchain(blockchain.blockchain_name)
            }
        }))

        return building
    }

    buildDataNodeBlockchain(data){
        return data.map(entities => ({
            type: entities.Blockchain.network,
            interface: entities.api_interface,
            connection_speed: entities.connection_speed,
            documentation_link: entities.documentation_link,
            endpoint: entities.endpoint
        }))
    }

    async getInterfaceNodeBlockchain(blockchain_name){
        const blockchain_id = await this.getAdintionalAttributes(blockchain_name, 'id')
        const node_blockchain = await nodeService.getDataNodeByBlockchainID(blockchain_id)

        return this.buildDataNodeBlockchain(node_blockchain)
    }

    async getAdintionalAttributes(blockchain_name, attributes){
        const record = await blockchainService.getBlockchainByName(blockchain_name, attributes)

        const newArray = new Array()
        for (const [key, value] of Object.entries(record)){
            if(!newArray.includes(value[attributes])){
                newArray.push(value[attributes])
            }
        }

        return newArray
    }
}

module.exports = NodeBlockchain;