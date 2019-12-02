const express = require('express')
const path = require('path');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define path for express config 
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//set up static  diroctry to serve 
app.use(express.static(publicDirPath))



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a Adress!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, { summary, temperature, precipProbability }={}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                summary: summary,
                temperature: temperature,
                precipProbability: precipProbability,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Mussie H'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mussie H'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMsg: 'my Help Txt',
        name: 'Mussie H'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        text: 'help page not found !',
        name: 'Mussie H'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        text: 'page not found !',
        name: 'Mussie H'
    })
})

app.listen(3000, () => {
    console.log('server is up')
})