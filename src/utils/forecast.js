const request = require('request')

const forecast = (latitude, longitude, callback) => {

  const url = `http://api.weatherstack.com/current?access_key=17da3ffa5394dea1d6109c0fa295ccd4&query=${latitude},${longitude}`
  request({ url, json: true}, (error, { body }) => {
      if (error) {
        callback('Unable to connect to server!', undefined)
      }
      else if (body.error) {
        callback(body.error.info, undefined)
      }
      else {
        const { name, country } = body.location
        const { temperature, feelslike, weather_descriptions } = body.current
        const weather_icons = body.current.weather_icons[0]
        callback(undefined, {
          weather_icons,
          message: `${name}, ${country}: It\'s currently ${temperature} degress out. It feels like ${feelslike} dergess out.
          It is ${weather_descriptions}`
        }, )
      }
  })
}

module.exports = forecast