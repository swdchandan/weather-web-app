const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=99ae66c739ad8a40ebf98f804f9e8c53&query='+ latitude + ',' + longitude
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '.... It is currently '
             + response.body.current.temperature + '°C out. There is a '
            + response.body.current.wind_speed + ' KM/H wind speed')
        }
    })
}

module.exports = forecast