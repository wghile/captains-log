const mongoose = require('mongoose')

//Create Schema
const logSchema = new mongoose.Schema({
    title: {type: String, required: true},
    entry: {type: String, required: true},
    shipIsBroken: {type: Boolean, required: true}
},
{
    timestamps: true
})

//Create Model
const Log = mongoose.model('Log', logSchema)

//Export Model
module.exports = Log