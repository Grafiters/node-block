class Packages {
    constructor(data){
        this.data = data
    }

    getListPackages(){
        return this.data.map(entities => ({
            package_id: entities.id,
            name: entities.name,
            description: entities.description,
            request_per_second_limit: entities.request_per_second_limit,
            request_per_day_limit: entities.request_per_day_limit,
            request_per_month_limit: entities.request_per_month_limit,
            price: entities.price,
            is_trial: entities.is_trial
        }))
    }

    getDetailPackage(){
        return {
            package_id: this.data.id,
            name: this.data.name,
            description: this.data.description,
            request_per_second_limit: this.data.request_per_second_limit,
            request_per_day_limit: this.data.request_per_day_limit,
            request_per_month_limit: this.data.request_per_month_limit,
            price: this.data.price,
            is_trial: this.data.is_trial
        }
    }
}
  
module.exports = Packages