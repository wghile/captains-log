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
app.use(express.urlencoded({extended: false}))  //bpdy-parser package
app.use(methodOverride('_method'))

//Routes: INDUCES
    //Index
        app.get('/logs', async(req, res) => {
            try{
                const logs = await Log.find()
                res.render('Index', {logs})
            }catch(error){
                console.error(error)
            }
        })

    //New
        app.get('/logs/new', async(req, res) => {
            try{
                res.render('New')
            }catch(error){
                console.error(error)
            }
        })

    //Delete
        app.delete('/logs/:id', async(req, res) => {
            try{
                await Log.findByIdAndRemove(req.params.id)
                res.redirect('/logs')
            }catch(error){
                console.error(error)
            }
        })

    //Update
        app.put('/logs/:id', async(req, res) => {
            try{
                if(req.body.shipIsBroken === 'on'){
                    req.body.shipIsBroken = true
                }else{
                    req.body.shipIsBroken = false
                }
                console.log(req.body)
            }catch(error){
                console.error(error)
            }
            await Log.findByIdAndUpdate(req.params.id, req.body)
            res.redirect(`/logs/${req.params.id}`)
        })

    //Create
        app.post('/logs', async(req, res) => {
            try{
                if(req.body.shipIsBroken === 'on'){
                    req.body.shipIsBroken = true
                }else{
                    req.body.shipIsBroken = false
                }
                await Log.create(req.body)
                res.redirect('/logs')
            }catch(error){
                console.error(error)
            }
        })

    //Edit
        app.get('/logs/:id/edit', async(req, res) => {
            try{
                const log = await Log.findById(req.params.id)
                res.render('Edit', {log})
            }catch(error){
                console.error(error)
            }
        })

    //Show
        app.get('/logs/:id', async(req, res) => {
            try{
                const log = await Log.findById(req.params.id)
                res.render('Show', {log})
            }catch(error){
                console.error(error)
            }
        })

//Server Status Check
app.listen(process.env.PORT || 3000, () => {
    console.log('listening')
})