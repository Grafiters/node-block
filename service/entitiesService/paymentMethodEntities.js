class PaymentMethod {
    constructor(data){
        this.data = data
    }

    getListPaymentMethod(){
        return this.data.map(entities => ({
            id: entities.id,
            name: entities.name,
            description: entities.description,
            is_crypto: entities.is_crypto,
            gateway: entities.gateway,
        }))
    }

    getDetailPaymentMethod(){
        return {
            id: this.data.id,
            name: this.data.name,
            description: this.data.description,
            is_crypto: this.data.is_crypto,
            gateway: this.data.gateway,
        }
    }
}
  
module.exports = {
    PaymentMethod
}