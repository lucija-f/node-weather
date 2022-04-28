const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = 3000

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directiry to use
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Lucija'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Lucija'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'Lucija',
    message: 'This is important message'
  })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
      return res.send({
        error: 'You must provide an address!'
      })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
      if (error) {
        return res.send({ error });
      }
        forecast( latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address
          })
        })
    })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
      return res.send({
        error: 'You must provide a search term'
      })
  }
  console.log(req.query);
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
      errorMsg: 'Help article not found!',
      title: '404',
      name: 'Lucija'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
      errorMsg: 'Page not found!',
      title: '404',
      name: 'Lucija'
    })
})

app.listen(port, () => {
  console.log('Server is up on port', port);
})