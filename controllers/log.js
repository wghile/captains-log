const express = require('express')
const router = express.Router()
const Log = require('../models/log')

//Routes: INDUCES
    //Home      
        router.get('/home', async(req, res) => {
            try{
                res.render('Home')
            }catch(error){
                console.error(error)
            }
        })

    //Index     
        router.get('/home/logs', async(req, res) => {
            try{
                const logs = await Log.find()
                res.render('Index', {logs})
            }catch(error){
                console.error(error)
            }
        })

    //New
        router.get('/home/logs/new', async(req, res) => {
            try{
                res.render('New')
            }catch(error){
                console.error(error)
            }
        })

    //Delete
        router.delete('/home/logs/:id', async(req, res) => {
            try{
                await Log.findByIdAndRemove(req.params.id)
                res.redirect('/logs')
            }catch(error){
                console.error(error)
            }
        })

    //Update
        router.put('/home/logs/:id', async(req, res) => {
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
        router.post('/home/logs', async(req, res) => {
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
        router.get('/home/logs/:id/edit', async(req, res) => {
            try{
                const log = await Log.findById(req.params.id)
                res.render('Edit', {log})
            }catch(error){
                console.error(error)
            }
        })

    //Show
        router.get('/home/logs/:id', async(req, res) => {
            try{
                const log = await Log.findById(req.params.id)
                res.render('Show', {log})
            }catch(error){
                console.error(error)
            }
        })

module.exports = router