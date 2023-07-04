class Activity {
    constructor(data) {
      this.data = data
    }

    getActivityUser(){
        return buildDataActivity(this.data)
    }

    buildDataActivity(data){
        return data.map(entities => ({
            ip_address: entities.ip_address,
            country: entities.country,
            user_agent: entities.user_agent,
            action: entities.action,
            action_result: entities.action_result,
            created_at: entities.created_at,
            updated_at: entities.updated_at,
        }))
    }
}

module.exports = Activity;