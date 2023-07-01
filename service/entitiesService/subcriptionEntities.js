class UserSubcriptionPackage {
    constructor(UserSubcription, Package){
        this.UserSubcription = UserSubcription;
        this.Packages = Package;
    }

    getCurrentPlan(){
        return {
            package_id: this.Packages.id,
            name: this.Packages.name,
            duration: this.Packages.trial_duration,
            price: this.Packages.price,
            start_date: this.UserSubcription.start_date,
            end_date: this.UserSubcription.end_date
        }
    }
}
  
module.exports = {
    UserSubcriptionPackage
}