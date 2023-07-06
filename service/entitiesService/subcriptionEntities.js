class UserSubcriptionPackage {
    constructor(data, Package){
        this.data = data
    }

    getCurrentPlan(){
        return {
            package_id: this.data.Packages.id,
            name: this.data.Packages.name,
            duration: this.data.Packages.trial_duration,
            price: this.data.Packages.price,
            start_date: this.data.UserSubcription.start_date,
            end_date: this.data.UserSubcription.end_date
        }
    }

    getListPlanUser(){
        return this.data.map(entities => ({
            package_id: entities.id,
            package_id: entities.package_id,
            name: entities.Packages.name,
            price: entities.Packages.price,
            start_date: entities.start_date,
            end_date: entities.end_date
        }))
    }
}
  
module.exports = {
    UserSubcriptionPackage
}