//Set Up Server
const express = require('express')
const app = express()
app.set('view engine', 'ejs')

//Packages and Mongoose
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const methodOverride = require('method-override')

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewURLParser: true,
    useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
    console.log('Connected to mongoose')
})

//Middleware
app.use((req, res, next) => {
    console.log('running for all routes')
    next()
})
app.use(express.urlencoded({extended: false}))  //body-parser package
app.use(methodOverride('_method'))
app.use(express.static('public'))

//Setting Controller
const logController = require('./controllers/log')
app.use('/', logController)

//Server Status Check
app.listen(process.env.PORT || 3000, () => {
    console.log('listening')
})