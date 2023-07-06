const { array } = require('joi');
const moment = require('moment');

class Activity {
    constructor(data) {
      this.data = data
    }

    getApiKeysUser(){
        return this.buildDataApiKeys(this.data)
    }

    getUsageStatisticApiKeys(type){
        if (type == 'all'){
            return this.buildDataRequestStatistic(this.data)
        }else{
            return this.buildDataRequestStatisticByApiKey(this.data)
        }
    }

    getUsageStatisticApiKeysByApiKeyChart(interval, startDate, endDate){
        return this.buildDataRequestStatisticByApiKeyChart(this.data, interval, startDate, endDate)
    }

    buildDataApiKeys(data){
        return data.map(entities => ({
            api_key_id: entities.id,
            label: entities.label,
            api_key: entities.api_key,
            masked_api_key: this.maskingData(entities.api_key, '*', 7),
            created_at: entities.created_at,
            updated_at: entities.updated_at
        }))
    }

    buildDataRequestStatistic(data){
        return data.map(entities => ({
            api_key: entities.api_key,
            total_requests: entities.RequestStatistic.length,
            total_requests_daily: this.parsingDateGroupStatistic(entities.RequestStatistic, 'YYYY-MM-DD'),
            total_requests_monthly: this.parsingDateGroupStatistic(entities.RequestStatistic, 'YYYY-MM'),
        }))
    }

    buildDataRequestStatisticByApiKey(data){
        return {
            total_requests: data.length,
            total_requests_daily: this.parsingDateGroupStatistic(data, 'YYYY-MM-DD'),
            total_requests_monthly: this.parsingDateGroupStatistic(data, 'YYYY-MM'),
        }
    }

    buildDataRequestStatisticByApiKeyChart(data, interval, start_date, end_date){
        return {
            label: this.parsingChartRequestStatisticForChart(data, interval, start_date, end_date, 'YYYY-MM-DD HH:mm:ss').arrayDate,
            value: this.parsingChartRequestStatisticForChart(data, interval, start_date, end_date, 'YYYY-MM-DD HH:mm:ss').value
        }
    }

    parsingChartRequestStatisticForChart(data, interval, start_date, end_date, formatDate){
        const arrayDate = new Array()
        const value = new Array()
        const startTime = moment(start_date)
        const endTime = moment(end_date)
        const intervalUnit = validateTimeInterval(interval)

        let time = moment(start_date)
        const current = moment(startTime)
        while (time <= endTime) {
            const pushToArray = moment(time).format('YYYY-MM-DD HH:mm:ss')
            arrayDate.push(pushToArray);
            const nextTime = current.add(interval, intervalUnit)
            value.push(this.countStatisticOnDate(data, pushToArray, moment(nextTime).format(formatDate), formatDate))


            time.add(interval, 'hours');
          }

        return {arrayDate, value}
    }

    validateTimeInterval(interval){
        const timeRegex = /^(\d+)(m|h|d)$/; // Regex pattern to match digits followed by 'm', 'h', or 'd'

        if (timeRegex.test(symbol)) {
            const [, value, unit] = symbol.match(timeRegex);
        
            if (unit === 'm') {
                return `minutes`;
            } else if (unit === 'h') {
                return `hours`;
            } else if (unit === 'd') {
                return `days`;
            }
        }
    }
    
    countStatisticOnDate(data, start_date, end_date, formatDate){
        let total = 0;
        data.map(record => {
            if(moment(record.created_at).format(formatDate) >= moment(start_date).format(formatDate) && moment(record.created_at).format(formatDate) <= moment(end_date).format(formatDate)){
                total += 1
            }
        })

        return total
    }

    parsingDateGroupStatistic(data, formatDate){
        const objectDate = new Object()
        const date = data.map(request => {
            const convertDate = moment(request.created_at).format(formatDate)
            if(objectDate[convertDate]){
                objectDate[convertDate] += 1
            }else{
                objectDate[convertDate] = 1
            }
        })

        return objectDate
    }

    maskingData(str, mask, n=1){
        return ('' + str).slice(0, -n)
                .replace(/./g, mask)
                + ('' + str).slice(-n);
    }
}

module.exports = Activity;