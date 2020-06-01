const mongoose = require('mongoose')

const GonderiSchema = new mongoose.Schema({
    definition : { type : String },
    beğenme : { type: Number , required : true},
    beğenmeme : {type : Number, required : true},
    date : { type : Date, default : Date.now}
})

module.exports = mongoose.model('Gonderi', GonderiSchema)