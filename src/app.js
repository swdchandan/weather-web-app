const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
//for custom views directory path(defult for express engine is 'views')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//for some dynamic content(handlebar ---hbs(sudo npm i hbs))
//Set up handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) =>{
    res.render('index',{
        name:'Chandan',
        title: 'Weather App'
    })
})

app.get('/about',(req, res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Chandan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Chandan Chakrawarti'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide the address term!!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide the search tearm!!'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*' , (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Chandan chakrawarti',
        errorMessage: 'Hepl article not found.'
    }) 
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Chandan Chakrawarti',
        errorMessage: 'Page not found.'
    })
})
 

app.listen(4200, () =>{
    console.log('Server is up on port 4300')
})
