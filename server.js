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

//Model
const Log = require('./models/log')

//Middleware
app.use((req, res, next) => {
    console.log('running for all routes')
    next()
})
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

//Routes: INDUCES
    //Index
        // app.get('/', async(req, res) => {
        //     try{

        //     }catch(error){
        //         console.error(error)
        //     }
        // })

    //New
        app.get('/logs/new', async(req, res) => {
            try{
                res.render('New')
            }catch(error){
                console.error(error)
            }
        })

    //Delete
        // app.get('/', async(req, res) => {
        //     try{

        //     }catch(error){
        //         console.error(error)
        //     }
        // })

    //Update
        // app.get('/', async(req, res) => {
        //     try{

        //     }catch(error){
        //         console.error(error)
        //     }
        // })

    //Create
        // app.get('/', async(req, res) => {
        //     try{

        //     }catch(error){
        //         console.error(error)
        //     }
        // })

    //Edit
        // app.get('/', async(req, res) => {
        //     try{

        //     }catch(error){
        //         console.error(error)
        //     }
        // })

    //Show
        // app.get('/', async(req, res) => {
        //     try{

        //     }catch(error){
        //         console.error(error)
        //     }
        // })

//Server Status Check
app.listen(process.env.PORT || 3000, () => {
    console.log('listening')
})