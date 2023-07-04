class Blockchain {
    constructor(data) {
      this.data = data
    }

    getBlockchainData(){
        return this.buildDataBlockchain(this.data)
    }

    buildDataBlockchain(data){
        return data.map(entities => ({
            blockchain_id: entities.id,
            blockchain_name: entities.blockchain_name,
            height: entities.height,
            network: entities.network,
            version: entities.version,
            location: entities.location,
        }))
    }
}

module.exports = Blockchain;