const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3864bf0640fe7fae0a09f464590f175f/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback('Not connection to weather service!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast