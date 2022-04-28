const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibHVjY2UiLCJhIjoiY2wyZzdjdmJtMDE4dTNkcWg2N256cXNxMyJ9.6WJN9IvihcJsBvzJ4R75hg&limit=1'
  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to server!', undefined)
    }
    else if (body.features.length === 0) {
      callback('Unable to find location.Try another search', undefined)
    }
    else {
      const { place_name: location } = body.features[0]
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location
      })
    }
  })
}

module.exports = geocode